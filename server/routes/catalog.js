// const router = require('koa-router')();
// const Models = require('../lib/core');
// const $Article = Models.$Article;

// /**
//  * 获取所有分类
//  */
// router.get('/api/getCatalogsAndCount', async(ctx, next) => {
//   let code = '1', message = 'ok';

//   try {
//     var result = await $Article.getArticleCatalogs();

//      console.log(result)
//   } catch (e) {
//     code = '-1',
//     message = e.message
//   }

//   ctx.response.body = {
//     'code': code,
//     'message': message,
//     'tags': result
//   }
// });

// module.exports = router;

