const express = require('express');
// express contains a bunch of function we can use
const app = express();
// We store/assign the functions to 'app'

app.get('/', (req, res) => {
  // '/' => main URL
  res
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
