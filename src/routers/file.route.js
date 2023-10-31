const route = require('@koa/router')
const { verifyAuth, verifyPermission } = require('../middlewares/auth.middleware')
const { uploadMomentHandler, uploadCommentHandler, uploadAvatarHandler, uploadSpaceHandler, uploadResize, circleCutAvatar } = require('../middlewares/file.middleware')
const { uploadMoment, getMomentImageByMomentId, deleteMoment, updateMomentId, uploadComment, deleteComment, updateCommentId, uploadAvatar, uploadSpace, deleteSpace } = require('../controllers/file.controller')
const fileRouter = new route({ prefix: '/upload' })
//moment图片
fileRouter.post('/moment', verifyAuth, uploadMomentHandler, uploadResize, uploadMoment)
fileRouter.get('/moment/:momentId', getMomentImageByMomentId)
fileRouter.get('/moment', (ctx, next) => {
  ctx.body = "丰川祥子~"
})

fileRouter.delete('/moment', verifyAuth, verifyPermission, deleteMoment)
fileRouter.patch('/moment', verifyAuth, verifyPermission, updateMomentId)

//comment图片
fileRouter.post('/comment', verifyAuth, uploadCommentHandler, uploadComment)
fileRouter.delete('/comment', verifyAuth, verifyPermission, deleteComment)
fileRouter.patch('/comment', verifyAuth, verifyPermission, updateCommentId)

//avatar图片
fileRouter.post('/avatar', verifyAuth, uploadAvatarHandler, circleCutAvatar, uploadAvatar)

//space图片（个人空间）
fileRouter.post('/space', verifyAuth, uploadSpaceHandler, uploadSpace)
fileRouter.delete('/space', verifyAuth, verifyPermission, deleteSpace)

module.exports = fileRouter