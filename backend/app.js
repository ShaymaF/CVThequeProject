
const express = require('express');
//var firebase=require('./Firebase/config').getConnection();

var experience=require('./routes/Experience');
var traduction=require('./routes/traduction');

var about=require('./routes/About');
var divers=require('./routes/Divers');
var contact=require('./routes/Contact');
var person=require('./routes/Person');
var image=require('./routes/Image');
var loisirs=require('./routes/Loisir');
var langues=require('./routes/Langues');
var formation=require('./routes/Formation');
var certificat=require('./routes/Certificat');
var competences=require('./routes/Competences');
var projet=require('./routes/projet');
var login=require('./express');

var version=require('./routes/version');
var temp=require('./routes/Temp');

const cors = require('cors');
const bodyParser = require('body-parser');
var app = express();

//CORS Middleware
app.use(function (req, res, next) {
   //Enabling CORS
   res.header("Access-Control-Allow-Origin", "http://localhost:4200");
   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
   next();
   });

app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(bodyParser.json({limit: '10000mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10000mb', extended: true}));
//const idToken = header('x-access-token')

app.use("/about", about);
app.use("/experience", experience);
app.use("/traduction", traduction);
app.use("/divers", divers);
app.use("/contact", contact);
app.use("/person", person);
app.use("/loisirs", loisirs);
app.use("/langues", langues);
app.use("/formation", formation);
app.use("/certificat", certificat);
app.use("/competences", competences);
app.use("/temp", temp);
app.use("/version", version);
app.use("/projet", projet);
app.use("/ldap", login);

app.use("/api", image);
app.get("/", function(req,res){
	res.send("home")
	
	})

 


var server = app.listen(8080, function () {
  
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});

