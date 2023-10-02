const route = require('@koa/router')
const { verifyAuth } = require('../middlewares/auth.middleware')
const {publish}=require('../controllers/comment.controller')

const commentRouter = new route({ prefix: '/comment' })

//发表评论
commentRouter.post('/',verifyAuth,publish)
//回复评论（楼中楼）

//获取评论列表

//修改评论

//修改评论


module.exports=commentRouter