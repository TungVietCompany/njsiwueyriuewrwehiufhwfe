/**
 * Created by Axipro on 9/11/2016.
 */
var connection = require('../DatabaseConnection/MysqlConnection');
var threadDao = require('../DAO/ThreadDAO');
var sessionDao = require('../DAO/SessionDAO');
var md5 = require('../Library/MD5');
var ResponseData = require('../DAO/ResponseData');

function Thread_Delete(threadid, res){
    threadDao.Thread_Delete(threadid, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Thread_Filter(thread, res){
    threadDao.Thread_Filter(thread, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Thread_GetTop(thread, res){
    threadDao.Thread_GetTop(thread, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Thread_GetAll(res){
    threadDao.Thread_GetAll(connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Thread_GetByDate(fromDate, toDate, res){
    threadDao.Thread_GetByDate(fromDate, toDate, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Thread_GetByID(threadid, res){
    threadDao.Thread_GetByID(threadid, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Thread_GetByTopic(topicid, res){///////////////////
    threadDao.Thread_GetByTopic(topicid, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            var listThread = [];
            var i = 0;
            for (i = 0; i < response.length; i++) {
                listThread.push(response[i]);
        }
            res.json({code:200,thread : listThread});
    });
}

function Thread_Insert(thread, res){
    threadDao.Thread_Insert(thread, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Failed", ""));
        else
            res.json(new ResponseData(200, "Success", ""));
    });
}

function Thread_AddStatus(thread, res){
    threadDao.Thread_AddStatus(thread, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Failed", ""));
        else
            res.json(new ResponseData(200, "Success", ""));
    });
}

function Thread_RemoveStatus(thread, res){
    threadDao.Thread_RemoveStatus(thread, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Failed", ""));
        else
            res.json(new ResponseData(200, "Success", ""));
    });
}

function Thread_Search(titleKeyword, descrKeyword, res){
    threadDao.Thread_Search(titleKeyword, descrKeyword, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Thread_Update(thread, res){
    threadDao.Thread_Update(thread, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

module.exports.Thread_AddStatus = Thread_AddStatus;
module.exports.Thread_RemoveStatus = Thread_RemoveStatus;
module.exports.Thread_GetTop = Thread_GetTop;
module.exports.Thread_Delete = Thread_Delete;
module.exports.Thread_Filter = Thread_Filter;
module.exports.Thread_GetAll = Thread_GetAll;
module.exports.Thread_GetByDate = Thread_GetByDate;
module.exports.Thread_GetByID = Thread_GetByID;
module.exports.Thread_GetByTopic = Thread_GetByTopic;
module.exports.Thread_Insert = Thread_Insert;
module.exports.Thread_Search = Thread_Search;
module.exports.Thread_Update = Thread_Update;