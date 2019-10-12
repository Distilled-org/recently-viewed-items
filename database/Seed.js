const mongoose = require('mongoose');
const faker = require('faker');


const itemModel = require('./mongooseModel.js');

mongoose.connect('mongodb://localhost/items');

for (let i = 0; i < 100; i += 1) {
  const obj = {
    id: i,
    name: faker.commerce.productName(),
    photo: `https://fec-project-photos.s3.us-east-2.amazonaws.com/image${i}.jpg`,
  };
  itemModel.item.create(obj);
}
