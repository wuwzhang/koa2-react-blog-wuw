const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const session = require("koa-generic-session");
const redisStore = require("koa-session-ioredis");
const middlewares = require("./middlewares/index");
const redis = require("./utils/redisUtils.js");
const routers = require("./routes/index.js");

const log = require("./logs/log");
// error handler
onerror(app);

app.keys = ["wuw", "blog"];
app.use(
  session({
    store: redisStore({})
  })
);

// middlewares
app.use(bodyparser({ enableTypes: ["json", "form", "text"] }));
app.use(json());
app.use(require("koa-static")(__dirname + "/build"));
app.use(views(__dirname + "/build", { extension: "html" }));
// app.use(middlewares.page404())
// app.use(middlewares.page500())

// logger
//正常请求的日志
app.use(middlewares.koaWinston(log.logger));

//router
app.use(routers.routes(), routers.allowedMethods());

//错误请求的日志
app.use(middlewares.koaWinston(log.errorloger));

redis.start();

module.exports = app;
