const {bcryptOfPwd} = require('../utils/password-handle')
const {
  EMAIL_OR_PASSWORD_IS_NULL,
  EMAIL_OR_PASSWORD_IS_INVALID,
  EMAIL_IS_DUPLICATED
} = require('../constants/error-type')
const {getUserByEmail}=require('../services/user.service')
async function verifyUser(ctx,next) {
  const { email, pwd } = ctx.request.body

  if (pwd.trim() == null || email.trim()==null ) {
    const err = new Error(EMAIL_OR_PASSWORD_IS_NULL)
    return ctx.app.emit('error',err,ctx)
  }
   //验证邮箱,密码格式
   const reg = /^[0-9a-zA-Z_-]+@[0-9a-zA-Z_-]+(.[0-9a-zA-Z_-]+)+$/
   const pwdReg = /^[0-9a-zA-Z]{6,16}$/
   const isPwdTrue=pwdReg.test(pwd)
  const isEmailTrue = reg.test(email)
  if (!isPwdTrue || !isEmailTrue) {
    const err = new Error(EMAIL_OR_PASSWORD_IS_INVALID)
    return ctx.app.emit('error',err,ctx)
  }

  //请求数据库是否有相同用户
  const sameUser = await getUserByEmail(email)
  if (sameUser) {
    const err = new Error(EMAIL_IS_DUPLICATED)
    return ctx.app.emit('error',err,ctx)
  }

  ctx.request.body.pwd = bcryptOfPwd(pwd)
  await next()
}

module.exports={verifyUser}