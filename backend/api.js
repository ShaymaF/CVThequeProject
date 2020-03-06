const jwt = require('jsonwebtoken');
const config = require('./config');
const superSecret = config.secret;
const passport = require('passport');
const LdapStrategy = require('passport-ldapauth');

passport.use('ldaps', new LdapStrategy(config.ldaps));
apiRouter.use(passport.initialize());

apiRouter.post('/login', authUser);

function authUser(req, res, next) {
    passport.authenticate('ldaps', {session: false}, function(err, user, info) {

        
        if (!user) {
            console.log(Object.prototype.toString.call(info) === '[object Array]'); // true
            //...
        }   
     })(req, res, next);
}

const generateToken = function () {
    const token = jwt.sign({
        name: user.name,
        username: user.mailNickname
    }, superSecret, {
        expiresInMinutes: 1440 // 24 hours
    });

    // return the information including a token as JSON
    return res.json({
        success: true,
        message: 'User ' + user.name + ' authenticated successfully!',
        token: token
    });
};