const route = require('@koa/router')
const { verifyAuth,verifyPermission } = require('../middlewares/auth.middleware')
const {create,getUserMomentList,getMomentList,getMoment,update,deleteMoment}=require('../controllers/moment.controller')

const momentRouter = new route({ prefix: '/moment' })

//获取用户所有动态
momentRouter.get('/user/:userId', getUserMomentList)

//获取所有动态
momentRouter.get('/', getMomentList)
//获取指定动态
momentRouter.get('/:id', getMoment)
//创建动态
momentRouter.post('/',verifyAuth,create)
//更新动态
momentRouter.patch('/:id',verifyAuth,verifyPermission,update)
//删除动态
momentRouter.delete('/:id',verifyAuth,verifyPermission,deleteMoment)

module.exports=momentRouter