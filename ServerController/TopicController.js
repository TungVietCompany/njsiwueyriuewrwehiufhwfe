/**
 * Created by Axipro on 9/11/2016.
 */
var connection = require('../DatabaseConnection/MysqlConnection');
var topicDao = require('../DAO/TopicDAO');
var sessionDao = require('../DAO/SessionDAO');
var md5 = require('../Library/MD5');
var ResponseData = require('../DAO/ResponseData');

function Topic_Delete(topicid, res) {
    topicDao.Topic_Delete(topicid, connection, function (response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_Filter(topic, res) {
    topicDao.Topic_Filter(topic, connection, function (response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_GetAll(res) {
    topicDao.Topic_GetAll(connection, function (response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            var listTopic = [];
        var i = 0;
        for (i = 0; i < response.length; i++) {
            listTopic.push(response[i]);
        }
        res.json({code: 200, topic: listTopic});
    });
}

function Topic_GetTop(topic,res) {
    topicDao.Topic_GetTop(topic,connection, function (response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            var listTopic = [];
        var i = 0;
        for (i = 0; i < response.length; i++) {
            listTopic.push(response[i]);
        }
        res.json({code: 200, topic: listTopic});
    });
}

function Topic_AddStatus(topic, res){
    topicDao.Topic_AddStatus(topic, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Failed", ""));
        else
            res.json(new ResponseData(200, "Success", ""));
    });
}
function GetTopicByID(topic, res){
    topicDao.getTopicInfoById(topic.id, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
        {
            //console.log(response);
            var listTopic = [];
            listTopic.push(response);
            res.json({code: 200, topic: listTopic});
        }

    });
}
function Topic_RemoveStatus(topic, res){
    topicDao.Topic_RemoveStatus(topic, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Failed", ""));
        else
            res.json(new ResponseData(200, "Success", ""));
    });
}

function Topic_GetByDate(fromDate, toDate, res) {
    topicDao.Topic_GetByDate(fromDate, toDate, connection, function (response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_GetByID(topicID, res) {
    topicDao.Topic_GetByID(topicID, connection, function (response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_GetByUserID(userID, res) {
    topicDao.Topic_GetByUserID(userID, connection, function (response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_GetByUserSession(session_id, res) {
    topicDao.Topic_GetByUserSession(session_id, connection, function (response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_Insert(topic, userid, res) {
    topicDao.Topic_Insert(topic, connection, function (response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_Search(titleKeyword, descrKeyword, res) {
    topicDao.Topic_Search(titleKeyword, descrKeyword, connection, function (response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Topic_Update(topic, userid, res) {
    topicDao.Topic_Update(topic, connection, function (response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}
module.exports.GetTopicByID =GetTopicByID;
module.exports.Topic_AddStatus = Topic_AddStatus;
module.exports.Topic_RemoveStatus = Topic_RemoveStatus;
module.exports.Topic_GetTop = Topic_GetTop;
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