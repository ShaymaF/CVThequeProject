const express = require('express');
 // path = require('path'),
  //cors = require('cors'),
  multer = require('multer');
 // bodyParser = require('body-parser');

// File upload settings  
const PATH = './uploads';
var router = express();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

let upload = multer({
  storage: storage
});

// Express settings
//const app = express();
/*app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));*/

router.get('/', function (req, res) {
  res.end('File catcher');
});

// POST File
router.post('/upload', upload.single('image'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');
    return res.send({
      success: true
    })
  }
});
module.exports = router;


