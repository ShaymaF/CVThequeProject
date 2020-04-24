const express = require('express');
const app = express();
const {Storage} = require('@google-cloud/storage');
const Multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const {format} = require('util');
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
const storage = new Storage({
  projectId: "cvthequepfe",
  keyFilename: "AIzaSyBQZR7TM60pzo8WrEkQ8-29SQDdk-SQGsw"
});
/*const {Storage} = require('@google-cloud/storage');
 
// Creates a client
const storage = new Storage();
// Creates a client from a Google service account key.
// const storage = new Storage({keyFilename: "key.json"});
 

// const bucketName = 'bucket-name';
 
async function createBucket() {
  // Creates the new bucket
  await storage.createBucket(bucketName);
  console.log(`Bucket ${bucketName} created.`);
}
 
createBucket().catch(console.error);*/
const bucket = storage.bucket("cvthequepfe.appspot.com");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});


/**
 * Adding new file to the storage
 */
app.post('/api/upload', multer.any('image'), (req, res) => {
  console.log('Upload Image');
  //const file = req.body;
  //const base64data = file.content.replace(/^data:.*,/, '');
 let file = req.files;
 //let filename=req.params.filename;
 console.log('file',file);
 //console.log('filename',filename);

 //console.log('file',file.filename);
//	const db = firebase.database()
 //const storage = firebase.storage()
 //var gcloud = require('@google-cloud/storage');

//const bucket = storage.bucket('cvthequepfe.appspot.com')


   //var storage = firebase.storage();
   var storageRef = storage.ref('img/file.png');

 var task = storageRef.put(file);
 task.on('state_changed', function progress(snapshot) {
   var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
   uploader.value = percentage;

 }, function error(err) {


 },function complete() {

 });
});  

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
}
app.listen(8080, () => {
  console.log('App listening to port 8080');
});
