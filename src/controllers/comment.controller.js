const { createComment, replyComment, getUserCommentList, getCommentCmtsById, getTopCommentByMomentId, updateCommentById, deleteCommentById } = require('../services/comment.service')

class CommentController {
  async publish(ctx, next) {
    const { content, momentId } = ctx.request.body
    const { id } = ctx.user
    const res = await createComment(content, id, momentId)
    ctx.body = res
  }
  async reply(ctx, next) {
    const { content, momentId } = ctx.request.body
    const { id } = ctx.user
    const { commentId } = ctx.params
    const res = await replyComment(content, id, momentId, commentId)
    ctx.body = res
  }
  //根据用户id获取到评论
  //再根据评论所在的评论id查询到评论所在评论的用户id
  //再通过这个用户id获取到用户信息
  async getUserComment(ctx, next) {
    const { userId } = ctx.params
    const res = await getUserCommentList(userId)
    // try {
    //   res.forEach(item => {
    //     if (item.ReplyInfo.comment !== null)
    //       item.ReplyInfo.comment = JSON.parse(item.ReplyInfo.comment)
    //   })
    // } catch (error) {
    //   console.log(error)
    // }
    ctx.body = res
  }
  async getCommentCmts(ctx, next) {
    const { id } = ctx.params
    const res = await getCommentCmtsById(id)
    ctx.body = res
  }
  async getTopCmtOfMoment(ctx, next) {
    const { momentId } = ctx.params
    const res = await getTopCommentByMomentId(momentId)
    ctx.body = res
  }
  async update(ctx, next) {
    const { commentId } = ctx.params
    const { content } = ctx.request.body
    const res = await updateCommentById(content, commentId)
    ctx.body = res
  }
  async deleteComment(ctx, next) {
    const { commentId } = ctx.params
    const res = await deleteCommentById(commentId)
    ctx.body = res

  }
}

module.exports = new CommentController()