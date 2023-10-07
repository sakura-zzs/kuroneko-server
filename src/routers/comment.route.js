const route = require('@koa/router')
const { verifyAuth, verifyPermission } = require('../middlewares/auth.middleware')
const {publish,reply,getUserComment,getCommentCmts,getTopCmtOfMoment,update,deleteComment}=require('../controllers/comment.controller')

const commentRouter = new route({ prefix: '/comment' })

//发表评论
commentRouter.post('/',verifyAuth,publish)
//回复评论（楼中楼）
commentRouter.post('/:commentId/reply',verifyAuth,reply)
//获取评论列表
//获取用户所有评论
commentRouter.get('/user/:userId',getUserComment)
//获取动态所有一级评论
commentRouter.get('/topComments/:momentId',getTopCmtOfMoment)
//获取评论所有评论
commentRouter.get('/:id',getCommentCmts)
//修改评论
commentRouter.patch('/:commentId',verifyAuth,verifyPermission,update)
//删除评论
commentRouter.delete('/:commentId',verifyAuth,verifyPermission,deleteComment)

module.exports=commentRouter