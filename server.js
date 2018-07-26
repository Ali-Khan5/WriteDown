// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;
// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express bitches XD' });
//   console.log('i am runing the server lol from a folder before')
//   console.log("heuheuhuhehue")
// });
// app.listen(port, () => console.log(`Listening on port ${port}`));

const express = require('express');
const bodyParser = require('body-parser');
// create express app
const app = express();
//for our photo upload
const multer = require('multer');
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
//
app.use('/uploads', express.static('uploads'));
app.use(express.static(__dirname + '/public'));
// Configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true }).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});



// define a simple route
app.get('/', (req, res) => {
  res.json({ "message": "Welcome to Article application." });
});
app.get('/api/hello', (req, res) => {
 
  console.log('i am runing the server lol from a folder before')
  console.log("heuheuhuhehue")
});

//multer stores the pictures first in /upload folder and then sends that url to our DB
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);

  }
});
// making sure only our mentioned files are uploaded
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
//what will the maximum filesize of our photos will be
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
//   const upload=multer({
//       dest:"uploads/"
//   });
//gets our note controller
const notes = require('./app/controllers/note.controller');
//makes a post request 
app.post('/notes', upload.single('img'), notes.create);
require('./app/routes/note.routes')(app);
const port = process.env.PORT || 5000;
// listen for requests
app.listen(port, () => console.log(`Listening on port ${port}`));




