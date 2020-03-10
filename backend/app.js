const express = require('express');
var firebase=require('./Firebase/config').getConnection();

var experience=require('./routes/Experience');
var about=require('./routes/About');
var divers=require('./routes/Divers');
var contact=require('./routes/Contact');
var person=require('./routes/Person');


const cors = require('cors');
const bodyParser = require('body-parser');
var app = express();

app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(bodyParser.json());
app.use("/about", about);
app.use("/experience", experience);
app.use("/divers", divers );
app.use("/contact", contact );
app.use("/person", person );

app.get("/", function(req,res){
	res.send("home")
	
	})


var server = app.listen(8080, function () {
  
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});
