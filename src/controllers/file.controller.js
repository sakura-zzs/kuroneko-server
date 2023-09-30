const { saveMomentImage,getImageUrlByFileName,deleteMomentImageById,updateMomentIdById } = require('../services/file.service')
const {
  APP_PORT,
  APP_HOST}=require('../app/config')
class FileController{
  async uploadMoment(ctx, next) {
    //获取上传文件
    //todo:将文件名、文件类型、文件地址、文件大小数据、用户id保存至数据库
    //对wangEditor富文本上传的预想 ：
    /**
     * wangEditor发起上传，将图片地址保存到moment_img表
     * 富文本编辑完毕，将富文本json保存到moment表
     * 拿到moment表的id，与moment_img绑定
     * 完成富文本上传
     * todo：
     * wangEditor采用自定义上传，获取到wangEditor选择的文件列表进行上传，接口返回文件地址数组
     * wangEditor使用insertFn根据文件地址进行插入
     */
    const { id } = ctx.user
    //保存多文件上传路径
    const urlList=[]
    for (let file of ctx.files) {
      const { filename, mimetype, size } = file
      const url = `${APP_HOST}:${APP_PORT}/${filename}`
      await saveMomentImage(filename, mimetype, size, url, id)
      const fileUrl = await getImageUrlByFileName(filename)
      urlList.push(fileUrl)
    }
    // console.log(urlList)
    //返回文件地址数组
    ctx.body = {
      imgLinks:urlList
    }
  }
  async deleteMoment(ctx,next) {
    const { id } = ctx.query
    const res = await deleteMomentImageById(id)
    ctx.body=res
  }
  async updateMomentId(ctx, next) {
    const { id } = ctx.query
    const { momentId } = ctx.request.body
    const res = await updateMomentIdById(id, momentId)
    ctx.body=res
  }
}

module.exports=new FileController()