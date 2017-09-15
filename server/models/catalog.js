var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CatalogSchema = new Schema({
  catalog: {type: String, default: ''},
  created_at: { type: Date, default: Date.now },
  updatad_at: { type: Date, default: Date.now }
}, { versionKey: false });

CatalogSchema.set('toJSON', { getters: true, virtuals: true })
CatalogSchema.set('toObject', { getters: true, virtuals: true })

module.exports = mongoose.model('Catalog', CatalogSchema);
