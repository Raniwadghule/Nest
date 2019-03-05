var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var emailExistence = require('emailExistence');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',express.static(__dirname + '/'));
app.set('view engine', 'html');

var connection = mysql.createConnection({
    host:"13.2.97.131",
    user:'admin',
    password:'admin',
    database:'employeedb',
});

connection.connect(function(err){
    console.log('hii');

});

//  emailExistence.check('email@domain.com', function(err,res){
//     console.log('res: '+res);
// });

function validateEmailAddress(email){

}


app.listen(8081,function(){
    console.log("connected to port 8081");
});