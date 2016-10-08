var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '103.237.147.54',
    user     : 'boxtown',
    password : 'boxtown2016',
    database : 'booxtown_uat',
    dateStrings: true
});
module.exports = connection;