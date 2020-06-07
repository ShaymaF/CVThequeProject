
var express = require('express');
var firebase = require('firebase');

//var firebase=require('../Firebase/config').getConnection();
var router = express();

var translate = require('translation-google');


router.post('/en', function (req, res) {
    console.log('req.body.text',req.body.text);
    console.log('req.body',req.body);
    translate(req.body.text, {to: 'en'}).then(res2 => {
        res.send(res2.text);

        	}).catch(err => {
		console.error(err);
    }); 
      // console.log('text translated fo fr',result)

});

router.post('/fr', function (req, res) {
    console.log('req.body.text',req.body.text);
    console.log('req.body',req.body);

 translate(req.body.text, {to: 'fr'}).then(res2 => {
    console.log(res2);
        res.send(res2.text);

        	}).catch(err => {
		console.error(err);
    }); 
      // console.log('text translated fo fr',result)

});

module.exports = router
