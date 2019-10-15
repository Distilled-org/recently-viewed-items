const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/items', { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const itemSchema = new Schema({
  id: Number,
  name: String,
  imgObjects: Array,
});

const item = mongoose.model('Item', itemSchema);

module.exports.item = item;
