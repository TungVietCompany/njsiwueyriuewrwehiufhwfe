var userController = require('./ServerController/UserController');
var bookController = require('./ServerController/BookController');
var emailController = require('./ServerController/EmailController');
var MD5 = require('./Library/MD5');
var express = require('express');
var app = express();
var server = require("http").createServer(app);
server.listen(process.env.PORT || 3000);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var bpurle = bodyParser.urlencoded({extended: false})
console.log("Server is running on port 3000");
var fs = require('fs');
var mkdirp = require('mkdirp');
var multer = require('multer');


//User Service
app.post('/booxtown/rest/user/signup_ios', function (req, res) {
    userController.signup(req.query, res);
});

app.post('/booxtown/rest/user/signup', function (req, res) {
    userController.signup(req.body, res);
});

app.post('/booxtown/rest/user/login', function (req, res) {
    userController.login(req.body, res);
});

app.get('/booxtown/rest/user/getprofile', function (req, res) {
    userController.getUserInforById(req.query.session_id, res);
});

app.post('/booxtown/rest/user/updateprofile_ios', function (req, res) {
    userController.updateUserInforById_ios(req.query, res);
});


app.post('/booxtown/rest/user/updateprofile', function (req, res) {
    userController.updateUserInforById(req.body, res);
});

app.post('/booxtown/rest/user/changepassword', function (req, res) {
    userController.changePassword(req.body, res);
});

app.post('/booxtown/rest/user/logout', function (req, res) {
    userController.userLogout(req.body, res);
});

app.post('/booxtown/rest/user/forgotpassword', function (req, res) {
    emailController.sendEmailToRestorePassword(req.body.email, res);
});

//Book Service

app.post('/booxtown/rest/book/addbook', function (req, res) {
    bookController.addBook(req.body, res);
});

app.post('/booxtown/rest/book/addbook_ios', function (req, res) {
    bookController.addBook_ios(req.query, res);
});

app.post('/booxtown/rest/book/update', function (req, res) {
    bookController.updateBook(req.body, res);
});

app.get('/booxtown/rest/book/getinfo', function (req, res) {
    bookController.getBookInfoById(req.query, res);
});

app.get('/booxtown/rest/book/getallbookbyuser', function (req, res) {
    bookController.getAllBookByUserId(req.query.session_id, res);
});

app.get('/booxtown/rest/book/getallbook', function (req, res) {
    bookController.getAllBook(res);
});

//Upload Image
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var forderName = file.originalname.split("::");
        var link = './Images/'+forderName[0];
        try {
            var stats = fs.lstatSync(link);
        }
        catch (err)
        {
            mkdirp(link);
        }
        callback(null, link);
    },
    filename: function(req, file, cb ) {
        return cb(null, file.originalname.split("::")[1]);

    }
});


app.post('/booxtown/rest/uploadimage', multer({
    storage: storage
}).single(''), function (req, res) {
    //cons;ole.log(req.body.name);
    res.json({code: 200});
});

app.get('/booxtown/rest/getImage', function (req, res) {
    try {
        file = req.query.username;
        file2 = req.query.image;
        var dirname = "./Images/";
        var img = fs.readFileSync(dirname + file +'/'+ file2 );
        res.writeHead(200, {'Content-Type': 'image/png' });
        res.end(img, 'binary');
    }
    catch (err)
    {
        res.end(null, 'binary');
    }
});


process.on('uncaughtException', function (err) {
    console.log(err);
});

