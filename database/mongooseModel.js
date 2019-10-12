const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/items');

const { Schema } = mongoose;

const itemSchema = new Schema({
  id: Number,
  name: String,
  photo: String,
});

const item = mongoose.model('Item', itemSchema);

module.exports.item = item;
