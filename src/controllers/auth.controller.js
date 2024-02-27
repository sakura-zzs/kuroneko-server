//导入私钥
const { PRIVATE_KEY } = require('../app/config')
const jwt = require('jsonwebtoken')
class AuthController {
  async login(ctx, next) {
    console.log("用户校验成功...")

    const { userId, email, pwd } = ctx.user
    //使用私钥颁发token
    const token = jwt.sign(
      { userId, email, pwd },
      PRIVATE_KEY,
      {
        //token过期时间，秒
        expiresIn: "24h",
        //加密算法，使用非对称加密
        algorithm: "RS256"
      }
    )
    ctx.body = { id: userId, email, pwd, token }
    // await next()
  }
  async success(ctx, next) {
    ctx.body = "授权成功~"
  }
  async wxLogin(ctx, next) {
    console.log("wx用户校验成功...")
    //注册接口（绑定帐号时）保存openid和session_key
    //微信用户已绑定过帐号，直接登录
    //根据openid和session_key生成token
    const openid = ctx.openid
    const session_key = ctx.session_key
    const token = jwt.sign(
      { openid, session_key },
      PRIVATE_KEY,
      {
        //token过期时间，秒
        expiresIn: "24h",
        //加密算法，使用非对称加密
        algorithm: "RS256"
      }
    )
    ctx.body = { token, user: ctx.user }
  }
}

module.exports = new AuthController()