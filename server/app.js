const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const session = require('koa2-session-store')
const MongoStore = require('koa-session-mongoose')
const config = require('config-lite')(__dirname)

const index = require('./routes/index')
const signIn = require('./routes/signIn')
const signUp = require('./routes/signUp')
const articlePost = require('./routes/articlePost')
const articleList = require('./routes/articleList')
const articleDetails = require('./routes/articleDetails')
const articleEdit = require('./routes/articleEdit')
const comments = require('./routes/comments')
const message = require('./routes/message')
const tags = require('./routes/tags')
// const catalog = require('./routes/catalog')
const keepOnFileList = require('./routes/keepOnFileList')
const verifyKey = require('./routes/verifymail')

const log = require('./logs/log')

const koaWinston = require('./middlewares/koa-winston')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.keys = [config.session.secret];
app.use(session({
  name: config.session.key,     // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: config.session.maxAge
  },
  stroe: new MongoStore()
}))

app.use(json())
app.use(require('koa-static')(__dirname + '/build'))
app.use(views(__dirname + '/build', {
  extension: 'html'
}))

app.use(async(ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
})
app.use(async(ctx, next) => {
  await next()
  if(!ctx.session){
    ctx.session.flag = 1
  }
  if (ctx.response.status === 400) {
    ctx.response.redirect('?', ctx.request.url)
  }
})

// logger
//正常请求的日志
app.use(koaWinston(log.logger));
// add controller:
// app.use(controller());

// routes
app.use(index.routes(), index.allowedMethods())
app.use(signIn.routes(), signIn.allowedMethods())
app.use(signUp.routes(), signUp.allowedMethods())
app.use(articlePost.routes(), articlePost.allowedMethods())
app.use(articleList.routes(), articleList.allowedMethods())
app.use(articleDetails.routes(), articleDetails.allowedMethods())
app.use(articleEdit.routes(), articleEdit.allowedMethods())
app.use(comments.routes(), comments.allowedMethods())
app.use(message.routes(), message.allowedMethods())
app.use(tags.routes(), tags.allowedMethods())
// app.use(catalog.routes(), catalog.allowedMethods())
app.use(keepOnFileList.routes(), keepOnFileList.allowedMethods())
app.use(verifyKey.routes(), verifyKey.allowedMethods())

//错误请求的日志
app.use(koaWinston(log.errorloger));


module.exports = app
