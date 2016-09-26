/**
 * Created by Axipro on 9/10/2016.
 */
var md5 = require('../Library/MD5');
var sessionDao = require('./SessionDAO');


function Thread_Delete(threadid, connection, callback){
    connection.query("call Thread_Delete('" + threadid + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}

function Thread_Filter(thread, connection, callback){
    var query = "call Thread_Filter('" + (thread.threadid ? thread.threadid : 'null') + "', '"
        + (thread.title ? thread.title : 'null') + "', '" + (thread.createDate ? thread.createDate : 'null')
        + "', '" + (thread.topicID ? thread.topicID : 'null') + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Thread_GetTop(thread, connection, callback){
    sessionDao.getUserIdBySessionId(thread.session_id,connection,function (response) {
        if (response != '_701_') {
            var query = "call sp_GetTopThread(" + thread.topic_id + "," +
                thread.top + "," + thread.from + "," + response + ")";
            connection.query(query, function (err, rows) {
                if (err) {
                    callback(701);
                }
                else {
                    callback(rows[0]);
                }
            });
        }
        else {
            callback(701);
        }
    });
}

function Thread_GetAll(connection, callback){
    connection.query("call Thread_GetAll()", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Thread_GetByDate(fromDate, toDate, connection, callback){
    connection.query("call Thread_GetByDate('" + (fromDate ? fromDate : 'null') + "', '"
        + (toDate ? toDate : 'null') + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Thread_GetByID(threadid, connection, callback){
    connection.query("call Thread_GetById('" + threadid + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Thread_GetByTopic(topicid, connection, callback){
    connection.query("call Thread_GetByTopic('" + topicid + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Thread_Insert(thread, connection, callback){
    sessionDao.getUserIdBySessionId(thread.session_id,connection,function (response) {

        if(response != '_701_')
        {
            var query = "call Thread_Insert('" + thread.title + "', '" + thread.description +"',"
                +  "now(), " + thread.topic_id + ","+ response +",0)";
            connection.query(query, function(err, rows){
                if(err){
                    callback(701);
                }
                else{
                    callback(200);
                }
            });
        }
        else
        {
            callback(701);
        }
    });

}

function Thread_RemoveStatus(thread, connection, callback){
    sessionDao.getUserIdBySessionId(thread.session_id,connection,function (response) {
        if(response != '_701_') {
            var query = "call sp_UnreadThread(" + thread.thread_id + "," + response + ")";
            connection.query(query, function (err, rows) {
                if (err) {
                    callback(701);
                }
                else {
                    callback(200);
                }
            });
        }
        else
        {
            callback(701);
        }
    });
}

function Thread_AddStatus(thread, connection, callback){
    sessionDao.getUserIdBySessionId(thread.session_id,connection,function (response) {
        if(response != '_701_') {
            var query = "call sp_AddStatusThread(" + thread.thread_id + "," + response + ")";
            connection.query(query, function (err, rows) {
                if (err) {
                    callback(701);
                }
                else {
                    callback(200);
                }
            });
        }
        else
        {
            callback(701);
        }
    });
}

function Thread_Search(titleKeyword, descrKeyword, connection, callback){
    var query = "call Thread_Search('" + (titleKeyword ? titleKeyword : 'null') + "', '"
        + (descrKeyword ? descrKeyword : 'null') + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Thread_Update(thread, connection, callback){
    var query = "call Thread_Update('" + thread.threadid + "', '" + thread.title + "', '" + thread.description +"', '"
        + thread.createDate + "', '" + thread.topicid + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
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