const route = require("@koa/router")
const {
  getUserList,
  getUserProfile,
  createUser,
  updateProfile
} = require('../controllers/user.controller')
const {
  verifyUser
} = require('../middlewares/user.middleware')
const { verifyAuth, verifyPermission } = require("../middlewares/auth.middleware")
const userRouter = new route({ prefix: '/user' })

userRouter.get('/', getUserList)
userRouter.get('/profile', getUserProfile)
userRouter.post('/', verifyUser, createUser)
//更新个人信息
userRouter.patch('/profile', verifyAuth, verifyPermission, updateProfile)

module.exports = userRouter
