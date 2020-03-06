/*const fs = require('fs');

module.exports = {
    'port': process.env.PORT || 8080,
    'env': process.env.ENV || 'develpment',
    'secret': 'mysupersecret',
'ldaps': {
    server: {
        url: 'ldaps://servername.company.com',
        bindDn: 'cn=service.account,ou=System Accounts,dc=company,dc=com',
        bindCredentials: 'password',
        searchBase: 'dc=company,dc=com',
        searchFilter: '(sAMAccountName={{username}})',
        tlsOptions: {
            ca: [
                fs.readFileSync(__dirname + '/app/certs/certificateName.pem')
            ]
        }
    }
},
ldapgroup: 'CN=Group_Name,OU=Company Groups,DC=company,DC=com' // optional, need it if user group membership is required to access the application
};
*/
const config = {secret : "YUYFDISYFSIERTEWRTEWTWETRNNNMNJHKHFASDdyfiudayDAYIUSDFYASIOFOOASIUDFYEREAHLSKJFE57894502354354HJKAFDDFS"}
module.exports = config;