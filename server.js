const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
// this makes "config.env" file to work

const app = require('./app.js');
// . => current folder

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
