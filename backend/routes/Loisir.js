
var express = require('express')
, router = express.Router()
var faker = require('faker/locale/fr');
var firebase = require('firebase');


//Create new loisirs
router.post('/add', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/loisirs/';
	var userReference = firebase.database().ref(referencePath);

//	loisirs=faker.lorem.word();
	var newPostRef = userReference.push();
	/*loisirsDesc={
	"desc":loisirs
}*/
var loisirs = req.body;


	newPostRef.set(loisirs , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});


//list loisirs
router.get('/list', function (req, res) {

	console.log("HTTP Get Request");
	var userReference = firebase.database().ref("/loisirs/");

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


	var referencePath = '/loisirs/';
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
router.get('/delete/:id', function (req, res) {

	console.log("HTTP GET Request");
	let id = req.params.id;
	console.log(id);

	var referencePath = '/loisirs/'+id;
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



module.exports = router
