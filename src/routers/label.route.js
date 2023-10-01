const route = require('@koa/router')
const { verifyAuth } = require('../middlewares/auth.middleware')
const {verifyLabelExists}=require('../middlewares/label.middleware')
const {create,list}=require('../controllers/label.controller')

const labelRouter = new route({ prefix: '/label' })

//创建标签
labelRouter.post('/',verifyAuth,verifyLabelExists,create)
//获取标签列表
labelRouter.get('/',list)

module.exports=labelRouter