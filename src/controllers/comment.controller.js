const {createComment}=require('../services/comment.service')

class CommentController{
  async publish(ctx, next) {
    const { content,momentId } = ctx.request.body
    const { id } = ctx.user
    const res = await createComment(content, id, momentId)
    ctx.body=res
  }
}

module.exports=new CommentController()