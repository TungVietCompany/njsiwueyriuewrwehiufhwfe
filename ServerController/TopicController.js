/**
 * Created by Axipro on 9/11/2016.
 */
var connection = require('../DatabaseConnection/MysqlConnection');
var topicDao = require('../DAO/TopicDAO');
var sessionDao = require('../DAO/SessionDAO');
var md5 = require('../Library/MD5');
var ResponseData = require('../DAO/ResponseData');

function Topic_Delete(topicid, res){
    topicDao.Topic_Delete(topicid, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_Filter(topicid, title, createDate, userid, res){
    topicDao.Topic_Filter(topicid, title, createDate, userid, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_GetAll(res){
    topicDao.Topic_GetAll(connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_GetByDate(fromDate, toDate, res){
    topicDao.Topic_GetByDate(fromDate, toDate, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_GetByID(topicID, res){
    topicDao.Topic_GetByID(topicID, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_GetByUserID(userID, res){
    topicDao.Topic_GetByUserID(userID, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_GetByUserSession(session_id, res){
    topicDao.Topic_GetByUserSession(session_id, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_Insert(topicid, title, description, createDate, userid, res){
    topicDao.Topic_Insert(topicid, title, description, createDate, userid, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_Search(titleKeyword, descrKeyword, res){
    topicDao.Topic_Search(titleKeyword, descrKeyword, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_Update(topicid, title, description, createDate, userid, res){
    topicDao.Topic_Update(topicid, title, description, createDate, userid, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

module.exports.Topic_Delete = Topic_Delete;
module.exports.Topic_Filter = Topic_Filter;
module.exports.Topic_GetAll = Topic_GetAll;
module.exports.Topic_GetByDate = Topic_GetByDate;
module.exports.Topic_GetByID = Topic_GetByID;
module.exports.Topic_GetByUserID = Topic_GetByUserID;
module.exports.Topic_GetByUserSession = Topic_GetByUserSession;
module.exports.Topic_Insert = Topic_Insert;
module.exports.Topic_Search = Topic_Search;
module.exports.Topic_Update = Topic_Update;