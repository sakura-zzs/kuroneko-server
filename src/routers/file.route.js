const route = require('@koa/router')
const {verifyAuth}=require('../middlewares/auth.middleware')
const { uploadMomentHandler, uploadResize } = require('../middlewares/file.middleware')
const {uploadMoment}=require('../controllers/file.controller')
const fileRouter = new route({prefix:'/upload'})
fileRouter.post('/moment',verifyAuth,uploadMomentHandler,uploadResize,uploadMoment)

module.exports=fileRouter