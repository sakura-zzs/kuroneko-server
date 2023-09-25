const route = require('@koa/router')
const {verifyLogin,verifyAuth}
=require('../middlewares/auth.middleware')
const {login,success}=require('../controllers/auth.controller')
const authRouter = new route()

//用户登录
authRouter.post('/login', verifyLogin,login,success)
authRouter.get('/authTest',verifyAuth)
module.exports=authRouter