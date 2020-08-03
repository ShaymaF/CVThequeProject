
 var express = require('express')
 var ldap = require("ldapjs");

 var  passport= require('passport');
  var app = express.Router(),
    LdapStrategy = require('passport-ldapauth');
const jwt = require('jsonwebtoken');
var firebase=require('./Firebase/firebase-admin-config').getConnectionFirebase();
var admin=require('./Firebase/firebase-admin-config').getConnectionFirebaseAdmin();
firebase = require('firebase');

const { v4: uuidv4 } = require('uuid');


var ref = firebase.database().ref("person");


var job,roleUser,UserDep,departement;

var serviceAccount = require("./generate-token/serviceAccountKey.json");


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
    function roleAssign(role) {
      // We want this to show the "results" from the callback function.
      console.log('2',role);
      roleUser=role;
      console.log('3',roleUser);
      return roleUser;
    }
    function depAssign(departement) {
      // We want this to show the "results" from the callback function.
      console.log('2',departement);
      UserDep=departement;
      console.log('3',UserDep);

return UserDep;
    }
 
   var search=function (uid) {
      var ref = admin.database().ref("person");
      var query = ref.orderByChild('uid').equalTo(uid);
      query.once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
           job=childSnapshot.val().jobTitle;
           departement=childSnapshot.val().departement
           console.log('dep',departement);
          /// roleAssign(job);depAssign(departement);  
           //roleAssign(job);
            //depAssign(departement);
        });
       
    });
    }
app.post('/signin', function(req, res, next) {
  passport.authenticate('ldapauth', {session: false}, async  function(err, user, info) {
    console.log(req.body);
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

  
                /**********add additional Claims to the Custom TOKEN*********/
                var query = ref.orderByChild('uid').equalTo(user.uid);
                query.once('value').then(function(snapshot) {
                  snapshot.forEach(function(childSnapshot) {
                     job=childSnapshot.val().jobTitle;
                     departement=childSnapshot.val().departement
                     console.log('dep',departement);
                     console.log('ss',roleUser)  ;
                     let additionalClaims = {
                         departement:departement,
                         role: job,
                         password: user.userPassword
                       };
                                     /****************** create custom token***************/
                                     console.log('cl',additionalClaims);
                                     console.log('user',user);
                     
                     admin.auth().createCustomToken(user.uid,additionalClaims)
                           .then((customToken) => {
                     console.log(customToken);
                     
                               /***************Sign up user with the custom token created*************/
                     
                               firebase.auth().signInWithCustomToken(customToken).then(function(result) {
                       console.log('new user',result.additionalUserInfo.isNewUser);
                       //  new user signed in will be added  to the realtime database
                       console.log(result.user.getIdToken())
                       if(result.additionalUserInfo.isNewUser){
                         var referencePath = '/users';
                         var userReference = admin.database().ref(referencePath); 
                         var newPostRef = userReference.push();
                     
                         const newUser={
                         "uid":user.uid,
                         "email":user.mail,
                         "password":user.userPassword,
                         "role":roleUser
                         }
                         console.log('new userr',newUser);
                         newPostRef.set(newUser);
                       }
                      
                     }).catch(function(error) {
                       // Handle Errors here.
                       var errorCode = error.code;
                       var errorMessage = error.message;
                     
                       // ...
                     });
                     
                     return res.status(200).send({"token": customToken})
                           })
                           .catch((error)=> {
                             console.log('Error creating custom token:',error)
                           });
                  });
                 
              }).catch((error)=> {
                console.log('Error creating custom token:',error)
              });           
      
  })(req, res, next);
});

app.post('/updatePassword', function(req, res, next) {

  let username=req.body.userId;
  let oldPassword=req.body.passwordOld;
  let newPassword=req.body.passwordNew;
  
  var client = ldap.createClient({
    url: 'ldap://localhost:389'
});

  try {
      client.bind('uid='+username+','+'ou=USER,dc=proxym-it,dc=com', oldPassword, err => {
      if (err) {
        console.log(err);
      }
     var userDN='dc=proxym-it,dc=com';
     console.log('old',encodePassword(oldPassword));
      client.modify('uid='+username+','+'ou=USER,dc=proxym-it,dc=com', [
        new ldap.Change({
          operation: 'delete',
          modification: {
           // userPassword: encodePassword(oldPassword)
           userPassword: oldPassword
          }
        }),
        new ldap.Change({
          operation: 'add',
          modification: {
            //userPassword: encodePassword(newPassword)
            userPassword: newPassword
          }
        })
      ], (error) => {
        if (error) {
          return res.send({ success : false, message : 'password changing failed ' +error});
        } else {
  return res.send({ success : true, message : 'password changed successfully' });        
        }
      });
    })
  } catch (error) {
    console.error(error);
    //reject(error);

     }
  


});
function encodePassword(password) {
  return new Buffer('"' + password + '"', 'utf16le').toString();
}
module.exports = app

