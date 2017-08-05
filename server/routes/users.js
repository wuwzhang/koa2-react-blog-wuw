const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
// var controller = require('../../controllers/user');

// router.get('/getUser', controller.getUser);
// router.post('/register', controller.registerUser);

module.exports = router
