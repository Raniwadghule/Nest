
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});
//const format = require("node.date-time");
//console.log(new Date().format("Y-M-d")); // 2016-5-18

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(__dirname + '/'));
app.set('view engine', 'html');

var connection = mysql.createConnection({
    host: "13.126.97.131", 
    database: "employeedb",
    user: "admin",
    password: "admin",
});
connection.connect();
app.get('/getEmployeeDetails', (req, res) => {
    //connection.query("SELECT EmpId, name, email,birthdate FROM employees", (err, result) => {

        var query="SELECT EmpId, name, email,birthdate,Image FROM employees";
        const queryParam = req.query;// query = {sex:"female"}
        console.log(queryParam.searchText);
        if(queryParam.searchText!=='')
        {
            query+=' where name like "%'+queryParam.searchText+'%" or email  like "%'+queryParam.searchText+'%"';
        }
        console.log(query);
        connection.query(query,(err, result) => {
            if(err) {
             
                res.json({"error":true});
            }
            else { 
               
             
         res.json(result); 
          
            }
        });
    });
    
    app.post('/InsertUpdateEmployee',upload.single('image'), function (req, res) {
        console.log(req.file);
        var EmpId = req.body.EmpId;
        var name = req.body.name;
        var email = req.body.email;
        var birthdate = req.body.birthdate;
        var Image = req.body.Image;
        var data = {

        };

        if (EmpId > 0) {
            connection.query("UPDATE employees SET name = ?, email = ?, birthdate  = ?, Image = ? WHERE EmpId = ?", [name, email, birthdate, Image, EmpId], function (err, result, fields) {
                if (err) throw err;
                return res.send('Updated Successfuly');
            });
        }
        else {
            var sql = "INSERT INTO employees(name,email,birthdate,Image) VALUES('" + req.body.name + "','" + req.body.email + "','" + req.body.birthdate + "','"+req.body.Image+"') ";
            connection.query(sql, function (err, result) {
                if (err) throw err;
                return res.send('Inserted Successfuly');
            });
        }


    });

    app.post('/DeleteEmployee', function(req,res){
        var EmpId = req.body.EmpId;
        connection.query("DELETE FROM employees WHERE EmpId= ?",[EmpId], (err,result,fields)=>{
            if(!err){
                res.send("Delete Successfuly");
            }
            else{
               console.log("Error");
            }
        })
    });

    

    // app.post('/upload', upload.single('photo'), (req, res) => {
    //     if(req.file) {
    //         res.json(req.file);
    //     }
    //     else throw 'error';
    // });
    


    //  var query="SELECT customerid, name, address FROM customers";
    // // const queryParam = req.query;// query = {sex:"female"}
    // // console.log(queryParam.searchText);
    // // if(queryParam.searchText!=='')
    // // {
    // //     query+=' where name like "%'+queryParam.searchText+'%" or address  like "%'+queryParam.searchText+'%"';
    // // }
    // console.log(query);
    // connection.query(query,(err, result) => {
    //     if(err) {

    //         res.json({"error":true});
    //     }
    //     else { 


    //  res.json(result); 

    //     }
    // });


app.listen(8081, function () {
    console.log('Connected to port 8081');
});