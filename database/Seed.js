const mongoose = require('mongoose');
const faker = require('faker');


const itemModel = require('./mongooseModel.js');

mongoose.connect('mongodb://localhost/items', { useNewUrlParser: true, useUnifiedTopology: true });

function createImageObjects() {
  const result = [];
  const max = Math.floor(Math.random() * (6 - 1)) + 4;
  for (let i = 0; i < max; i += 1) {
    const imageIdx = (Math.floor(Math.random() * 99));
    const obj = {
      id: imageIdx,
      name: faker.commerce.productName(),
      photo: `https://fec-project-photos.s3.us-east-2.amazonaws.com/image${imageIdx}.jpg`,
    };
    result.push(obj);
  }
  return result;
}

for (let i = 0; i < 100; i += 1) {
  const obj = {
    id: i,
    imgObjects: createImageObjects(),
  };
  itemModel.item.create(obj);
}
