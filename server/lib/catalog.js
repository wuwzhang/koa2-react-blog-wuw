const Catalog = require("../models/").Catalog;

exports.addCatalog = (catalogs, articleId) => {
  catalogs.forEach(async catalog => {
    await Catalog.findOne({ catalog: catalog }).then(async (res, err) => {
      if (err) {
        throw new Error(err);
      }
      if (res) {
        return Catalog.update(
          { catalog: catalog },
          { $addToSet: { articleId: articleId } }
        );
      } else {
        return Catalog.create({ catalog, articleId });
      }
    });
  });
};

exports.deleteCatalog = (catalogs, articleId) => {
  catalogs.forEach(async catalog => {
    await Catalog.update(
      { catalog: catalog },
      { $pull: { articleId: articleId } }
    ).then(async res => {
      if (res.ok != 1) {
        return false;
      }
      let ans = await Catalog.aggregate(
        { $match: { catalog: catalog } },
        {
          $addFields: {
            count: {
              $size: "$articleId"
            }
          }
        },
        {
          $project: {
            count: 1
          }
        }
      );

      if (ans[0].count === 0) {
        return await Catalog.remove({ catalog: catalog });
      } else {
        return true;
      }
    });
  });
};

exports.getArticleCatalogs = () => {
  return Catalog.aggregate(
    {
      $addFields: {
        count: {
          $size: "$articleId"
        }
      }
    },
    {
      $project: {
        _id: 1,
        catalog: 1,
        count: 1
      }
    }
  );
};

exports.getCatalogById = id => Catalog.findOne({ _id: id }).exec();

exports.getCatalogrByCatalogName = catalog =>
  Catalog.findOne({ catalog: catalog }).exec();
