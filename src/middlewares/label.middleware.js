const {LABEL_IS_EXIST}=require('../constants/error-type')
const { getLabelByName } = require('../services/label.service')


//为动态添加标签时标签是否存在
//从已有标签列表添加：无需验证
//添加自定义标签：验证是否存在，不存在进行创建，存在就进行错误处理
// const verify

//创建标签时标签名是否已存在
const verifyLabelExists = async (ctx, next) => {
  const { name } = ctx.request.body
  const res = await getLabelByName(name)
  if (res) {
    const err = new Error(LABEL_IS_EXIST)
    return ctx.app.emit('error',err,ctx)
  }
  await next()
}

module.exports = {
  verifyLabelExists
}