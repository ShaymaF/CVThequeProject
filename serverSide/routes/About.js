
var express = require('express');
var firebase = require('firebase');
var admin = require("firebase-admin");
var wkhtmltopdf = require('wkhtmltopdf');
var x11 = require('x11');
var sleep = require('system-sleep');
const open = require('open');

const path = require('path');

wkhtmltopdf.command = 'C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe';
//var firebase=require('../Firebase/config').getConnection();
var router = express();
var fs = require("fs");

var faker = require('faker/locale/fr');
//const translate = require('google-translate-api');




//Create new about
router.put('/add', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/about/';
	var userReference = firebase.database().ref(referencePath);

	about=faker.lorem.paragraph();
	//var newPostRef = userReference.push();
	aboutDesc={
	"desc":about
}

userReference.set(aboutDesc , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});

/*// List Student enrolments for a class
database.ref(`class_enrolments/${class1Id}`).once('value')
  .then((snapshot) => {
     console.log(snapshot.val())
  })*/

  //list about
router.get('/list/:uid', function (req, res) {
	console.log("HTTP Get Request from about");

		let userId=req.params.uid;

var ref = firebase.database().ref("/about");
var query = ref.orderByChild('uid').equalTo(userId);
query.once('value').then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
	console.log(snapshot.val());
	res.json(snapshot.val());
  });
 });
});


//list about
router.get('/all', function (req, res) {
	console.log("HTTP Get Request from about");
	var idToken= req.headers['x-access-token'];

	console.log("HTTP Get Request from about",idToken);

		/* admin.auth().verifyIdToken(idToken)
		.then(function(decodedToken) {
			let uid = decodedToken.uid;
		console.log('ID Token correctly decoded', uid);
		//req.user = decodedIdToken;
		});
*/
		var referencePath = '/about';
		var userReference = firebase.database().ref(referencePath);
	
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
	/*  }).catch (function(error) {
		console.error('Error while verifying Firebase ID token:', error);
		res.status(403).send('Unauthorized');
		return;
	  });*/
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


router.get('/getPDF', (req, res) => {
	
	res.sendFile("C://Users//shayma fradi//CvTheque//serverSide//files//news2020.pdf");

  })
router.post('/pdf', (req, res) => {
	//let id = req.params.id;
	// On récupère les options de conversion
	//let url ='http://localhost:4200/cv'
//var html =''+JSON.parse(res.body.html);
	//	res.send(JSON.stringify(req.body.html, null, 2));
//console.log(req.body.html);
html= req.body.html;
	 const name = "file.pdf";
	 const format = "Letter";
	 const orientation = "portrait";
	 let zoom =1;
	 zoom = zoom >= 1 && zoom <= 100 ? zoom : 1;
	 
	 const margin = {
		 top: (req.query.marginTop || 0) + "px",
		 right: (req.query.marginRight || 0) + "px",
		 bottom: (req.query.marginBottom || 0) + "px",
		 left: (req.query.marginLeft || 0) + "px"
	 };
	//console.log(req.originalUrl);
	 //  cors
	 res.header("Access-Control-Allow-Origin", "http://localhost:4200");
	 // type du fichier
	 res.header('content-type', 'application/pdf');
	 res.header('Content-Disposition', 'attachment; filename=' + name);
res.header('Access-Control-Allow-Headers', 'content-type');
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
 // on génère le PDF

 //console.log(c);

  wkhtmltopdf(
html,
	  {
		 encoding: 'utf-8' ,
		 pageSize: "A4", // taille du pdf généré; 'A3','A4','A5','Letter', 'Legal', 'Tabloid' 
		 marginTop:"5px", // marge haut
		 marginBottom:"40px", // marge bas
		 marginLeft:"20px",  // marge gauche
		 marginRight:"20px", // marge droite
		 orientation:"Portrait", // 'Portrait', 'Landscape'
		 loadErrorHandling:'ignore',
		 javascriptDelay:'2000',// time out avant de finir le javascript
		 zoom:zoom,//  min 1, maximum: 100, default:1,
		 lowquality:false,
		 //viewportSize: "500x500",
		 footerHtml:"https://firebasestorage.googleapis.com/v0/b/cvthequepfe.appspot.com/o/footer.html?alt=media&token=26c0f0f3-7912-4046-8bac-b4cf2928254"
		 //"enable-smart-shrinking":true,
		 //"--use-xserver":true
		
	 })
	 .pipe(fs.createWriteStream('files/PDFcv2.pdf'));
	 
	// res.download(__dirname + 'files/news1.pdf','cv.pdf');
	//open(__dirname + '/files/news1.pdf');
	/*res.download(__dirname + '/files/news1.pdf', function (err) {
		if (err) {
			console.log("Error");
			console.log(err);
		} else {
			console.log("Success");
		}
	});*/
//	res.download("C://Users//shayma fradi//CvTheque//serverSide//files//news1.pdf");
	 //sleep(20*1000); // sleep1 for 10 seconds
     //res.send()
	 //.pipe(res);
		//await sleep(1000)

		// res.send();
		// var file = fs.createReadStream(newcv.pdf);
     // console.log(res);
	/*.pipe(fs.createWriteStream('newcv1.pdf'));
		res.download( "newcv.pdf",function (err) {
			if (err) {
				console.log("Error");
				console.log(err);
			} else {
				console.log("Success");
			}
		});
	*/	});
	/*router.get('/getPdf', function (req, res) {
		var filePath = "files/newcv1.pdf";
	
		fs.readFile(__dirname + filePath , function (err,data){
			res.contentType("application/pdf");
			res.send(data);
		});
	});
	function sleep(ms) {
		return new Promise((resolve) => {
		  setTimeout(resolve, ms);
		

	});*/

	  
module.exports = router;
