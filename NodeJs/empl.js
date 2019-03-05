//Employee Display on Table

$.get("/getEmployeeDetails", function (data) {
  console.log(data);
  var tablehtml = '<table class="table table-striped">';
  tablehtml += '<tr>';
  tablehtml += '<th>Customer No</th>';
  tablehtml += '<th>Name</th>';
  tablehtml += '<th>email</th>';
  tablehtml += '<th>birthdate</th>';
  tablehtml += '</tr>';

  $.each(data, function (key, value) {

    tablehtml += ' <tr><td>' + value.EmpId + '</td><td>' + value.name + '</td><td>' + value.email + '</td><td>' + value.birthdate + '</td></tr>'
  });

  tablehtml += '</table>';
  //  alert(tablehtml);
  $('#output_message').html(tablehtml);

});



app.get('/getEmployeeDetails',(req, res) => {
  connection.query("SELECT EmpId, name, email,birthdate FROM employees",(err, result) => {
      if(err) {
          console.log(err); 
          res.json({"error":true});
      }
      else { 
          console.log(result); 
          res.json(result); 
      }
  });
});



//InsertEmployee
getEmployee();
function fnSuccess(result){
  alert('result');
  getEmployee();
  $('#myModal .close').click(); 
$("#myModal").modal('hide');
}

function SaveUpdateCustomer(){
  var name = document.getElementById('nameId').value;
  var email = document.getElementById('emailId').value;
var birthdate = document.getElementById('birthdateId').value;
var postObj = {};
postObj.name = name;
postObj.email = email;
postObj.birthdate = birthdate;
postAjax('http://localhost:8081/InsertEmployee', postObj,fnSuccess);
}

app.post('/InsertEmployee', function(req,res){
  var EmpId = req.body.EmpId;
  var name = req.body.name;
  var email = req.body.email;
  var birthdate = req.body.birthdate;
var data = {

};
var sql = "INSERT INTO employees(name,email,birthdate) VALUES('"+req.body.name+"','"+req.body.email+"','"+req.body.birthdate+"') ";
connection.query(sql, function(err, result){
if(err) throw err;
return res.send('Inserted Successfuly');
})
})


