//导入私钥
const { PRIVATE_KEY } = require('../app/config')
const jwt = require('jsonwebtoken')
class AuthController {
  async login(ctx, next) {
    console.log("用户校验成功...")

    const { userId, email, pwd } = ctx.user
    //使用私钥颁发token
    const token = jwt.sign(
      { id: userId, email, pwd },
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
}

module.exports = new AuthController()