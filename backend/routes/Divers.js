
var express = require('express')
var firebase = require('firebase');
var router = express();

var faker = require('faker/locale/fr');

//Create new Experience

router.post('/add', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/experience/';
    var userReference = firebase.database().ref(referencePath);
    




	//var newPostRef = userReference.push();


	userReference.set(experience , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else { 
                    //    res.status(200).send(experience)
						res.send("Data saved successfully.");
					}
			});
});

//list experience
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


	var referencePath = '/experience/';
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


module.exports = router;
