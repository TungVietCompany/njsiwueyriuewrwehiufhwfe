var userController = require('./ServerController/UserController');
var bookController = require('./ServerController/BookController');
var emailController = require('./ServerController/EmailController');
var commentController = require('./ServerController/CommentController');
var postController = require('./ServerController/PostController');
var threadController = require('./ServerController/ThreadController');
var firebaseController = require('./ServerController/FirebaseController');
var topicController = require('./ServerController/TopicController');
var transHisController = require('./ServerController/TransacHistoryController');
var settingController = require('./ServerController/SettingController');
var notifiController = require('./ServerController/NotificationController');
var connection = require('./DatabaseConnection/MysqlConnection');

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

// Notification
app.post('/booxtown/rest/user/send_notification', function (req, res) {
    //firebaseController.sendMultiUser(req.body,res);
    firebaseController.sendMultiUserKey(req.body,res);
});
app.post('/booxtown/rest/user/send_notification_ios', function (req, res) {
    //firebaseController.sendMultiUser(req.body,res);
    firebaseController.sendMultiUserKeyIOS(req.body,res);
});
app.post('/booxtown/rest/notification/notification_addstatus', function(req, res){
    notifiController.Notification_AddStatus(req.body, res);
});

app.post('/booxtown/rest/notification/notification_removestatus', function(req, res){
    notifiController.Notification_RemoveStatus(req.body, res);
});
app.get('/booxtown/rest/notification/notification_gettop', function(req, res){
    notifiController.Notification_GetTop(req.query, res);
});//User Service

app.post('/booxtown/rest/user/checkExpire', function (req, res) {
    userController.User_CheckUserExpire(req.body.session_id, res);
});

app.get('/booxtown/rest/user/user_getRating', function (req, res) {
    userController.user_getRating(req.query.user_id, res);
});

app.post('/booxtown/rest/user/signup_ios', function (req, res) {
    userController.signup(req.query, res);
});

app.post('/booxtown/rest/user/signup', function (req, res) {
    userController.signup(req.body, res);
});

app.post('/booxtown/rest/user/login', function (req, res) {
    userController.login(req.body, res);
});

