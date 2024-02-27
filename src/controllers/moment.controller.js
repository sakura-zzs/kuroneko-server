const { createMoment, getMomentListByUserId, getAllMoment, getMomentById, updateMomentById, deleteMomentById, bindLabel, updateMomentHtmlById } = require('../services/moment.service')
const { getLabelByName } = require('../services/label.service')

class MomentController {
  async create(ctx, next) {
    const { title, html } = ctx.request.body
    const { userId: id } = ctx.user
    const res = await createMoment(title, id, html)
    ctx.body = res
  }
  async getUserMomentList(ctx, next) {
    const { userId } = ctx.params
    const res = await getMomentListByUserId(userId)
    ctx.body = res
  }
  async getMomentList(ctx, next) {
    const res = await getAllMoment()
    ctx.body = res
  }
  async getMoment(ctx, next) {
    const { id } = ctx.params
    const res = await getMomentById(id)
    ctx.body = res
  }
  async update(ctx, next) {
    const { id } = ctx.params
    const { content } = ctx.request.body
    const res = await updateMomentById(content, id)
    ctx.body = res
  }
  async deleteMoment(ctx, next) {
    const { id } = ctx.params
    const res = await deleteMomentById(id)
    ctx.body = res
  }
  async addCustomLabel(ctx, next) {
    const labelId = ctx.labelId
    const momentId = ctx.params.id
    const res = await bindLabel(labelId, momentId)
    ctx.body = res
  }
  async addLabel(ctx, next) {
    const momentId = ctx.params.id
    const labelId = ctx.labelId
    console.log(momentId, labelId)
    const res = await bindLabel(labelId, momentId)
    ctx.body = res
  }
  async updateHtml(ctx, next) {
    const { id } = ctx.params
    const { html } = ctx.request.body
    const res = await updateMomentHtmlById(html, id)
    ctx.body = res
  }
}

module.exports = new MomentController()