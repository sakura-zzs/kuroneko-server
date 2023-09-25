const route = require("@koa/router")
const {
  getUserList,
  getUserProfile,
  createUser
} = require('../controllers/user.controller')
const {
  verifyUser
}=require('../middlewares/user.middleware')
const userRouter = new route({ prefix: '/user' })

userRouter.get('/', getUserList)
userRouter.get('/profile', getUserProfile)
userRouter.post('/',verifyUser,createUser)

module.exports=userRouter
