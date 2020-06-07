
var express = require('express');
var firebase = require('firebase');
var admin = require("firebase-admin");

//var firebase=require('../Firebase/config').getConnection();
var router = express();

var faker = require('faker/locale/fr');

//Create new person
router.put('/add', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/person/';
	var userReference = firebase.database().ref(referencePath);

	Person=req.body;
	var newPostRef = userReference.push();


	newPostRef.set(Person , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});


//list person
router.get('/list', function (req, res) {

	console.log("HTTP Get Request");
	var referencePath = '/person';
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
//Update existing instance
router.post('/update', function (req, res) {

	console.log("HTTP POST Request");

	//var description = req.body.description;


	var referencePath = '/person/';
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

   console.log("HTTP DELETE Request");
   //todo
});

router.get('/findOne/:id', function (req, res) {
let userId=req.params.id;
	console.log("HTTP Get Request");
	console.log(userId);
 var ref = admin.database().ref("person");
    var query = ref.orderByChild('uid').equalTo(userId);
    query.once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
		 
		 console.log(childSnapshot.val());
					res.json(childSnapshot.val());
					//userReference.off("value");
      });
     

  }); 


});
module.exports = router;
