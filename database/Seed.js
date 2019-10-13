const mongoose = require('mongoose');
const faker = require('faker');


const itemModel = require('./mongooseModel.js');

mongoose.connect('mongodb://localhost/items', { useNewUrlParser: true });

function createRandomImages() {
  const result = [];
  const oneToTen = Math.floor(Math.random() * (11 - 1)) + 1;
  for (let i = 0; i < oneToTen; i += 1) {
    const imageIdx = (Math.floor(Math.random() * 100));
    result.push(`https://fec-project-photos.s3.us-east-2.amazonaws.com/image${imageIdx}.jpg`);
  }
  return result;
}

for (let i = 0; i < 100; i += 1) {
  const obj = {
    id: i,
    name: faker.commerce.productName(),
    photo: createRandomImages(),
  };
  itemModel.item.create(obj);
}
