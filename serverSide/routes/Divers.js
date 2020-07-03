
var express = require('express')
var firebase = require('firebase');
var router = express();

var faker = require('faker/locale/fr');

//Create new divers

router.post('/add', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/divers/';
    var userReference = firebase.database().ref(referencePath);
    
	var divers = req.body;




	//var newPostRef = userReference.push();


	userReference.set(divers , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else { 
                    //    res.status(200).send(divers)
						res.send("Data saved successfully.");
					}
			});
});

router.get('/list/:uid', function (req, res) {
	console.log("HTTP Get Request from about");

		let userId=req.params.uid;

var ref = firebase.database().ref("/divers");
var query = ref.orderByChild('uid').equalTo(userId);
query.once('value').then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
	console.log(snapshot.val());
	res.json(snapshot.val());
  });
 });
});

//list divers
router.get('/all', function (req, res) {

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
router.get('/delete/:id', function (req, res) {

	console.log("HTTP GET Request");
	let id = req.params.id;
	console.log(id);

	var referencePath = '/divers/'+id;
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


module.exports = router;
