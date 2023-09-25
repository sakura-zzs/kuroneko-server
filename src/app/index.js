const Koa = require('koa')
const useRoutes = require('../routers')
const bodyParse=require('koa-bodyparser')
const errorHandle = require('./error-handle')
const static=require('koa-static')
const {MOMENT_PATH}=require('../constants/file-path')

const app = new Koa()

app.useRoutes = useRoutes

app.use(static(MOMENT_PATH))
app.use(bodyParse())
app.useRoutes()
//错误处理
app.on('error',errorHandle)

module.exports=app