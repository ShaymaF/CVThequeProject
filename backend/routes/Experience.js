
var express = require('express');
var firebase = require('firebase');

//var firebase=require('../Firebase/config').getConnection();
var router = express();

var faker = require('faker/locale/fr');
var dateFormat = require('dateformat');

company=faker.company.companyName();
ProjetName=faker.lorem.word();
ProjetDesc=faker.lorem.paragraph();
ProjetShort=faker.lorem.lines(1);
StartDate=dateFormat(faker.date.past(), "yyyy-mm-dd");
EndDate=dateFormat(faker.date.between(StartDate,faker.date.recent()),"yyyy-mm-dd");
competence=faker.lorem.word();
competenceType={
	nameT1:"Compétences techniques",
	nameT2:"Compétences de gestion",
	nameT3:"Compétences humaines "

}
competenceLevel={
	Level1:"débutant",
	Level2:"avancé",
	Level3:"expert"

}
competences={
"type":competenceType.nameT1,
"name":competence,
"niveau":competenceLevel.Level3
}
project={
"ProjetName":ProjetName,
"ProjetDesc":ProjetDesc,
"ProjetShort":ProjetShort,
"ProjetStartDate":StartDate,
"ProjetEndDate":EndDate,
"MOE":company,
"MOA":company,
"competence":competences
}


//Create new Experience

router.post('/add', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/experience/';
	var userReference = firebase.database().ref(referencePath);
	experience=req.body;
	var newPostRef = userReference.push();
	

	newPostRef.set(experience , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});


//list experience
router.get('/list', function (req, res) {

	console.log("HTTP Get Request");
	var userReference = firebase.database().ref("/experience/");

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
router.get('/delete/:id', function (req, res) {

	console.log("HTTP GET Request");
	let id = req.params.id;
	console.log(id);

	var referencePath = '/experience/'+id;
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
