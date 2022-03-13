const mysql = require('mysql')
const bodyParser = require("body-parser");
const express = require('express');


const app = express();
const endpoint = '/';
const port = 30005;
const connection = mysql.createConnection({
  host: "67.205.142.54",
  user: "baumanntennisapi",
  password: "hwdKD8CAh8KCteKb",
  database: "baumanntennisapi"
});
connection.connect();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(endpoint + "admin", (req, res) => {
  connection.query(`UPDATE 'Endpoints' SET 'Hits' = 'Hits' + 1 WHERE Endpoint = 'Admin'`, (err, result) => {
    if (err) throw err;
  });
  connection.query(`SELECT * FROM Endpoints`, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

app.post(endpoint + "adminlogin", (req, res) => {
  connection.query(`UPDATE 'Endpoints' SET 'Hits' = 'Hits' + 1 WHERE Endpoint = 'Admin Login'`, (err, result) => {
    if (err) throw err;
  });
  connection.query(`SELECT * FROM 'AdminAccount' WHERE 'username' LIKE '${req.body.username}' AND 'password' LIKE '${req.body.password}'`, (err, result) => {
    if (err) throw err;
    if (result == null) {
      res.send(JSON.stringify(false));
    } else {
      res.send(JSON.stringify(true));
    }
  });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log("Listening to port ", port);
})

console.log('Server is running and listening on port ',port);
