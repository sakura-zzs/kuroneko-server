const {createLabel,getLabelList}=require('../services/label.service')

class LabelController{
  async create(ctx, next) {
    const { name } = ctx.request.body
    const res = await createLabel(name)
    ctx.body="标签创建成功~"
  }
  async list(ctx, next) {
    const res = await getLabelList()
    ctx.body=res
  }
}

module.exports=new LabelController()