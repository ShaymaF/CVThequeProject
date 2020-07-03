
var express = require('express')
, router = express.Router()
var faker = require('faker/locale/fr');
var firebase = require('firebase');


//Create new competence
router.post('/add', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/competences/';
	var userReference = firebase.database().ref(referencePath);

	//competence=faker.lorem.word();
	var newPostRef = userReference.push();
	/*competenceDesc={
	"competence":competence
}*/
var competence = req.body;

	newPostRef.set(competence , 
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

var ref = firebase.database().ref("/competences");
var query = ref.orderByChild('uid').equalTo(userId);
query.once('value').then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
	console.log(snapshot.val());
	res.json(snapshot.val());
  });
 });
});

//list competence
router.get('/all', function (req, res) {

	console.log("HTTP Get Request");
	var userReference = firebase.database().ref("/competences/");

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


	var referencePath = '/competences/';
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

	var referencePath = '/competences/'+id;
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
