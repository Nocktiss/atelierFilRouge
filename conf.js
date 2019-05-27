const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost',
user :  'root',
password :  'FantasySarah147',
database :  'Wilders',
});
module.exports = connection;