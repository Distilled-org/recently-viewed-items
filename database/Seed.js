const mongoose = require('mongoose');
const faker = require('faker');


const itemModel = require('./mongooseModel.js');

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

async function addData() {
  const promises = [];
  for (let i = 0; i < 100; i += 1) {
    const obj = {
      id: i,
      imgObjects: createImageObjects(),
    };
    // eslint-disable-next-line no-await-in-loop
    const newItem = await itemModel.item.create(obj);
    promises.push(newItem);
  }
  return promises;
}

addData()
  .then(() => {
    console.log('Database complete!');
    process.exit();
  })
  .catch((err) => {
    console.log('An error occurred in database creation');
    console.log(err);
  });
