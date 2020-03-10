
var firebase = require('firebase');
//var firebase = require("nativescript-plugin-firebase");

var firebaseConfig = {
    apiKey: "AIzaSyBQZR7TM60pzo8WrEkQ8-29SQDdk-SQGsw",
    authDomain: "cvthequepfe.firebaseapp.com",
    databaseURL: "https://cvthequepfe.firebaseio.com",
    projectId: "cvthequepfe",
    storageBucket: "cvthequepfe.appspot.com",
    messagingSenderId: "136162495564",
    appId: "1:136162495564:web:56c860d772c255677c78e9",
    measurementId: "G-2970RFMW04"
  };
  
  
  module.exports.getConnection = function(){
// Initialize Firebase
    if (!firebase.apps.length) {
      return firebase.initializeApp(firebaseConfig);}
      else        
       console.log('firebase already init');
    }


