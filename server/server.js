const path = require("path");
const express = require("express");
const axios = require('axios');

const app = express;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/dist")));


app.get('https://api.rawg.io/api/games/', (req, res) => {
  getProductInfo(req.url, req.params)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log('fetching error***********', err);
    })
})

// app.get('/', (req, res) => {
//   console.log('asdf');
//   res.send('hello')
// })




app.listen(3000, () => {
  console.log('Listening on PORT 3000.');
});