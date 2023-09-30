const route = require('@koa/router')
const {verifyAuth,verifyPermission}=require('../middlewares/auth.middleware')
const { uploadMomentHandler, uploadResize } = require('../middlewares/file.middleware')
const {uploadMoment,deleteMoment,updateMomentId}=require('../controllers/file.controller')
const fileRouter = new route({prefix:'/upload'})
fileRouter.post('/moment', verifyAuth, uploadMomentHandler, uploadResize, uploadMoment)
fileRouter.get('/moment', (ctx, next) => {
  ctx.body="丰川祥子~"
})

fileRouter.delete('/moment', verifyAuth,verifyPermission,deleteMoment)
fileRouter.patch('/moment',verifyAuth,verifyPermission,updateMomentId)
module.exports=fileRouter