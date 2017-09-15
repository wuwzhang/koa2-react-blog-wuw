const Catalog = require('../models/').Catalog;

exports.create = (data) => (
  Catalog.create(data)
);

exports.getCatalogById = (id) => (
  Catalog.findOne({_id: id})
         .exec()
);

exports.getCatalogrByCatalogName = (catalog) => (
  Catalog.findOne({catalog: catalog}).exec()
);
