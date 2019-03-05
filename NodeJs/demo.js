var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/',express.static(__dirname +'/'));
app.set('view engine','html');

var connection = mysql.createConnection({
    host:"13.126.97.131",
    user:"admin",
    password: "admin",
    database:"employeedb",
});
connection.connect();
app.get('/Getemployeedetails', (req,res) =>{
    connection.query("select EmpId, name, email,birthdate,Image from employees", function(err,result,fields){
                if(err) throw err;
                console.log(result);
                res.json(result);
    });
});

app.post('/InsertUpdateEmployee', function(req,res) {
    var EmpId = req.body.EmpId;
    var name = req.body.name;
    var email = req.body.email;
    var birthdate = req.body.borthdate;
    var Image = req.body.Image;

    var data = {

    };
    if(EmpId>0){
    connection.query("update employee set name = ?, email = ?, birthdate = ?, Image = ? where EmpId= ?",[name,email,birthdate,Image, EmpId], function(err,result){
        if(err) throw err;
        res.json(result);
    });
    }
    else {
    var sql = "insert into employees (name,email,birthdate,Image) values ('"+req.body.name+"','"+req.body.email+"','"+req.body.birthdate+"','"+req.body.Image+"');"
    connection.query(sql, function(err,result){
        if(err) throw err;
        res.json(result);
    });
    }
    
});
app.post('/Deleteemployeedetails', (req,res) =>{
    var EmpId = req.body.EmpId;
    connection.query("Delete from employees where EmpId = ?",[EmpId], function(err,result){
                if(!err) {
                    res.send('Delete Successfully')
                }
                else{
                    console.log('error');
                }
               
          });
});


// connection.connect( function(err){
//     if(err) throw err; 
//     connection.query("select * from employees", function(err,result,fields){
//         if(err) throw err;
//         console.log(result);
//     });
// });

app.listen(8081 , function(){
    console.log('conect to localhost 8081');
});