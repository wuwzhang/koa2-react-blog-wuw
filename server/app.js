const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const session = require('koa-generic-session')
const cors = require('koa2-cors')
const redis = require('./utils/redisUtils.js')

const config = require('config-lite')(__dirname)

const routers = require('./routes/index.js')

const log = require('./logs/log')

const koaWinston = require('./middlewares/koa-winston')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))


app.use(cors({
  origin: function(ctx) {
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.keys = ['wuw', 'blog'];

redis.start();

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
});

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


//router
app.use(routers.routes(), routers.allowedMethods())

//错误请求的日志
app.use(koaWinston(log.errorloger));


module.exports = app
