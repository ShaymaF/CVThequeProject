const path = require('path');
const express = require('express');
const googleStorage = require('@google-cloud/storage');
const Multer = require('multer');const bodyParser = require('body-parser')
const router = express();
//var firebase = require('firebase');

const storage = googleStorage({
    projectId: "cvthequepfe",
    keyFilename: "AIzaSyBQZR7TM60pzo8WrEkQ8-29SQDdk-SQGsw"
  });
  
  const bucket = storage.bucket("cvthequepfe.appspot.com");

  const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
  });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
 
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
 
router.get('/api', function (req, res) {
  res.end('file upload');
});
 
router.post('/api/upload', multer.single('file'), (req, res) => {
    console.log('Upload Image');
  
    let file = req.file;
    if (file) {
      uploadImageToStorage(file).then((success) => {
        res.status(200).send({
          status: 'success'
        });
      }).catch((error) => {
        console.error(error);
      });
    }
  });
  
 /*
//Create new about
router.post('/api/upload' ,function (req, res) {

	console.log("HTTP Put Request");



userReference.set(upload.single('file') , 
				 function(error) {
                    if (!req.file) {
                        console.log("Your request doesn’t have any file");
                        return res.send({
                          success: false
                        });
                    
                      } else {
                        console.log('Your file has been received successfully');
                        return res.send({
                          success: true
                        })
                      }
			});
});
*/
//list about
router.get('/list', function (req, res) {

	console.log("HTTP Get Request");
	var referencePath = '/about/desc';
	var userReference = firebase.database().ref(referencePath);

	//Attach an asynchronous callback to read the data
	userReference.on("value", 
			  function(snapshot) {
					console.log(snapshot.val());
					res.json(snapshot.val());
					userReference.off("value");
					}, 
			  function (errorObject) {
					console.log("The read failed: " + errorObject.code);
					res.send("The read failed: " + errorObject.code);
			 });

});







const PORT = process.env.PORT || 8080;
 
router.listen(PORT, function () {
  console.log('Node.js server is running on port ' + PORT);
});