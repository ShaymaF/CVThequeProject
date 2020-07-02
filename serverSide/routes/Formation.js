
var express = require('express');
var firebase = require('firebase');

//var firebase=require('../Firebase/config').getConnection();
var router = express();

var faker = require('faker/locale/fr');
var dateFormat = require('dateformat');

//Create new formation
router.post('/add', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/formation';
	var userReference = firebase.database().ref(referencePath);

	//var newPostRef = userReference.push();
/*	company=faker.company.companyName();
    StartDate=dateFormat(faker.date.past(), "yyyy-mm-dd");
    EndDate=dateFormat(faker.date.between(StartDate,faker.date.recent()),"yyyy-mm-dd");
	formation=[{
		"University":company,
		"certification":faker.lorem.words(5),
		"start_date":StartDate,
		"end_date":EndDate,
		"diplome_date":EndDate,
	
	}]
*/
//	loisirs=faker.lorem.word();
var newPostRef = userReference.push();
/*loisirsDesc={
"desc":loisirs
}*/
var formation = req.body;


newPostRef.set(formation , 
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

var ref = firebase.database().ref("/formation");
var query = ref.orderByChild('uid').equalTo(userId);
query.once('value').then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
	console.log(snapshot.val());
	res.json(snapshot.val());
  });
 });
});

//list formation
router.get('/all', function (req, res) {

	console.log("HTTP Get Request");
	ref=firebase.database().ref('/formation');
	var userReference = firebase.database().ref('/formation');

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
router.get('/delete/:id', function (req, res) {

	console.log("HTTP GET Request");
	let id = req.params.id;
	console.log(id);

	var referencePath = '/formation/'+id;
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
