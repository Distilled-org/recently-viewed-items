import 'regenerator-runtime/runtime';
const itemModel = require('../database/mongooseModel.js');

describe('Database testing', () => {
  it('should fetch an item from the database', async () => {
    const random = Math.floor(Math.random() * Math.floor(99));
    const item = await itemModel.item.findOne({ id: random });
    expect(typeof item).toEqual('object');
  });
});
