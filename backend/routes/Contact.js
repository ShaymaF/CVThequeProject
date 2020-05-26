
var express = require('express');
var firebase = require('firebase');

//var firebase=require('../Firebase/config').getConnection();
var router = express();

var faker = require('faker/locale/fr');

//Create new contact
router.put('/add', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/contact/';
	var userReference = firebase.database().ref(referencePath);

	contact=faker.lorem.paragraph();
	//var newPostRef = userReference.push();
	contactDesc={
	"desc":contact
}

userReference.set(contactDesc , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});


//list contact
router.get('/list', function (req, res) {

	console.log("HTTP Get Request");

/*	var ref = firebase.database().ref("contact");
ref.child(userUID).once("value", function(snapshot) {
  if (snapshot.exists()) {
      console.log(snapshot.val());
    }
  else {
      console.log("different user");    
  }
});*/

	//Attach an asynchronous callback to read the data
	var ref = firebase.database().ref("contact").orderByKey();
	ref.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
      // childData will be the actual contents of the child
	  var childData = childSnapshot.val();
	  console.log(childData);
	  res.status(200).json(childData)	; 
	});
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


module.exports = router;
