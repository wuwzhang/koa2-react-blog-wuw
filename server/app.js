const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const log = require('./logs/log')

const controller = require('./middlewares/controller')
const koaWinston = require('./middlewares/koa-winston')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger

// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })
// // 正常请求的日志
app.use(koaWinston(log.logger));
// add controller:
// app.use(controller());

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

//错误请求的日志
app.use(koaWinston(log.errorloger));


module.exports = app
