var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '42.115.234.71',
    user     : 'root',
    password : '123456aa@',
    database : 'booxtown',
    port:3306
});
module.exports = connection;