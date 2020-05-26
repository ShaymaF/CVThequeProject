const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
var faker = require('faker/locale/fr');
var dateFormat = require('dateformat');
const router = express.Router();

app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
//app.use('/experience', require('./routes/Experience'));
//app.use('/divers', require('./routes/Divers'));
//app.use('/langues', require('./routes/Langues'));
app.use('/about', require('./routes/About'));
//app.use('/loisirs', require('./routes/Loisir'));

//app.use(require('./controllers'))
//app.use(bodyParser.json());
/**fake data Person***/
let genders = [ 'female' , 'male' ];
let gender = faker.random.arrayElement(genders);

console.log(gender);
let firstName = faker.name.firstName(gender);
console.log(firstName);

let lastName = faker.name.lastName();
console.log(lastName);

let jobTitle = faker.name.jobTitle();
console.log(jobTitle);



let hiringDate = dateFormat(faker.date.past(),"yyyy-mm-dd");
console.log(hiringDate);

let profilImage=faker.image.business(gender);
console.log('image',profilImage);

/**fake data Person contact***/
let image=faker.image.avatar();
let telPro = faker.phone.phoneNumber();
let telPerso = faker.phone.phoneNumber();
var MailPro = faker.internet.email(); // Rusty@arne.info
var MailPerso = faker.internet.email(); // Rusty@arne.info
var company = faker.company.companyName();

var pays = faker.address.country();

console.log('pays',pays);
var ville = faker.address.city(pays);
console.log('ville',ville);
var codePostal = faker.address.zipCode(); // Rusty@arne.info
console.log('codePostal',codePostal);


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
about=faker.lorem.paragraph();

aboutDesc={
	"desc":about
}

ProjetName=faker.lorem.word();
ProjetDesc=faker.lorem.paragraph();
ProjetShort=faker.lorem.lines(1);
StartDate=dateFormat(faker.date.past(), "yyyy-mm-dd");
EndDate=dateFormat(faker.date.between(StartDate,faker.date.recent()),"yyyy-mm-dd");
projet={
"ProjetName":ProjetName,
"ProjetDesc":ProjetDesc,
"ProjetShort":ProjetShort,
"ProjetStartDate":StartDate,
"ProjetEndDate":EndDate,
"MOE":company,
"MOA":company,
"competence":competences
}

experience={
    "projet":projet,
	"StartDate":StartDate,
	"EndDate":EndDate,
	"Role":faker.lorem.lines(1),
	"Poste":faker.lorem.words()

}

//Create new person
app.put('/person', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/person/';
	var userReference = firebase.database().ref(referencePath);

	Person={
		firstName,lastName,jobTitle,hiringDate,gender,image
	}
	var newPostRef = userReference.push();


	newPostRef.set(Person , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});

//Create new about
app.put('/about', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/about/';
	var userReference = firebase.database().ref(referencePath);

	var newPostRef = userReference.push();

	newPostRef.set(aboutDesc , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});

