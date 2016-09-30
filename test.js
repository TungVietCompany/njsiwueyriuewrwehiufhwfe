var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();

var pool      =    mysql.createPool({
    host     : '103.237.147.54',
    user     : 'boxtown',
    password : 'boxtown2016',
    database : 'booxtown_sql',
    dateStrings: true
});

function handle_database(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from user",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

function test(connection) {
    connection.query("select * from user",function(err,rows){
        connection.release();
        if(!err) {
            res.json(rows);
        }
    });
}

var getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(connection);
    });
};

app.get("/",function(req,res){
    test(getConnection());
});

app.listen(3000);