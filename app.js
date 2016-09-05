var userController = require('./ServerController/UserController');
var bookController = require('./ServerController/BookController');
var emailController = require('./ServerController/EmailController');
var express = require('express');
var app = express();
var server = require("http").createServer(app);
server.listen(process.env.PORT || 3000);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log("Server is running on port 3000");
var fs = require('fs');
var mkdirp = require('mkdirp');
var multer = require('multer');


//User Service
app.get('/GetUsers/',function (req,res) {
    userController.getAllUser(res);
});

app.get('/checkUserExits/:username',function (req,res) {
    userController.checkUserExits(req.params.username,res);
});

app.post('/booxtown/rest/user/signup',function (req,res) {
    userController.signup(req.body,res);
});

app.post('/booxtown/rest/user/login',function (req,res) {
    userController.login(req.query,res);
});

app.post('/booxtown/rest/user/getprofile',function (req,res) {
    userController.getUserInforById(req.query.session_id,res);
});

app.post('/booxtown/rest/user/updateprofile',function (req,res) {
    userController.updateUserInforById(req.query.session_id,req.body,res);
});

app.post('/booxtown/rest/user/changepassword',function (req,res) {
    userController.changePassword(req.query,res);
});

app.post('/booxtown/rest/user/logout',function (req,res) {
    userController.userLogout(req.query,res);
});

app.post('/booxtown/rest/user/forgotpassword',function (req,res) {
    emailController.sendEmailToRestorePassword(req.query.email,res);
});

//Book Service

app.post('/booxtown/rest/book/addbook',function (req,res) {
    bookController.addBook(req.query.session_id,req.body,res);
});

app.post('/booxtown/rest/book/getinfo',function (req,res) {
    bookController.getBookInfoById(req.query,res);
});

app.post('/booxtown/rest/book/getallbook',function (req,res) {
    bookController.getAllBookByUserId(req.query.session_id,res);
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
        console.log(file.originalname.split("::")[1]);
        return cb(null, file.originalname.split("::")[1]);

    }
});

app.post('/', multer({
    storage: storage
}).single('upload'), function(req, res) {
    //console.log(req.body.name);
    return res.status(204).end();
});

app.get('/uploads/:file1/:file2', function (req, res){
    try {
        file = req.params.file1;
        file2 = req.params.file2;
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


process.on('uncaughtException', function(err)  {
    console.log(err);
});

