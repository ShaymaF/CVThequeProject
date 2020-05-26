var ldap = require("ldapjs");
//const express = require('express');

//var app = express();



 try{

        var client = ldap.createClient({
            url:'ldap://172.16.200.99:389',
            //LDAP_PROXYM_HOST=ldap://172.16.200.99:389
            reconnect: true,
            idleTimeout: 3000,




        });
        var opts = {
            filter: "(&(objectClass=inetOrgPerson))",
            scope: "sub",
            attributes: ["dn", "cn",]
        };
app.get('/login', function (req, res) {
            client.bind(`cn=${req.body.name}, CN=Users,DC=dcdev,DC=dev`, req.body.password, function (err) {
                if (err) {
                    console.log("err1" + err);
                    return res.status(404).send('User not found');
                } else {
                   
                       //générer token jwt
console.log('ok');
                        }
                    })
                });

               client.unbind()
            
        }catch (e) {
            console.log(e)
        }

    


