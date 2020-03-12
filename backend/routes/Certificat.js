
var express = require('express');
var firebase = require('firebase');

//var firebase=require('../Firebase/config').getConnection();
var router = express();

var faker = require('faker/locale/fr');
var dateFormat = require('dateformat');

//Create new certificat
router.post('/add', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/certificat';
	var userReference = firebase.database().ref(referencePath);

	//var newPostRef = userReference.push();
	company=faker.company.companyName();
    StartDate=dateFormat(faker.date.past(), "yyyy-mm-dd");
    EndDate=dateFormat(faker.date.between(StartDate,faker.date.recent()),"yyyy-mm-dd");
	certificat=[{
		"University":company,
		"certification":faker.lorem.words(5),
		"start_date":StartDate,
		"end_date":EndDate,
		"diplome_date":EndDate,
	
	}]

	userReference.set(certificat , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});
//list certificat
router.get('/list', function (req, res) {

	console.log("HTTP Get Request");
	ref=firebase.database().ref('/certificat');
	var userReference = firebase.database().ref('/certificat');

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
module.exports = router
