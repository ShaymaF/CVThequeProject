
 var express = require('express')

 var  passport     = require('passport');
  var app = express.Router(),
    LdapStrategy = require('passport-ldapauth');
const jwt = require('jsonwebtoken');
var firebase=require('./Firebase/config').getConnection();
const { v4: uuidv4 } = require('uuid');


var admin = require("firebase-admin");
var job,role;

var serviceAccount = require("./generate-token/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cvthequepfe.firebaseio.com"
});
// Credentials from the free LDAP test server by forumsys
// More info at: http://www.forumsys.com/tutorials/integration-how-to/ldap/online-ldap-test-server/
var OPTS = {
  server: {
    url: 'ldap://localhost:389',
    bindDn: 'cn=admin,dc=proxym-it,dc=com',
    bindCredentials: 'admin',
    searchBase: 'dc=proxym-it,dc=com',
    searchFilter: '(uid={{username}})'
  }
};
 

passport.use(new LdapStrategy(OPTS));
 
app.use(passport.initialize());

    //var uid = uuidv4();
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
app.post('/', function(req, res, next) {
  passport.authenticate('ldapauth', {session: false}, function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      console.log('failed');

      return res.send({ success : false, message : 'authentication failed' });
    }
                           /********** get user Role  ***********/
                           console.log('ok 200');
    var ref = admin.database().ref("person");
    var query = ref.orderByChild('uid').equalTo(user.uid);
    query.once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
         job=childSnapshot.val().jobTitle;
      });
      if(job=="RH"){
        role="RH";

       }
       console.log(role);

  });
                /**********add additional Claims to the Custom TOKEN*********/
  let additionalClaims = {
    role: role,
    password: user.userPassword
  };
                /****************** create custom token***************/
                console.log(additionalClaims);

admin.auth().createCustomToken(user.uid,additionalClaims)
      .then((customToken) => {
console.log(customToken);

          /***************Sign up user with the custom token created*************/

firebase.auth().signInWithCustomToken(customToken).then(function(result) {
  console.log('new user',result.additionalUserInfo.isNewUser);
  //  new user signed in will be added  to the realtime database
	if(result.additionalUserInfo.isNewUser){
    var referencePath = '/users';
    var userReference = admin.database().ref(referencePath); 
    var newPostRef = userReference.push();

    const newUser={
    "uid":user.uid,
    "email":user.mail,
    "password":user.userPassword,
    "role":role
    }
    console.log('new user',newUser);
    newPostRef.set(newUser);
  }
  // This gives you a Google Access Token. You can use it to access the Google API.
 // var token = result.credential.accessToken;
  //console.log('token',token);
  // The signed-in user info.
  //var user = result.user;
  //return firebaseToken.user.getIdToken();
 



}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  // ...
});
   /* const JWTToken = jwt.sign({
Nom: req.username
//id: user_found.id,
//role: user_found.role.role
}, "Pr0xym-1T", {
expiresIn: '5d'
});*/

return res.status(200).send({"token": customToken})
      })
      .catch((error)=> {
        console.log('Error creating custom token:',error)
      });
      
  })(req, res, next);
});
module.exports = app

