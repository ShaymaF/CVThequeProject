
var express = require('express');
var firebase = require('firebase');

//var firebase=require('../Firebase/config').getConnection();
var router = express();

var faker = require('faker/locale/fr');
var dateFormat = require('dateformat');

company=faker.company.companyName();
ProjetName=faker.lorem.words(6);
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

//Create new projet
router.put('/add', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/projet/';
	var userReference = firebase.database().ref(referencePath);
	projet={
        "ProjetName":ProjetName,
        "ProjetDesc":ProjetDesc,
        "ProjetShort":ProjetShort,
        "ProjetStartDate":StartDate,
        "ProjetEndDate":EndDate,
        "MOE":company,
        "MOA":company,
        "competence":competences
        };
	var newPostRef = userReference.push();
	

	newPostRef.set(projet , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});

//Create new projet
router.put('/addOrga', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/Organisation/';
	var userReference = firebase.database().ref(referencePath);
	projet={
        "ProjetName":ProjetName,
        "ProjetDesc":ProjetDesc,
        "ProjetShort":ProjetShort,
        "ProjetStartDate":StartDate,
        "ProjetEndDate":EndDate,
        "MOE":company,
        "MOA":company,
        "competence":competences
        };
	var newPostRef = userReference.push();
	organisation=req.body;

	newPostRef.set(organisation , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});
router.get('/listOrga', function (req, res) {

	console.log("HTTP Get Request");
	var userReference = firebase.database().ref("/Organisation/");

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
//list projet
router.get('/list', function (req, res) {

	console.log("HTTP Get Request");
	var userReference = firebase.database().ref("/projet/");

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
