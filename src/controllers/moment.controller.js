const {createMoment,getMomentListByUserId,getAllMoment,getMomentById,updateMomentById,deleteMomentById}=require('../services/moment.service')

class MomentController{
  async create(ctx, next) {
    const { content } = ctx.request.body
    const { id } = ctx.user
    const res = await createMoment(content, id)
    ctx.body=res
  }
  async getUserMomentList(ctx, next) {
    const { id } = ctx.user
    const res = await getMomentListByUserId(id)
    ctx.body=res
  }
  async getMomentList(ctx, next) {
    const res = await getAllMoment()
    ctx.body=res
  }
  async getMoment(ctx, next) {
    const { id } = ctx.params
    const res = await getMomentById(id)
    ctx.body=res
  }
  async update(ctx,next) {
    const { id } = ctx.params
    const {content}=ctx.request.body
    const res = await updateMomentById(content,id)
    ctx.body=res
  }
  async deleteMoment(ctx, next) {
    const { id } = ctx.params
    const res = await deleteMomentById(id)
    ctx.body=res
  }
}

module.exports=new MomentController()