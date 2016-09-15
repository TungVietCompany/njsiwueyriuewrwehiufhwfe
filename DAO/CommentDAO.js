/**
 * Created by Axipro on 9/10/2016.
 */
var md5 = require('../Library/MD5');
var sessionDao = require('./SessionDAO');

function Comment_Delete(commentid, connection, callback){
    connection.query("call Comment_Delete('" + commentid + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}

function Comment_Filter(comment, connection, callback){
    var query = "call Comment_Filter('" + (comment.commentid ? comment.commentid : 'null') + "', '"
        + (comment.createDate ? comment.createDate : 'null')
        + "', '" + (comment.threadid ? comment.threadid : 'null') + "', '" + (comment.userid ? comment.userid : 'null') + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Comment_GetAll(connection, callback){
    connection.query("call Comment_GetAll()", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Comment_GetByDate(fromDate, toDate, connection, callback){
    connection.query("call Comment_GetByDate('" + (fromDate ? fromDate : 'null') + "', '"
    + (toDate ? toDate : 'null') + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Comment_GetByID(commentID, connection, callback){
    connection.query("call Comment_GetById('" + commentID + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Comment_GetByThread(threadID, connection, callback){
    connection.query("call Comment_GetByThread('" + threadID + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Comment_GetByUser(userID, connection, callback){
    connection.query("call Comment_GetByUser('" + userID + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Comment_Insert(comment, connection, callback){
    var query = "call Comment_Insert('" + comment.commentid + "', '" + comment.content + "', '" + comment.createDate + "', '"
        + comment.threadid + "', '" + comment.userid + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}

function Comment_Update(comment, connection, callback){
    var query = "call Comment_Update('" + comment.commentid + "', '" + comment.content + "', '" + comment.createDate + "', '"
        + comment.threadid + "', '" + comment.userid + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
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