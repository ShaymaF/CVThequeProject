
var express = require('express')
, router = express.Router()
//var firebase=require('../Firebase/config').getConnection();
var faker = require('faker/locale/fr');
var firebase=require('../Firebase/config').getConnection();


//Create new divers
router.put('/add', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/divers/';
	var userReference = firebase.database().ref(referencePath);

	divers=faker.lorem.lines(1);
	var newPostRef = userReference.push();
	diversDesc={
	"desc":divers
}

	newPostRef.set(diversDesc , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});


//list divers
router.get('/list', function (req, res) {

	console.log("HTTP Get Request");
	var userReference = firebase.database().ref("/divers/");

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


	var referencePath = '/divers/';
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


module.exports = router
