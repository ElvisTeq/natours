const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// this makes "config.env" file to work
// Has to be declared before "app" => becase by calling app, it will create our application without the dotenv file

const app = require('./app');
// . => current folder

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
