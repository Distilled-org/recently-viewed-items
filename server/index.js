const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const bp = require('body-parser');
const path = require('path');

console.log(__dirname + '../client/src/dist')

app.use(express.static(path.resolve(__dirname, '..', 'client', 'src','dist')));
app.use(bp.json());

app.get('/', function(req, res) {
  res.send('Hello World!')
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});