//Create new competence
app.put('/competence', function (req, res) {
	
	console.log("HTTP Put Request");

	var referencePath = '/competence/';
	var userReference = firebase.database().ref(referencePath);

	var newPostRef = userReference.push();

	newPostRef.set(competences , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});



//Create new Projet
app.put('/projet', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/projet/';
	var userReference = firebase.database().ref(referencePath);





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






//Create new contact
app.put('/contact', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/contact/';
	var userReference = firebase.database().ref(referencePath);

	Contact={
		telPro,telPerso,MailPro,MailPerso		
	}
	var newPostRef = userReference.push();

newPostRef.set(Contact , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});

//Create new adresse
app.put('/adresse', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/adresse/';
	var userReference = firebase.database().ref(referencePath);

	Adresse={
		pays,ville,codePostal		
	}
	
	var newPostRef = userReference.push();


	newPostRef.set(Adresse , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});

//Create new company
app.put('/company', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/company/';
	var userReference = firebase.database().ref(referencePath);

	var newPostRef = userReference.push();
	newPostRef.set(company , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});
//Create new formation
app.put('/for', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/for';
	var userReference = firebase.database().ref(referencePath);

	//var newPostRef = userReference.push();
	typeFormation={
		"type1":"Formation Académique",
		"type2":"Formation Professionnelle"
	   
		}
	formation=[{
		"University":company,
		"certification":faker.lorem.words(5),
		"start_date":StartDate,
		"end_date":EndDate,
		"diplome_date":EndDate,
		"typeFormation": typeFormation.type2
	
	}]

	userReference.set(formation , 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});
//Create new university

app.put('/university', function (req, res) {

	console.log("HTTP Put Request");

	var referencePath = '/university/';
	var userReference = firebase.database().ref(referencePath);

	var newPostRef = userReference.push();
	university={
		"nom":company,
		"ville":ville,
		"pays":pays
	}

	newPostRef.set(university , 
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
app.get('/contact/list', function (req, res) {

	console.log("HTTP Get Request");
	var userReference = firebase.database().ref("/contact/");

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
//list formation
app.get('/formation/list', function (req, res) {

	console.log("HTTP Get Request");
	ref=firebase.database().ref('/formation');
	var userReference = firebase.database().ref('/formation').child('/University');

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
app.get('/projet/list', function (req, res) {

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


/********************************ABOUT************************************* */
//Fetch instances
app.get('/', function (req, res) {

	console.log("HTTP Get Request");
	var userReference = firebase.database().ref("/Abouts/");

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



//Create new instance
app.put('/', function (req, res) {

	console.log("HTTP Put Request");

	var description = req.body.description;


	var referencePath = '/Abouts/'+description+'/';
	var userReference = firebase.database().ref(referencePath);



	userReference.set({description: description}, 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});




//Update existing instance
app.post('/', function (req, res) {

	console.log("HTTP POST Request");

	var description = req.body.description;


	var referencePath = '/Abouts/'+description+'/';
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
app.delete('/', function (req, res) {

   console.log("HTTP DELETE Request");
   //todo
});


/********************************FormationPro************************************* */
/*


//Create new instance
app.put('/', function (req, res) {

	console.log("HTTP Put Request");

	var description = req.body.description;


	var referencePath = '/Abouts/'+description+'/';
	var userReference = firebase.database().ref(referencePath);
	userReference.set({description: description}, 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});


/**********Custom Token********/

var admin = require("firebase-admin");

var serviceAccount = require("./generate-token/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cvthequepfe.firebaseio.com"
});
const uid='some-id';
const additionnalClaims={premiumAccount: true};
admin.auth().createCustomToken(uid,additionnalClaims)
      .then((customToken) => {
console.log(customToken);
      })
      .catch((error)=> {
        console.log('Error creating custom token:',error)
      });
    
  /*  
var ldap = require("ldapjs");



 try{

        var client = ldap.createClient({
            url:'ldap://172.16.200.99:389',
            //LDAP_PROXYM_HOST=ldap://172.16.200.99:389
            reconnect: true,
            idleTimeout: 3000,




        });
        var opts = {
            filter: "(&(objectClass=inetOrgPerson))",
            scope: "sub",
            attributes: ["dn", "cn",]
        };

            client.bind(`cn=${req.body.name}, CN=Users,DC=dcdev,DC=dev`, req.body.password, function (err) {
                if (err) {
                    console.log("err1" + err);
                    return res.status(404).send('User not found');
                } else {
                   
                       //générer token jwt

                        }
                    })
               client.unbind()
            
        }catch (e) {
            console.log(e)
        }

    
var ldap = require("ldapjs");
//const express = require('express');

//var app = express();

 try{

        var client = ldap.createClient({
            url:'ldap://172.16.200.99:389',
            //LDAP_PROXYM_HOST=ldap://172.16.200.99:389
            reconnect: true,
            idleTimeout: 3000,
     
 });
 
        var opts = {
            filter: "(&(objectClass=inetOrgPerson))",
            scope: "sub",
            attributes: ["dn", "cn",]
        };
app.get('/login', function (req, res) {
            client.bind(`cn=${req.body.name}, CN=Users,DC=dcdev,DC=dev`, req.body.password, function (err) {
                if (err) {
                    console.log("err1" + err);
                    return res.status(404).send('User not found');
                } else {
                   
                       //générer token jwt
console.log('ok');
                        }
                    })
                });

               client.unbind()
            
        }catch (e) {
            console.log(e)
        }
*/
/********************************Server************************************* */

app.use(bodyParser.json());

var server = app.listen(8080, function () {
  
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});