app.post('/booxtown/rest/user/login_firebase', function (req, res) {
    userController.login_firebase(req.body, res);
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

app.get('/booxtown/rest/book/getAllGenre', function (req, res) {
    bookController.Book_GetAllGenre(res);
});

app.post('/booxtown/rest/book/addbook', function (req, res) {
    bookController.addBook(req.body, res);
});

app.post('/booxtown/rest/book/addbook_ios', function (req, res) {
    bookController.addBook_ios(req.query, res);
});

app.post('/booxtown/rest/book/bookTransfer', function (req, res) {
    bookController.bookTransfer(req.body, res);
});

app.post('/booxtown/rest/book/update', function (req, res) {
    bookController.updateBook(req.body, res);
});

app.get('/booxtown/rest/book/getinfo', function (req, res) {
    bookController.getBookInfoById(req.query, res);
});
//DungNS 11-9-2016 -------------------


app.get('/booxtown/book/book_getall', function(req, res){
    bookController.Book_GetAll(res);
});

app.post('/booxtown/rest/book/book_delete', function(req, res){
    bookController.Book_Delete(req.body.book_id, res);
});

app.get('/booxtown/book/book_filter', function(req, res){
    bookController.Book_Filter(req.query, res);
});

app.get('/booxtown/book/book_getbyauthor', function(req, res){
    bookController.Book_GetByAuthor(req.query.author, res);
});

app.get('/booxtown/book/book_getbydate', function(req, res){
    bookController.Book_GetByDate(req.query.fromdate, req.query.todate, res);
});

/*app.post('/test', function(req, res){
 //res.send(req.query.fromdate + req.query.todate);
 var query = "call Topic_Insert('" + req.body.topicid + "', '" + req.body.title + "', '" + req.body.description + "', '" + req.body.createDate
 + "', '" + req.body.userid + "')";
 res.send(query);
 });*/

app.get('/booxtown/book/book_getbydeleted', function(req, res){
    bookController.Book_GetByDeleted(req.query.isdeleted, res);
});

app.get('/booxtown/book/book_getbyid', function(req, res){
    bookController.Book_GetByID(req.query.bookid, res);
});

app.get('/booxtown/book/book_getbyprice', function(req, res){
    bookController.Book_GetByPrice(req.query.minprice, req.query.maxprice, res);
});

app.get('/booxtown/book/book_getbytitle', function(req, res){
    bookController.Book_GetByTitle(req.query.title, res);
});

app.get('/booxtown/book/book_getbyuserid', function(req, res){
    bookController.Book_GetByUserID(req.query.userid, res);
});

app.get('/booxtown/book/book_getbyusersession', function(req, res){
    bookController.Book_GetByUserSession(req.query.session_id, res);
});

app.post('/booxtown/book/book_insert', function(req, res){
    bookController.Book_Insert(req.body, res);
});

app.get('/booxtown/book/book_search', function(req, res){
    bookController.Book_Search(req.query, res);
});

app.post('/booxtown/book/book_update', function(req, res){
    bookController.Book_Update(req.query, res);
});

app.delete('/booxtown/comment/comment_delete', function(req, res){
    commentController.Comment_Delete(req.query.commentid, res);
});

app.get('/booxtown/comment/comment_filter', function(req, res){
    commentController.Comment_Filter(req.query, res);
});

app.get('/booxtown/comment/comment_getall', function(req, res){
    commentController.Comment_GetAll(res);
});

app.get('/booxtown/comment/comment_getbydate', function(req, res){
    commentController.Comment_GetByDate(req.query.fromdate, req.query.todate, res);
});

app.get('/booxtown/comment/comment_getbyid', function(req, res){
    commentController.Comment_GetByID(req.query.commentid, res);
});

app.get('/booxtown/rest/comment/comment_getbythread', function(req, res){
    commentController.Comment_GetByThread(req.query.thread_id, res);
});

app.get('/booxtown/comment/comment_getbyuser', function(req, res){
    commentController.Comment_GetByUser(req.query.userid, res);
});

app.post('/booxtown/rest/comment/comment_insert', function(req, res){
    commentController.Comment_Insert(req.body, res);
});

app.post('/booxtown/comment/comment_update', function(req, res){
    commentController.Comment_Update(req.body, res);
});

app.delete('/booxtown/post/post_delete', function(req, res){
    postController.Post_Delete(req.query.postid, res);
});

app.get('/booxtown/post/post_filter', function(req, res){
    postController.Post_Filter(req.query.postid, req.query.createDate, req.query.userid, res);
});

app.get('/booxtown/post/post_getall', function(req, res){
    postController.Post_GetAll(res);
});

app.get('/booxtown/post/post_getbyauthor', function(req, res){
    postController.Post_GetByAuthor(req.query.author, res);
});

app.get('/booxtown/post/post_getbydate', function(req, res){
    postController.Post_GetByDate(req.query.fromdate, req.query.todate, res);
});

app.get('/booxtown/post/post_getbyid', function(req, res){
    postController.Post_GetByID(req.query.postid, res);
});

app.get('/booxtown/post/post_getbytitle', function(req, res){
    postController.Post_GetByTitle(req.query.title, res);
});

app.get('/booxtown/post/post_getbyuserid', function(req, res){
    postController.Post_GetByUserID(req.query.userid, res);
});

app.get('/booxtown/post/post_getbyusersession', function(req, res){
    postController.Post_GetByUserSession(req.query.session_id, res);
});

app.get('/booxtown/rest/post/post_gettop', function(req, res){
    postController.Post_GetTop(req.query, res);
});

app.post('/booxtown/rest/post/post_insert', function(req, res){
    postController.Post_Insert(req.body, res);
});

app.get('/booxtown/post/post_search', function(req, res){
    postController.Post_Search(req.query.authorkeyword, req.query.commentkeyword, res);
});

app.post('/booxtown/post/post_update', function(req, res){
    postController.Post_Update(req.body, res);
});

app.delete('/booxtown/thread/thread_delete', function(req, res){
    threadController.Thread_Delete(req.query.threadid, res);
});

app.get('/booxtown/thread/thread_filter', function(req, res){
    threadController.Thread_Filter(req.query, res);
});

app.get('/booxtown/rest/thread/thread_gettop', function(req, res){
    threadController.Thread_GetTop(req.query, res);
});


app.get('/booxtown/rest/thread/get_threadbyid', function(req, res){
    threadController.GetThreadByID(req.query, res);
});

app.get('/booxtown/thread/thread_getall', function(req, res){
    threadController.Thread_GetAll(res);
});

app.get('/booxtown/thread/thread_getbydate', function(req, res){
    threadController.Thread_GetByDate(req.query.fromdate, req.query.todate, res);
});

app.get('/booxtown/thread/thread_getbyid', function(req, res){
    threadController.Thread_GetByID(req.query.threadid, res);
});

app.get('/booxtown/rest/thread/thread_getbytopic', function(req, res){
    threadController.Thread_GetByTopic(req.query.topic_id, res);
});

app.post('/booxtown/rest/thread/thread_addstatus', function(req, res){
    threadController.Thread_AddStatus(req.body, res);
});

app.post('/booxtown/rest/thread/thread_removestatus', function(req, res){
    threadController.Thread_RemoveStatus(req.body, res);
});

app.post('/booxtown/rest/thread/thread_insert', function(req, res){
    threadController.Thread_Insert(req.body, res);
});

app.get('/booxtown/thread/thread_search', function(req, res){
    threadController.Thread_Search(req.query.titleKeyword, req.query.descrKeyword, res);
});

app.post('/booxtown/thread/thread_update', function(req, res){
    threadController.Thread_Update(req.body, res);
});

app.delete('/booxtown/rest/topic/topic_delete', function(req, res){
    topicController.Topic_Delete(req.query.topicid, res);
});

app.get('/booxtown/rest/topic/topic_filter', function(req, res){
    topicController.Topic_Filter(req.query, res);
});

app.get('/booxtown/rest/topic/topic_getall', function(req, res){
    topicController.Topic_GetAll(res);
});
app.get('/booxtown/rest/topic/get_topicbyid', function(req, res){
    topicController.GetTopicByID(req.query, res);
});

app.get('/booxtown/rest/topic/topic_gettop', function(req, res){
    topicController.Topic_GetTop(req.query,res);
});

app.get('/booxtown/topic/topic_getbydate', function(req, res){
    topicController.Topic_GetByDate(req.query.fromdate, req.query.todate, res);
});

app.get('/booxtown/topic/topic_getbyid', function(req, res){
    topicController.Topic_GetByID(req.query.topicid, res);
});

app.get('/booxtown/topic/topic_getbyuserid', function(req, res){
    topicController.Topic_GetByUserID(req.query.userid, res);
});

app.get('/booxtown/topic/topic_getbyusersession', function(req, res){
    topicController.Topic_GetByUserSession(req.query.session_id, res);
});

app.post('/booxtown/rest/topic/topic_addstatus', function(req, res){
    topicController.Topic_AddStatus(req.body, res);
});

app.post('/booxtown/rest/topic/topic_removestatus', function(req, res){
    topicController.Topic_RemoveStatus(req.body, res);
});

app.post('/booxtown/topic/topic_insert', function(req, res){
    topicController.Topic_Insert(req.body, res);
});

app.get('/booxtown/topic/topic_search', function(req, res){
    topicController.Topic_Search(req.query.titlekeyword, req.query.descrkeyword, res);
});

app.post('/booxtown/topic/topic_update', function(req, res){
    topicController.Topic_Update(req.body, res);
});

app.delete('/booxtown/transactionhistory/tranhis_delete', function(req, res){
    transHisController.TransacHistory_Delete(req.query.tranhisid, res);
});

app.get('/booxtown/transactionhistory/tranhis_filter', function(req, res){
    transHisController.TransacHistory_Filter(req.query, res);
});

app.get('/booxtown/transactionhistory/tranhis_getall', function(req, res){
    transHisController.TransacHistory_GetAll(res);
});

app.get('/booxtown/transactionhistory/tranhis_getbyid', function(req, res){
    transHisController.TransacHistory_GetById(req.query.tranhisid, res);
});

app.get('/booxtown/transactionhistory/tranhis_getbook_byidtrans', function(req, res){
    transHisController.TransacHistory_GetBookByIdTransaction(req.query.tranhisid, res);
});

app.get('/booxtown/transactionhistory/tranhis_getbydate', function(req, res){
    transHisController.TransacHistory_GetByDate(req.query.fromdate, req.query.todate, res);
});

app.get('/booxtown/transactionhistory/tranhis_getbyuser', function(req, res){
    transHisController.TransacHistory_GetByUser(req.query.buyuserid, req.query.selluserid, res);
});



app.get('/booxtown/transactionhistory/tranhis_getbybook', function(req, res){
    transHisController.TransacHistory_GetByBook(req.query.buybookid, req.query.sellbookid, res);
});

app.get('/booxtown/rest/transactionhistory/tranhis_getTopTransaction', function(req, res){
    transHisController.Transaction_getTopTransaction(req.query, res);
});

app.get('/booxtown/rest/transactionhistory/tranhis_getTransactionById', function(req, res){
    transHisController.Transaction_getTransactionInfoById(req.query.transaction_id, res);
});

app.post('/booxtown/rest/transactionhistory/tranhis_updateRating', function(req, res){
    transHisController.TransacHistory_UpdateRating(req.body, res);
});

app.get('/booxtown/transactionhistory/tranhis_getbyaccepted', function(req, res){
    transHisController.TransacHistory_GetByAccepted(req.query.isaccepted, res);
});

app.post('/booxtown/rest/transaction/transaction_insert', function(req, res){
    transHisController.TransacHistory_Insert(req.body, res);
});

app.post('/booxtown/rest/transaction/transaction_updateStatus', function(req, res){
    transHisController.TransacHistory_UpdateStatus(req.body, res);
});

app.post('/booxtown/transactionhistory/tranhis_update', function(req, res){
    transHisController.TransacHistory_Update(req.body, res);
});

app.delete('/booxtown/user/user_delete', function(req, res){
    userController.User_Delete(req.query.userid, res);
});

app.get('/booxtown/user/user_filter', function(req, res){
    userController.User_Filter(req.query, res);
});
app.get('/booxtown/user/get_userID', function(req, res){
    userController.getUserID(req.query, res);
});

app.get('/booxtown/user/user_getall', function(req, res){
    userController.User_GetAll(res);
});

app.get('/booxtown/user/user_getbydeleted', function(req, res){
    userController.User_GetByDeleted(req.query.isdeleted, res);
});

app.get('/booxtown/user/user_getbyactive', function(req, res){
    userController.User_GetByActive(req.query.isactive, res);
});

app.get('/booxtown/user/user_getbyid', function(req, res){
    userController.User_GetByID(req.query.userid, res);
});

app.get('/booxtown/user/user_getbyusername', function(req, res){
    userController.User_GetByUserName(req.query.username, res);
});

app.get('/booxtown/user/user_getbyusersession', function(req, res){
    userController.User_GetByUserSession(req.query.session_id, res);
});

app.post('/booxtown/user/user_insert', function(req, res){
    userController.User_Insert(req.body, res);
});

app.post('/booxtown/user/user_update', function(req, res){
    userController.User_Update(req.body, res);
});

app.post('/booxtown/user/user_updatebyusersession', function(req, res){
    userController.User_UpdateByUserSession(req.body, res);
});

//---------------------
app.get('/booxtown/rest/book/getallbookbyuser', function (req, res) {
    bookController.getAllBookByUserId(req.query.session_id, res);
});

app.get('/booxtown/rest/book/getallbook', function (req, res) {
    bookController.getAllBook(res);
});

app.get('/booxtown/rest/book/book_gettop', function (req, res) {
    bookController.getTopBook(req.query,res);
});

app.get('/booxtown/rest/book/book_gettopbyuser', function (req, res) {
    bookController.getTopBookByUser(req.query,res);
});

//setting

app.get('/booxtown/rest/setting/getSettingByUserId', function (req, res) {
    settingController.getSettingByUserId(req.query.session_id,res);
});

app.post('/booxtown/rest/setting/setting_insert', function (req, res) {
    settingController.getTopBookByUser(req.body,res);
});

app.post('/booxtown/rest/setting/setting_update', function (req, res) {
    settingController.Setting_Update(req.body,res);
});

//Upload Image
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var forderName = file.originalname.split("_+_");
        var link = forderName.length == 1 ? './Images/' : './Images/'+forderName[0];
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
        var forderName = file.originalname.split("_+_");
        return forderName.length == 1 ? cb(null, file.originalname) :cb(null, file.originalname.split("_+_")[1]);
    }
});

