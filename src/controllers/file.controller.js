const path = require('path')
const fs = require('fs')
const { saveMomentImage, getImageUrlByFileName, deleteMomentImageById, updateMomentIdById, saveCommentImage, getCommentImageUrlByFileName, deleteCommentImageById, updateCommentIdById, saveAvatarImage, getAvatarImageUrlByFileName, saveSpaceImage, getSpaceImageUrlByFileName, deleteSpaceImageById, getMomentImgById, deleteAvatarImageById } = require('../services/file.service')
const {
  APP_PORT,
  APP_HOST } = require('../app/config')
const { MOMENT_PATH, COMMENT_PATH, AVATAR_PATH } = require('../constants/file-path')
class FileController {
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
    const urlList = []
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
      imgLinks: urlList
    }
  }
  async getMomentImageByMomentId(ctx, next) {
    const { momentId } = ctx.params
    const res = await getMomentImgById(momentId)
    ctx.body = res
  }
  async deleteMoment(ctx, next) {
    const { id } = ctx.query
    //删除图片在数据库的相关数据
    const res = await deleteMomentImageById(id)
    //删除本地保存的图片数据
    const filename = res.filename.split('.')[0]
    const extname = res.filename.split('.')[1]
    fs.unlinkSync(`${MOMENT_PATH}/${res.filename}`)
    fs.unlinkSync(`${MOMENT_PATH}/${filename}-large.${extname}`)
    fs.unlinkSync(`${MOMENT_PATH}/${filename}-middle.${extname}`)
    fs.unlinkSync(`${MOMENT_PATH}/${filename}-small.${extname}`)
    ctx.body = '删除成功！'
  }
  async updateMomentId(ctx, next) {
    const { id } = ctx.query
    const { momentId } = ctx.request.body
    const res = await updateMomentIdById(id, momentId)
    ctx.body = res
  }
  async uploadComment(ctx, next) {

    const { id } = ctx.user

    const urlList = []

    const { filename, mimetype, size } = ctx.file
    const url = `${APP_HOST}:${APP_PORT}/${filename}`
    await saveCommentImage(filename, mimetype, size, url, id)
    const fileUrl = await getCommentImageUrlByFileName(filename)
    urlList.push(fileUrl)

    //返回文件地址数组
    ctx.body = {
      imgLinks: urlList
    }
  }
  async deleteComment(ctx, next) {
    const { id } = ctx.query
    const res = await deleteCommentImageById(id)
    //删除本地保存的图片数据
    fs.unlinkSync(`${COMMENT_PATH}/${res.filename}`)
    ctx.body = "删除成功~"
  }
  async updateCommentId(ctx, next) {
    const { id } = ctx.query
    const { commentId } = ctx.request.body
    const res = await updateCommentIdById(id, commentId)
    ctx.body = res
  }
  async uploadAvatar(ctx, next) {
    const { id } = ctx.user
    //删除原来的头像
    const oldAvatarList = await deleteAvatarImageById(id)
    if (oldAvatarList.length) {
      oldAvatarList.forEach(v => {
        const filename = v.filename.split('.')[0]
        const externName = v.filename.split('.')[1]
        fs.unlinkSync(`${AVATAR_PATH}/${v.filename}`)
        fs.unlinkSync(`${AVATAR_PATH}/${filename}-avatar.${externName}`)
      })
    }
    const { filename, mimetype, size } = ctx.file
    //获取原图路径和后缀名
    const type = path.extname(filename)
    const filenameNoExt = filename.replace(type, "")
    const url = `${APP_HOST}:${APP_PORT}/${filenameNoExt}-avatar${type}`
    await saveAvatarImage(filename, mimetype, size, url, id)
    const fileUrl = await getAvatarImageUrlByFileName(filename)
    ctx.body = { avatarUrl: fileUrl }
  }
  async uploadSpace(ctx, next) {
    const { id } = ctx.user
    //保存多文件上传路径
    const urlList = []
    for (let file of ctx.files) {
      const { filename, mimetype, size } = file
      const url = `${APP_HOST}:${APP_PORT}/${filename}`
      await saveSpaceImage(filename, mimetype, size, url, id)
      const fileUrl = await getSpaceImageUrlByFileName(filename)
      urlList.push(fileUrl)
    }
    // console.log(urlList)
    //返回文件地址数组
    ctx.body = {
      imgLinks: urlList
    }
  }
  async deleteSpace(ctx, next) {
    const { id } = ctx.query
    const res = await deleteSpaceImageById(id)
    ctx.body = res
  }
}

module.exports = new FileController()