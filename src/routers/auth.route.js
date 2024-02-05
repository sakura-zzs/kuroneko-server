const route = require('@koa/router')
const { verifyLogin, verifyAuth, verifyWxLogin, bindWxUser }
  = require('../middlewares/auth.middleware')
const { login, success, wxLogin } = require('../controllers/auth.controller')
const authRouter = new route()

//用户登录
authRouter.post('/login', verifyLogin, login, success)
authRouter.get('/authTest', verifyAuth)
//小程序登录,为兼容小程序，patch请求改为put
//微信用户登录（进入小程序进行登录），用户注册过就直接登录，返回token，未注册过返回错误码
authRouter.post('/wxLogin', verifyWxLogin, wxLogin)
//验证是否注册
// authRouter.post('/verifyWxUser', verifyWxLogin)
//登录逻辑
//小程序用户进入小程序时，判断本地缓存有无token（token应为用户登录成功颁发的）
//没有token就说明用户没有登录过/登出过，甚至没有注册，向服务器校验用户是否注册过，注册过，就向服务器发起登录请求，验证用户
//没有注册过，服务器应该返回特定错误码，客户端根据错误码状态提示用户当前未处于登录状态/需要注册/登录
//用户点击登录，服务器校验用户是否有注册过，有就直接登录，返回token，没有则客户端应该弹出帐号绑定页面，要求用户输入帐号和密码进行绑定
//服务器对用户帐号和密码进行校验，校验成功，保存session_key和openid，返回token
//注册过就直接登录
//客户端可以根据token状态来判断登录/注册/登出
//token过期，服务器返回错误码，客户端根据错误码清除本地缓存，强制为未登录状态
//一个登录过了的用户，一定会有token
//一个注册了的用户但是退出登录的用户，虽然没有token，但是服务器可以根据注册状态来决定是否要登录

//点击登录但未注册，输入帐号密码进行帐号绑定后登录，返回token
//微信用户绑定账户，输入帐号和密码进行校验，校验成功进行绑定，返回token
authRouter.put('/bindWxUser', verifyLogin, bindWxUser, wxLogin)

module.exports = authRouter