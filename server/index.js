const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000 || process.env.PORT;
const bp = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const itemModel = require('../database/mongooseModel.js');

app.use(cors());
app.use(express.static(path.resolve(__dirname, '..', 'client', 'src', 'dist')));
app.use(bp.json());

app.get('/items/:id', (req, res) => {
  itemModel.item.findOne(req.params, (err, data) => {
    if (err) {
      res.send(500);
    } else {
      res.send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
