
var express = require('express');
var firebase = require('firebase');

//var firebase=require('../Firebase/config').getConnection();
var router = express();

var faker = require('faker/locale/fr');

//Create new contact
router.post('/add', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/contact/';
	var userReference = firebase.database().ref(referencePath);

	contact=req.body;
	//var newPostRef = userReference.push();
	var newPostRef = userReference.push();


	newPostRef.set(contact , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});

router.get('/list/:uid', function (req, res) {
	console.log("HTTP Get Request from about");

		let userId=req.params.uid;

var ref = firebase.database().ref("/contact");
var query = ref.orderByChild('uid').equalTo(userId);
query.once('value').then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
	console.log(snapshot.val());
	res.json(snapshot.val());
  });
 });
});
//list contact
router.get('/all', function (req, res) {

	console.log("HTTP Get Request");
	var userReference = firebase.database().ref("/contact/");

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


//Delete an instance
router.delete('/delete', function (req, res) {

   console.log("HTTP DELETE Request");
   //todo
});


module.exports = router;
