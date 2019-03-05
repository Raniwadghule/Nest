var mysql = require('mysql');
var fs = require("fs");
 
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'technicalkeeda',
    debug: false,
});
connection.connect();
 
var dog = {
    img: fs.readFileSync("C:\\dog.jpg"),
    file_name: 'Dog'
};
 
var cat = {
    img: fs.readFileSync("C:\\cat.jpg"),
    file_name: 'Cat'
};
 
var query = connection.query('INSERT INTO trn_image SET ?', dog, function(err,
    result) {
    console.log(result);
});
 
query = connection.query('INSERT INTO trn_image SET ?', cat, function(err,
    result) {
    console.log(result);
});
 
connection.end();