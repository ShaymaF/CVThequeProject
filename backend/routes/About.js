
var express = require('express');
var firebase = require('firebase');
var admin = require("firebase-admin");
var wkhtmltopdf = require('wkhtmltopdf');
wkhtmltopdf.command = 'C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe';
//var firebase=require('../Firebase/config').getConnection();
var router = express();
var fs = require("fs");

var faker = require('faker/locale/fr');

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


//list about
router.get('/list', function (req, res) {
	console.log("HTTP Get Request from about");
	var idToken= req.headers['x-access-token'];

	console.log("HTTP Get Request from about",idToken);

		  admin.auth().verifyIdToken(idToken)
		.then(function(decodedToken) {
			let uid = decodedToken.uid;
		console.log('ID Token correctly decoded', uid);
		//req.user = decodedIdToken;
	

		var referencePath = '/about/desc';
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
	  }).catch (function(error) {
		console.error('Error while verifying Firebase ID token:', error);
		res.status(403).send('Unauthorized');
		return;
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


router.get('/test', (req, res) => {
	res.render('index', {
	  title: 'Hello, world!',
	  content: 'How are you?'
	})
  })
router.get('/pdf', (req, res) => {
	// On récupère les options de conversion
	let url ='http://localhost:4200/cv'
	//let url = req.query.source;
	 const name = "file.pdf";
	 const format = "A4";
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
 var html='<div id="cv" class="container"> <style type="text/css"> .v0{vertical-align:0.000000px;} .ls1{letter-spacing:-1.360000px;} .ls0{letter-spacing:0.000000px;} .sc_{text-shadow:none;} .sc0{text-shadow:-0.015em 0 transparent,0 0.015em transparent,0.015em 0 transparent,0 -0.015em  transparent;} @media screen and (-webkit-min-device-pixel-ratio:0){ .sc_{-webkit-text-stroke:0px transparent;} .sc0{-webkit-text-stroke:0.015em transparent;text-shadow:none;} } .ws0{word-spacing:0.000000px;} .ws1{word-spacing:0.120000px;} .ws2{word-spacing:1.360000px;} ._3{display:inline;margin-left:-3.552000px;} ._0{display:inline;margin-left:-1.293600px;} ._2{display:inline-block;width:2.196000px;} ._1{display:inline-block;width:4.586400px;} .fc2{color:rgb(157,157,156);} .fc1{color:rgb(87,42,215);} .fc0{color:rgb(0,0,0);} .container{ width: 793.7013px; max-width:793.7013px; background-color: white; height: 2000px; padding-top: 0.5cm; box-shadow: 1px 1px 3px 1px #333; } .container .cv{ width: auto; max-width:21cm; } .header_logo{ background-image: url(/assets/media/Temp-2/logo_header.png); margin-top: 1.4cm; width: max-content; height:105.8268px ; background-repeat: no-repeat; background-size: 158.7403px 105.8268px; margin-left: 1mm; padding-left: 1.9cm; } .container .cv .name { font-size: 32pt; font-family: ff1; color: rgb(0,0,0); word-spacing: 0.000000px; text-shadow: -0.015em 0 transparent, 0 0.015em transparent, 0.015em 0 transparent, 0 -0.015em transparent; letter-spacing: 0.000000px; white-space: pre; } .container .cv .post { font-size: 14pt; font-family: ff2; color: rgb(0,0,0); word-spacing: 0.000000px; text-shadow: -0.015em 0 transparent, 0 0.015em transparent, 0.015em 0 transparent, 0 -0.015em transparent; letter-spacing: 0.000000px; white-space: pre; } .separator{ background-image: url(/assets/media/Temp-2/separator1.png); background-repeat: no-repeat; background-size: 8.5cm; width: 8.5cm; float: right; background-position-y: 16px; padding-bottom: 1cm; } .title{ font-family: ff1; line-height: 0.974000; font-style: normal; font-weight: normal; visibility: visible; font-size: 12pt; color: rgb(87,42,215); -webkit-text-stroke: 0.015em transparent; text-shadow: none; letter-spacing: 0.000000px; word-spacing: 0.000000px; margin-top: 1cm; margin-left: 1cm; padding-bottom: 1cm; /* padding-left: 1cm; */ background-image: url(/assets/media/Temp-2/title_background.png); background-repeat: no-repeat; background-size: 1.38cm 0.24cm; background-position-x: left; background-position-y: 8px; } .Apropos{ margin-left: 0.75cm; margin-right: 0.7cm; color: rgb(0,0,0); word-spacing: 0.000000px; -webkit-text-stroke: 0.015em transparent; text-shadow: none; letter-spacing: 0.000000px; font-size: 10pt; font-family: ff3; /*line-height: 1.059000;*/ font-style: normal; font-weight: normal; visibility: visible; } .date{ font-family: ff4; line-height: 0.957000; font-style: normal; font-weight: normal; visibility: visible; } .diplome .data{ font-family: ff3; line-height: 1.059000; font-style: normal; font-weight: normal; visibility: visible; } .competence{ font-family: ff3; line-height: 1.059000; font-style: normal; font-weight: normal; visibility: visible; } .level{ border-radius:50%; width:2mm; height:2mm; margin-left: 1mm; background-color: #DADAD9; } .full{ border-radius:50%; width:2mm; height:2mm; margin-left: 1mm; background-color: rgb(87,42,215); } .icon{ border-radius:50%; width:1.4cm; height:1.4cm; margin-left: 1cm; background-color: rgb(87,42,215); } .tools{ } .project{ color: rgb(157,157,156); font-family: ff3; font-size: 8pt; line-height: 1.059000; font-style: normal; font-weight: normal; visibility: visible; } .dateProject{ font-family: ff5; line-height: 1.036000; font-style: normal; font-weight: normal; visibility: visible; font-size: 9pt; } .titleProject{ font-family: ff6; line-height: 1.059000; font-style: normal; font-weight: normal; visibility: visible; font-size: 10pt; } .dataProject{ font-family: ff3; line-height: 1.059000; font-style: normal; font-weight: normal; visibility: visible; font-size: 10pt; } .mission{ font-family: ff5; font-style: normal; font-weight: normal; visibility: visible; font-size: 10pt; color: rgb(87,42,215); } </style> <div class="cv"> <div class="header_logo" > <div class="name">Oussama Lahmadi</div> <div class="post">Ingénieur développement  front end</div> </div> <div class="content"> <div class="separator"></div> <div class="title">A PROPOS</div> <div class="Apropos"> <ckeditor style="padding: 0px;"[editor]="Editor"   data=" <p>Développeur front end, j’ai travaillé sur des sujets passionnants et challengeant autour des technologies Front end dans les domaine de bancaire, service RH et Télécommunication et les applicationmobile d’entreprise. </p> <p>Cela fait 5 ans que j’interviens sur des projets en tant que Solution Builder ce qui m’a permis d’acquérir de bonnes compétences dans la conception, l’architecture, le développement en équipe, ainsi que savoir être à l’écoute du client durant les différentes étape des projets, s’appuyant souvent sur la méthodologie Agile. </p> <p>Aujourd’hui mon rôle de lead développeur me permet de continuer de m’épanouir au travers de nouveaux défis humains et technique. </p>"></ckeditor> </div> </div> <div class="content"> <div class="separator"></div> <div class="title">FORMATIONS</div> <div class="Apropos row"> <div class="date col-2">2012-2015</div> <div class="diplome col-10">Diplôme Nationale d’ingénieur en génie Télécommunication ENET’COM</div> </div> <br> <div class="Apropos row"> <div class="date col-2">2008-2012</div> <div class="diplome col-10">Cycle Préparatoire IPEI Manar</div> </div> <br> <div class="Apropos row"> <div class="date col-2">2008</div> <div class="diplome col-10">Baccalauréat Mathématique</div> </div> </div> <div class="content"> <div class="separator"></div> <div class="title">COMPÉTENCES CLÉS</div> <div class="Apropos row "> <div class="competence col-6">Analyse et conception</div> <div class="col-3" style="display: inline-flex"> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="level"></div> <div class="level"></div> <div class="level"></div> <div class="level"></div> <div class="level"></div> </div> <div class="tools col-4"></div> </div> <br> <div class="Apropos row "> <div class="competence col-6">Dév. et tests</div> <div class="col-3" style="display: inherit"> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="level"></div> <div class="level"></div> <div class="level"></div> </div> <div class="tools col-4"></div> </div> </div> <br><br> <div class="content "> <div class="row col-12"> <div class="col-6 "> <div class="separator col-8"></div> <div class="title col-2" style="display: inline;padding-left: initial; margin-left: 7.5mm;">LANGUES</div> <div class="row"style="padding-top: 0.9cm;"></div> <div class="Apropos row "style="display: inline-flex;" > <div class="competence  " style="width: 3cm;">Anglais</div> <div class="" style="display: flex;"> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="level"></div> <div class="level"></div> <div class="level"></div> <div class="level"></div> <div class="level"></div> </div> </div> <div class="Apropos row "style="display: inline-flex; margin-bottom: 0.4cm;" > <div class="competence "style="width: 3cm;">Français</div> <div class="" style="display: flex; float: left;"> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="full"></div> <div class="level"></div> <div class="level"></div> </div> </div> </div> <div class="col-6"> <div class="separator col-8"></div> <div class="title col-2" style="display: inline;padding-left: initial; margin-left: 7.5mm;">LOISIR</div> <div class="row"style="padding-top: 0.9cm;"></div> <div class="Apropos row "style="display: inline-flex;" > <div class="" style="display: flex;"> <div class="icon"></div> <div class="icon"></div> <div class="icon"></div> </div> </div> </div> </div> <div class="content"> <div class="separator"></div> <div class="title">PARCOURS PROFESSIONNEL</div> <div class="Apropos "> <div class="row"> <div class="dateProject col-sm-9">03 /2019   -   06/2019 <div class="row"> <div class="project col-8 col-sm-6"> Conception et Développemen </div> </div> </div> </div><br> <div class="row"> <div class="titleProject col-sm-9">Team leader- Proxym IT <div class="row"> <div class="dataProject col-8 col-sm-6"> Banckerise - Proxym IT </div> </div> </div> </div><br> <div class="row  col-12"> <div class="diplome "> <a>Migration de Backend d’une application java vers AWS serverless avec nodejs en typescript</a> </div> </div><br> <div class="row"> <div class="mission col-sm-12 col-12">Mission</div> <div class="diplome "> <div class=" col-12 col-sm-12"> <span style="color:rgb(87,42,215);">&#8226; </span> <a> Participation à la mise en place de l’architecture technique et le choix des services AWS</a><br> <span style="color:rgb(87,42,215);">&#8226; </span> <a> Conception de la base de donné DynamoDB</a> </div> </div> </div><br> <div class="row"> <div class="mission col-sm-12 col-12">Environnement Technique</div> <div class="diplome"> <div class=" col-12 col-sm-12"> <a>Nodejs, Typescript, AWS, serverless (Lambda, API Gateway), CloudFormation, DynamoDB, AWS Cognito, GitLab .</a> </div> </div> </div> </div> <br> </div> </div> </div> </div>';
	 wkhtmltopdf(
		'http://localhost:4200/home/cv-temp2',

	  {
		 pageSize: format, // taille du pdf généré; 'A3','A4','A5','Letter', 'Legal', 'Tabloid' 
		 marginTop:margin.top, // marge haut
		 marginBottom:margin.bottom, // marge bas
		 marginLeft:margin.left,  // marge gauche
		 marginRight:margin.right, // marge droite
		 orientation:orientation, // 'Portrait', 'Landdcape'
		 loadErrorHandling:'ignore',
		 javascriptDelay:'5000',// time out avant de finir le javascript
		 zoom:zoom,//  min 1, maximum: 100, default:1,
		 lowquality:true﻿
	 })
		 .pipe(res)
		 ;
		//.pipe(fs.createWriteStream('output.pdf'));
 });
module.exports = router;
