/**
 * Created by Axipro on 9/10/2016.
 */
var md5 = require('../Library/MD5');
var sessionDao = require('./SessionDAO');


function Topic_Delete(topicid, connection, callback){
    connection.query("call Topic_Delete('" + topicid + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}

function Topic_Filter(topic, connection, callback){
    var query = "call Topic_Filter('" + (topic.topicid ? topic.topicid : 'null') + "', '" + (topic.title ? topic.title : 'null')
        + "', '" + (topic.createDate ? topic.createDate : 'null') + "', '" + (topic.userid ? topic.userid : 'null') + "')";

    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Topic_GetAll(connection, callback){
    connection.query("call Topic_GetAll()", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Topic_GetByDate(fromDate, toDate, connection, callback){
    connection.query("call Topic_GetByDate('" + (fromDate ? fromDate : 'null') + "', '"
    + (toDate ? toDate : 'null') + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Topic_GetByID(topicID, connection, callback){
    connection.query("call Topic_GetById('" + topicID + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Topic_GetByUserID(userID, connection, callback){
    connection.query("call Topic_GetByUser('" + userID + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Topic_GetByUserSession(session_id, connection, callback){
    sessionDao.getUserIdBySessionId(session_id, connection, function(response){
        if(response != 701){
            connection.query("call Topic_GetByUser('" + response + "')", function(err, rows){
                if(err){
                    callback(701);
                }
                else{
                    callback(rows[0]);
                }
            });
        }
        else
            callback(701);
    });
}

function Topic_Insert(topic, connection, callback){
    var query = "call Topic_Insert('" + topic.topicid + "', '" + topic.title + "', '" + topic.description + "', '"
        + topic.createDate + "', '" + topic.userid + "')";
    callback(query);
    /*connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });*/
}

function Topic_Search(titleKeyword, descrKeyword, connection, callback){
    var query = "call Topic_Search('" + (titleKeyword ? titleKeyword : 'null') + "', '"
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

function Topic_Update(topic, connection, callback){
    var _isDeleted;
    var query = "call Topic_Update('" + topic.topicid + "', '" + topic.title + "', '" + topic.description + "', '"
        + topic.createDate + "', '" + topic.userid + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
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