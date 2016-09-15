/**
 * Created by Axipro on 9/11/2016.
 */

var connection = require('../DatabaseConnection/MysqlConnection');
var commentDao = require('../DAO/CommentDAO');
var sessionDao = require('../DAO/SessionDAO');
var md5 = require('../Library/MD5');
var ResponseData = require('../DAO/ResponseData');

function Comment_Delete(commentid, res){
    commentDao.Comment_Delete(commentid, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Comment_Filter(comment, res){
    commentDao.Comment_Filter(comment, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Comment_GetAll(res){
    commentDao.Comment_GetAll(connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Comment_GetByDate(fromDate, toDate, res){
    commentDao.Comment_GetByDate(fromDate, toDate, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Comment_GetByID(commentID, res){
    commentDao.Comment_GetByID(commentID, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Comment_GetByThread(threadID, res){
    commentDao.Comment_GetByThread(threadID, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Comment_GetByUser(userID, res){
    commentDao.Comment_GetByUser(userID, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Comment_Insert(comment, res){
    commentDao.Comment_Insert(comment, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Comment_Update(comment, res){
    commentDao.Comment_Update(comment, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

module.exports.Comment_Delete = Comment_Delete;
module.exports.Comment_Filter = Comment_Filter;
module.exports.Comment_GetAll = Comment_GetAll;
module.exports.Comment_GetByDate = Comment_GetByDate;
module.exports.Comment_GetByID = Comment_GetByID;
module.exports.Comment_GetByThread = Comment_GetByThread;
module.exports.Comment_GetByUser = Comment_GetByUser;
module.exports.Comment_Insert = Comment_Insert;
module.exports.Comment_Update = Comment_Update;