const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const bp = require('body-parser');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bp.json());

app.get('/', function(req, res) {
  res.send('Hello World!')
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});