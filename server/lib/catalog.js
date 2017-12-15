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
