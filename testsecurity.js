var express     = require('express');
var app         = express();
var jwt    = require('jsonwebtoken');
var port = process.env.PORT || 8080;
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/test', function(req, res) {

    var token = jwt.sign("123", "1123", {

    });
    res.json(token);
});

app.post('/test1', function(req, res) {
    jwt.verify('eyJhbGciOiJIUzI1NiJ9.MTIz.1QUZ6zV4H1pQT50bSNoYvnnokHnD0hs8Q7KKBGqzA6E', '1123', function(err, decoded) {
        if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
            return res.json("sdadsaasdas");
        }
    });
});



app.listen(port);
console.log('Magic happens at http://localhost:' + port);
