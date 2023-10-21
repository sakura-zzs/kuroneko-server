const { LABEL_IS_EXIST, LABEL_IS_ADDED } = require('../constants/error-type')
const { getLabelByName, createLabel, getLabelByMomentIdAndLabelId } = require('../services/label.service')


//为动态添加标签时标签是否存在
//从已有标签列表添加：无需验证
//添加自定义标签：验证是否存在，不存在进行创建，存在就进行错误处理
const verifyAddCustomLabelExists = async (ctx, next) => {
  const { labelName } = ctx.request.body
  const res = await getLabelByName(labelName)
  if (res) {
    const err = new Error(LABEL_IS_EXIST)
    return ctx.app.emit('error', err, ctx)
  }
  await createLabel(labelName)
  const { id } = await getLabelByName(labelName)
  ctx.labelId = id
  await next()
}

//创建标签时标签名是否已存在
const verifyLabelExists = async (ctx, next) => {
  const { name } = ctx.request.body
  const res = await getLabelByName(name)
  if (res) {
    const err = new Error(LABEL_IS_EXIST)
    return ctx.app.emit('error', err, ctx)
  }
  await next()
}

//验证动态是否已添加该标签
const verifyMomentAddedLabel = async (ctx, next) => {
  const momentId = ctx.params.id
  const { labelName } = ctx.request.body
  const { id } = await getLabelByName(labelName)
  const res = await getLabelByMomentIdAndLabelId(momentId, id)
  if (res.length) {
    const err = new Error(LABEL_IS_ADDED)
    return ctx.app.emit('error', err, ctx)
  }
  ctx.labelId = id
  await next()
}

module.exports = {
  verifyLabelExists,
  verifyAddCustomLabelExists,
  verifyMomentAddedLabel
}