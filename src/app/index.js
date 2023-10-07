const Koa = require('koa')
const useRoutes = require('../routers')
const bodyParse=require('koa-bodyparser')
const errorHandle = require('./error-handle')
const static=require('koa-static')
const {MOMENT_PATH,TEST_PATH,COMMENT_PATH,AVATAR_PATH,SPACE_PATH}=require('../constants/file-path')

const app = new Koa()

app.useRoutes = useRoutes
// app.use(async(ctx, next) => {
//   console.log(ctx.req.method,ctx.req.url)
//   await next()
// })
app.use(static(MOMENT_PATH))
app.use(static(TEST_PATH))
app.use(static(COMMENT_PATH))
app.use(static(AVATAR_PATH))
app.use(static(SPACE_PATH))
app.use(bodyParse())
app.useRoutes()
//错误处理
app.on('error',errorHandle)

module.exports=app