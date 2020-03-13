var aboutModel=require('./aboutModel');
var certifModel=require('./certifModel');
var contactModel=require('./contactModel');
var compModel=require('./CompModel');
var diversModel=require('./diversModel');
var expModel=require('./ExpModel');
var formationModel=require('./formationModel');
var langueModel=require('./langueModel');
var loisirsModel=require('./loisirModel');
var personModel=require('./personModel');

module.export=versionModel({
 
    about:aboutModel,
    certif:certifModel,
    contact:contactModel,
    competence:compModel,
    divers:diversModel,
    experience:expModel,
    formation:formationModel,
    langue:langueModel,
    loisirs:loisirsModel,
    person:personModel

});
