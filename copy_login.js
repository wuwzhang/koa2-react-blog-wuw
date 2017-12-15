tagsArr.map(async iteam => {
  if (iteam) {
    let exist = await $Tag.findTagByTagName(iteam);
    if (!exist) {
      // console.log('标签不存在')
      await $Tag.create({ tag: iteam });
    }
  }
});

try {
  const articleModel = {
    title: article.title,
    content: article.content,
    tags: tagsArr.length === 0 ? ["其他"] : tagsArr,
    catalog: article.catalog || "其他"
  };

  var result = await $Article
    .getArticleByTitle(article.title)
    .then(async res => {
      console.log(res);
      if (res) {
        return $Article.create(articleModel);
      } else {
        throw new Error("getArticleByTitle Error");
      }
    });
  if (articleModel.catalog) {
    var exist = await $Catalog.getCatalogrByCatalogName(article.catalog);
    if (!exist) {
      await $Catalog.create({ catalog: article.catalog });
    }
  }
} catch (e) {
  if (e.message.match("E11000 duplicate key")) {
    code = "-1";
    message = "存在同名标题文章";
  } else {
    code = "-2";
    message = e.message;
  }
}
