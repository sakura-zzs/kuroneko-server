const {
  EMAIL_OR_PASSWORD_IS_NULL,
  EMAIL_OR_PASSWORD_IS_INVALID,
  EMAIL_IS_EXIST,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZATION,
  USER_IS_NOT_PERMISSION,
  WXUSER_IS_NOT_EXIST
} = require('../constants/error-type')
const { PUBLIC_KEY } = require('../app/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userService = require('../services/user.service')
const { checkResourcePermission, verifyWxUserLogin, saveOpenId } = require('../services/auth.service')
const getOpenId = require('../utils/getOpenId')

const verifyLogin = async (ctx, next) => {

  //获取邮箱、密码
  const { email, pwd } = ctx.request.body

  //判空
  if (pwd.trim() == null || email.trim() == null) {
    const err = new Error(EMAIL_OR_PASSWORD_IS_NULL)
    return ctx.app.emit('error', err, ctx)
  }

  //验证邮箱和密码格式
  const reg = /^[0-9a-zA-Z_-]+@[0-9a-zA-Z_-]+(.[0-9a-zA-Z_-]+)+$/
  const pwdReg = /^[0-9a-zA-Z]{6,16}$/
  const isPwdTrue = pwdReg.test(pwd)
  const isEmailTrue = reg.test(email)
  if (!isPwdTrue || !isEmailTrue) {
    const err = new Error(EMAIL_OR_PASSWORD_IS_INVALID)
    return ctx.app.emit('error', err, ctx)
  }

  //请求数据库，是否有该用户
  const userData = await userService.getUserByEmail(email)
  if (!userData) {
    const err = new Error(EMAIL_IS_EXIST)
    return ctx.app.emit('error', err, ctx)
  }

  //校验密码  
  const isFlag = bcrypt.compareSync(pwd, userData.pwd)
  if (!isFlag) {
    const err = new Error(PASSWORD_IS_INCORRECT)
    return ctx.app.emit('error', err, ctx)
  }
  //将用户信息返回，生成令牌...
  ctx.user = userData
  await next()
}
const verifyAuth = async (ctx, next) => {
  //获取token
  const authorization = ctx.header.authorization
  if (!authorization) {
    const err = new Error(UNAUTHORIZATION)
    return ctx.app.emit('error', err, ctx)
  }
  //Bearer为token格式规范，token部分在"Bearer "后
  const token = authorization.replace("Bearer ", "")
  //jwt.verfy方法校验失败会直接抛出异常，所以需要使用try/catch
  try {
    //校验token,返回token携带信息payload，以及token颁发时间iat和token过期时间exp
    const res = jwt.verify(token, PUBLIC_KEY, {
      //多个匹配解密算法
      algorithms: ['RS256']
    })
    ctx.user = res
    //检测是否为微信用户,微信用户token里并没有帐号用户数据
    if (res.openid) {
      const userData = await verifyWxUserLogin(res.openid)
      ctx.user = userData
    }
  } catch (error) {
    const err = new Error(UNAUTHORIZATION)
    return ctx.app.emit('error', err, ctx)
  }
  ctx.body = "验证授权通过！"
  await next()
}
//验证用户对数据进行删改的权限
const verifyPermission = async (ctx, next) => {
  const { commentId } = ctx.request.body
  const { id } = ctx.user
  let resourceId = ""
  let tableName = ""
  if (ctx.query.id) {
    resourceId = ctx.query.id
  } else {
    resourceId = ctx.params.id ? ctx.params.id : ctx.params.commentId
  }
  const url = ctx.url
  if (url.indexOf("/upload/moment") != -1) {
    tableName = "moment_img"
  } else if (url.indexOf("/upload/comment") != -1) {
    tableName = "comment_img"
  } else if (url.indexOf("/upload/avatar") != -1) {
    tableName = "avatar_img"
  } else if (url.indexOf("/upload/space") != -1) {
    tableName = "space_img"
  } else if (url.indexOf("/moment") != -1) {
    tableName = "moment"
  } else if (url.indexOf('/comment') != -1) {
    tableName = "comment"
  } else if (url.indexOf('/user/profile') != -1) {
    tableName = 'profiles'
  }
  const res = await checkResourcePermission(tableName, id, resourceId, commentId)
  if (!res) {
    const err = new Error(USER_IS_NOT_PERMISSION)
    return ctx.app.emit('error', err, ctx)
  }
  ctx.body = "资源权限认证通过！"
  await next()
}
//根据appid、appsecret、code向微信服务器获取openid、session_key
const verifyWxLogin = async (ctx, next) => {
  const { code } = ctx.request.body
  const { session_key, openid } = await getOpenId(code)
  //校验该微信用户是否注册过
  const userData = await verifyWxUserLogin(openid)
  if (!userData) {
    //没有注册过就进行绑定，用户没有注册过应该在页面提示进行登录操作绑定微信（注册），点击登录，输入账号密码，校验账号密码成功后，进行微信绑定，返回token
    //小程序将token保存到本地，后续可以根据token状态来保持登录状态
    const err = new Error(WXUSER_IS_NOT_EXIST)
    return ctx.app.emit('error', err, ctx)
  }
  //注册过就进行登录，返回token
  ctx.openid = openid
  ctx.session_key = session_key
  ctx.user = userData
  await next()
}
//绑定微信用户，保存openid、session_key
const bindWxUser = async (ctx, next) => {
  const { code } = ctx.request.body
  const { userId } = ctx.user
  const { session_key, openid } = await getOpenId(code)
  await saveOpenId(userId, session_key, openid)
  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
  verifyWxLogin,
  bindWxUser
}