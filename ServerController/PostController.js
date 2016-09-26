/**
 * Created by Axipro on 9/11/2016.
 */
var connection = require('../DatabaseConnection/MysqlConnection');
var postDao = require('../DAO/PostDAO');
var sessionDao = require('../DAO/SessionDAO');
var md5 = require('../Library/MD5');
var ResponseData = require('../DAO/ResponseData');

function Post_Delete(postid, res){
    postDao.Post_Delete(postid, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Post_Filter(postid, createDate, userid, res){
    postDao.Post_Filter(postid, createDate, userid, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Post_GetAll(res){
    postDao.Post_GetAll(connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Post_GetByAuthor(author, res){
    postDao.Post_GetByAuthor(author, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Post_GetByDate(fromDate, toDate, res){
    postDao.Post_GetByDate(fromDate, toDate, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Post_GetByID(postID, res){
    postDao.Post_GetByID(postID, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Post_GetByTitle(title, res){
    postDao.Post_GetByTitle(title, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Post_GetByUserID(userID, res){
    postDao.Post_GetByUserID(userID, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Post_GetByUserSession(session_id, res){
    postDao.Post_GetByUserSession(session_id, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Post_GetTop(post, res){
    postDao.Post_GetTop(post, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            var listPost = [];
        var i = 0;
        for (i = 0; i < response.length; i++) {
            listPost.push(response[i]);
        }
        res.json({code:200,post : listPost});
    });
}

function Post_Insert(post, res){
    postDao.Post_Insert(post, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error", ""));
        else
            res.json(new ResponseData(200, "Success", ""));
    });
}

function Post_Search(authorKeyword, commentKeyword, res){
    postDao.Post_Search(authorKeyword, commentKeyword, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Post_Update(post, res){
    postDao.Post_Update(post, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

module.exports.Post_GetTop = Post_GetTop;
module.exports.Post_Delete = Post_Delete;
module.exports.Post_Filter = Post_Filter;
module.exports.Post_GetAll = Post_GetAll;
module.exports.Post_GetByAuthor = Post_GetByAuthor;
module.exports.Post_GetByDate = Post_GetByDate;
module.exports.Post_GetByID = Post_GetByID;
module.exports.Post_GetByTitle = Post_GetByTitle;
module.exports.Post_GetByUserID = Post_GetByUserID;
module.exports.Post_GetByUserSession = Post_GetByUserSession;
module.exports.Post_Insert = Post_Insert;
module.exports.Post_Search = Post_Search;
module.exports.Post_Update = Post_Update;