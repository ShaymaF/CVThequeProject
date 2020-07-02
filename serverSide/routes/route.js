
  var hasAdminRole=require('../controllers/middleware/auth.middleware');
  var decodeFirebaseIdToken=require('../controllers/middleware/auth.middleware');
  var isAuthorized=require('../controllers/middleware/auth.middleware');

  var express = require('express')
  , router = express.Router()
    // Get all users
    router.get('/users',
        decodeFirebaseIdToken,
        isAuthorized,
        hasAdminRole
      //  UserController.getAllUsers
      );
  
  
  module.export = router;