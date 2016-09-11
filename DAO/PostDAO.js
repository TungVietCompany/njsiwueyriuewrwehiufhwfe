/**
 * Created by Axipro on 9/10/2016.
 */
var md5 = require('../Library/MD5');
var sessionDao = require('./SessionDAO');


function Post_Delete(postid, connection, callback){
    connection.query("call Post_Delete('" + postid + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}

function Post_Filter(postid, createDate, userid, connection, callback){
    var query = "call Post_Filter('" + postid ? postid : 'null' + "', '" + createDate ? createDate : 'null'
        + "', '" + userid ? userid : 'null' + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Post_GetAll(connection, callback){
    connection.query("call Post_GetAll()", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Post_GetByAuthor(author, connection, callback){
    connection.query("call Post_GetByAuthor('" + author + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Post_GetByDate(fromDate, toDate, connection, callback){
    connection.query("call Post_GetByDate('" + fromDate ? fromDate : 'null' + "', '"
    + toDate ? toDate : 'null' + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Post_GetByID(postID, connection, callback){
    connection.query("call Post_GetById('" + postID + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Post_GetByTitle(title, connection, callback){
    connection.query("call Post_GetByTitle('" + title + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Post_GetByUserID(userID, connection, callback){
    connection.query("call Post_GetByUser('" + userID + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Post_GetByUserSession(session_id, connection, callback){
    sessionDao.getUserIdBySessionId(session_id, connection, function(response){
        if(response != 701){
            connection.query("call Post_GetByUser('" + response + "')", function(err, rows){
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

function Post_Insert(postid, title, author, comment, createDate, userid, connection, callback){
    var query = "call Post_Insert('" + postid + "', '" + title + "', '" + author + "', '" + comment
        + "', '" + createDate + "', '" + userid + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}

function Post_Search(authorKeyword, commentKeyword, connection, callback){
    var query = "call Post_Search('" + authorKeyword ? authorKeyword : 'null' + "', '"
        + commentKeyword ? commentKeyword : 'null' + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Post_Update(postid, title, author, comment, createDate, userid, connection, callback){
    var query = "call Post_Update('" + postid + "', '" + title + "', '" + author + "', '" + comment
        + "', '" + createDate + "', '" + userid + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}

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