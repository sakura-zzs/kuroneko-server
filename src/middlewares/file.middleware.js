const multer = require('@koa/multer')
const { MOMENT_PATH, COMMENT_PATH, AVATAR_PATH, SPACE_PATH } = require('../constants/file-path')
// const { UPLOAD_IMAGE_FAIL } = require('../constants/error-type')
const jimp = require('jimp')
const path = require('path')

// const uploadMomentHandler = async (ctx, next)=>{
//配置上传目录，自定义文件名
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // file为上传文件的信息，cb为回调函数，cb有两个参数，第一个是错误信息，第二个是文件保存的路径
    cb(null, MOMENT_PATH)
  },
  filename: (req, file, cb) => {
    //设置文件名为当前时间戳+后缀
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
//limits：上传限制
const limits = {
  //限制上传文件大小，字节数,默认无限
  fileSize: 1024 * 1024 * 10
}
const uploadMomentMulter = multer({
  // dest:'上传目录'这个方式上传的文件没有后缀名且会生成默认文件名
  storage,
  limits
})
//设置上传文件数组名和最大上传数量
//客户端发起文件上传的字段也需要为momentImg
//利用array返回一个koa中间件函数，而koa中间件返回promise对文件上传进行错误处理
const uploadMomentHandler = uploadMomentMulter.array('momentImg', 9)
//但是会导致返回500
// const err = await uploadMomentMulter.array('momentImg', 9)(ctx, next).then(res => res).catch(err => err)
// if (err) {
//   const error = new Error(UPLOAD_IMAGE_FAIL)
//   ctx.app.emit('error',error,ctx)
// }
//   ctx.body="middleware00~"
//   await next()
// }

const commentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // file为上传文件的信息，cb为回调函数，cb有两个参数，第一个是错误信息，第二个是文件保存的路径
    cb(null, COMMENT_PATH)
  },
  filename: (req, file, cb) => {
    //设置文件名为当前时间戳+后缀
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const uploadCommentMulter = multer({
  storage: commentStorage,
  limits
})
const uploadCommentHandler = uploadCommentMulter.single('commentImg')

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // file为上传文件的信息，cb为回调函数，cb有两个参数，第一个是错误信息，第二个是文件保存的路径
    cb(null, AVATAR_PATH)
  },
  filename: (req, file, cb) => {
    //设置文件名为当前时间戳+后缀
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const uploadAvatarMulter = multer({
  storage: avatarStorage,
  limits
})
const uploadAvatarHandler = uploadAvatarMulter.single('avatarImg')


const spaceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // file为上传文件的信息，cb为回调函数，cb有两个参数，第一个是错误信息，第二个是文件保存的路径
    cb(null, SPACE_PATH)
  },
  filename: (req, file, cb) => {
    //设置文件名为当前时间戳+后缀
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const uploadSpaceMulter = multer({
  storage: spaceStorage,
  limits
})
const uploadSpaceHandler = uploadSpaceMulter.array('spaceImg', 5)

// 使用jimp库将图片进行尺寸定制
const uploadResize = async (ctx, next) => {
  const files = ctx.files;

  for (let file of files) {
    //获取原图路径和后缀名
    const type = path.extname(file.filename)
    const filename = file.filename.replace(type, "")
    const originPath = path.join(file.destination, filename)
    //read可以读取图片，resize('宽'，'高')，高设为auto会随宽等比缩放，write处理过后的图片存放位置
    jimp.read(file.path).then(image => {
      image.resize(1280, jimp.AUTO).write(`${originPath}-large${type}`)
      image.resize(640, jimp.AUTO).write(`${originPath}-middle${type}`)
      image.resize(320, jimp.AUTO).write(`${originPath}-small${type}`)
    })
  }
  ctx.body = "middleware~"
  await next()
}

//使用jimp库进行圆形裁剪生成头像
const circleCutAvatar = async (ctx, next) => {
  const file = ctx.file;
  //获取原图路径和后缀名
  const type = path.extname(file.filename)
  const filename = file.filename.replace(type, "")
  const originPath = path.join(file.destination, filename)
  //read可以读取图片，resize('宽'，'高')，高设为auto会随宽等比缩放，write处理过后的图片存放位置
  //circle可以对图片进行圆形裁剪，三个参数分别为裁剪半径，和裁剪中心
  jimp.read(file.path).then(image => {
    image.resize(100, jimp.AUTO).circle({ radius: 50, x: 50, y: 50 }).write(`${originPath}-avatar${type}`)
  })

  await next()
}

module.exports = {
  uploadMomentHandler,
  uploadCommentHandler,
  uploadAvatarHandler,
  uploadSpaceHandler,
  uploadResize,
  circleCutAvatar
}