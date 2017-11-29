const cors = require('./cors')
const koaWinston = require('./koa-winston')
const error = require('./error')
const page404 = require('./page404')
const page500 = require('./page500')

module.exports = {
  cors,
  koaWinston,
  error,
  page404,
  page500
}
