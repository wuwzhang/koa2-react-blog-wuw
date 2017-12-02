const router = require('koa-router')()

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {

//   })
// })

const signIn = require('./signIn')
const signUp = require('./signUp')
const signOut = require('./signOut')
const articlePost = require('./articlePost')
const articleList = require('./articleList')
const articleDetails = require('./articleDetails')
const articleEdit = require('./articleEdit')
const comments = require('./comments')
const message = require('./message')
const tags = require('./tags')
const keepOnFileList = require('./keepOnFileList')
const verifyKey = require('./verifymail')
const github = require('./github')

router.use(signIn.routes(), signIn.allowedMethods())
router.use(github.routes(), github.allowedMethods())
router.use(signUp.routes(), signUp.allowedMethods())
router.use(signOut.routes(), signOut.allowedMethods())
router.use(articlePost.routes(), articlePost.allowedMethods())
router.use(articleList.routes(), articleList.allowedMethods())
router.use(articleDetails.routes(), articleDetails.allowedMethods())
router.use(articleEdit.routes(), articleEdit.allowedMethods())
router.use(comments.routes(), comments.allowedMethods())
router.use(message.routes(), message.allowedMethods())
router.use(tags.routes(), tags.allowedMethods())
router.use(keepOnFileList.routes(), keepOnFileList.allowedMethods())
router.use(verifyKey.routes(), verifyKey.allowedMethods())

module.exports = router
