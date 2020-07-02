
var express = require('express')
, router = express.Router()
//var firebase=require('../Firebase/config').getConnection();
var firebase = require('firebase');

//var version = require('../model/version');
const bodyParser = require('body-parser');
router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//Create new version
router.post('/add', function (req, res) {

	console.log("HTTP Put Request");


	var referencePath = '/temp/';
	var userReference = firebase.database().ref(referencePath);

	
	var newPostRef = userReference.push();
	temp=req.body;
console.log('temp',temp);
	newPostRef.set(temp , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
                        
                        res.send("Data saved successfully."+ temp);
                        
					}
			});
});


//list version
router.get('/list', function (req, res) {

	console.log("HTTP Get Request");
	var userReference = firebase.database().ref("/temp/");

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
//getone version
router.get('/temp/:id', function (req, res) {
	let id = req.params.id;

	console.log("HTTP Get Request");
	var userReference = firebase.database().ref("/temp/"+id);

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
//Update existing instance
router.post('/update', function (req, res) {

	console.log("HTTP POST Request");

	//var description = req.body.description;


	var referencePath = '/temp/';
	var userReference = firebase.database().ref(referencePath);
	userReference.update({description: description}, 
				 function(error) {
					if (error) {
						res.send("Data could not be updated." + error);
					} 
					else {
						res.send("Data updated successfully.");
					}
			    });
});

//Delete an instance
router.delete('/delete', function (req, res) {

    var referencePath = '/temp/';
	var userReference = firebase.database().ref(referencePath);
	userReference.remove( 
				 function(error) {
					if (error) {
						res.send("Data could not be deleted." + error);
					} 
					else {
						res.send("Data deleted successfully.");
					}
			    });
});
//Delete an instance
router.delete('/deleteAll', function (req, res) {

	console.log("HTTP GET Request");


	var referencePath = '/temp/';
	var userReference = firebase.database().ref(referencePath);
	userReference.remove( 
				 function(error) {
					if (error) {
						res.send("Data could not be deleted." + error);
					} 
					else {
						res.send("Data deleted successfully.");
					}
			    });
});

router.post('/upload/:filename',  (req, res) => {
    console.log('Upload Image');
  
	let file = req.file;
	let filename=req.params.filename;
	console.log('file',file);
	console.log('filename',filename);

	console.log('file',file.filename);
//	const db = firebase.database()
	//const storage = firebase.storage()
	//var gcloud = require('@google-cloud/storage');
const storage = firebase.storage();

//const bucket = storage.bucket('cvthequepfe.appspot.com')


    //var storage = firebase.storage();
    var storageRef = storage.ref('img/'+filename);

  var task = storageRef.put(file);
  task.on('state_changed', function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    uploader.value = percentage;

  }, function error(err) {


  },function complete() {

  });
});  
module.exports = router