// var storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         var forderName = file.originalname;
//         var link = './Images/';
//
//         callback(null, link);
//     },
//     filename: function(req, file, cb ) {
//         return cb(null, file.originalname);
//     }
// });

app.post('/booxtown/rest/uploadimage', multer({
    storage: storage
}).array('images',3), function (req, res) {
    res.json({code: 200,description :"Success"});
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

app.post('/booxtown/rest/deleteimage', function (req, res) {
    try {
        var link = './Images/' + req.body.username + '/' + req.body.image ;
        fs.unlinkSync(link);
        res.json({code:200,description:'Success'});
    }
    catch (err)
    {
        res.json({code:701,description:'Failed'});
    }
});


process.on('uncaughtException', function (err) {
    console.log(err);
});

/*var db_config = {
    host     : '103.237.147.54',
    user     : 'boxtown',
    password : 'boxtown2016',
    database : 'booxtown'
};
var mysql      = require('mysql');
function handleDisconnect() {
    console.log('handleDisconnect()');
    connection.destroy();
    connection = mysql.createConnection(db_config);
    connection.connect(function(err) {
        if(err) {
            console.log(' Error when connecting to db  (DBERR001):', err);
            setTimeout(handleDisconnect, 1000);
        }
    });
}*/
/*
app.on('listening', handleDisconnect());*/
