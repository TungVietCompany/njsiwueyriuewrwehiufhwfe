/**
 * Created by Axipro on 9/10/2016.
 */
var md5 = require('../Library/MD5');
var sessionDao = require('./SessionDAO');


function TransacHistory_Delete(transHisid, connection, callback){
    connection.query("call TransacHistory_Delete('" + transHisid + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}

function TransacHistory_Filter(transHisID, buyUserID, sellUserID, createDate, buyBookID, sellBookID, action, isAccepted
        , connection, callback){
    var _isDeleted;
    if(!isDeleted)
        _isDeleted = 'null';
    else if(isDeleted == 0)
        _isDeleted = 'false';
    else
        _isDeleted = 'true';

    var query = "call Book_Filter('" + bookid ? bookid : 'null' + "', '" + title ? title : 'null'
    + "', '" + author ? author : 'null' + "', '" + photo ? photo : 'null' + "', '"
    + hashTag ? hashTag : 'null' + "', " + locationLongitude ? locationLongitude : 'null' + ", "
    + locationLatitude ? locationLatitude : 'null' + ", '" + genre ? genre : 'null' + "', '"
    + bookCondition ? bookCondition : 'null' + "', '" + action ? action : 'null' + "', "
    + _isDeleted + ", '" + createDate ? createDate : 'null' + "', '" + userID ? userID : 'null' + "', "
    + price ? price : 'null' + ")";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function TransacHistory_GetAll(connection, callback){
    connection.query("call TransacHistory_GetAll()", function(err, rows){
        if(err)
            callback(701);
        else
            callback(rows[0]);
    });
}

function TransacHistory_GetById(transHisID, connection, callback){
    connection.query("call TransacHistory_GetById('" + transHisID + "')", function(err, rows){
        if(err)
            callback(701);
        else
            callback(rows[0]);
    });
}

function TransacHistory_GetByDate(fromDate, toDate, connection, callback){
    connection.query("call TransacHistory_GetByDate('" + fromDate ? fromDate : 'null' + "', '"
    + toDate ? toDate : 'null' + "')", function(err, rows){
        if(err)
            callback(701);
        else
            callback(rows[0]);
    });
}

function TransacHistory_GetByUser(buyUserID, sellUserID, connection, callback){
    connection.query("call TransacHistory_GetByUser('" + buyUserID ? buyUserID : 'null' + "', '"
    + sellUserID ? sellUserID : 'null' + "')", function(err, rows){
        if(err)
            callback(701);
        else
            callback(rows[0]);
    });
}

function TransacHistory_GetByBook(buyBookID, sellBookID, connection, callback){
    connection.query("call TransacHistory_GetByBook('" + buyBookID ? buyBookID : 'null' + "', '"
    + sellBookID ? sellBookID : 'null' + "')", function(err, rows){
        if(err)
            callback(701);
        else
            callback(rows[0]);
    });
}

function TransacHistory_GetByAccepted(isAccepted, connection, callback){
    //isAccepted: int
    connection.query("call TransacHistory_GetByAccepted(" + isAccepted  + ")", function(err, rows){
        if(err)
            callback(701);
        else
            callback(rows[0]);
    });
}

function TransacHistory_Insert(tranHisID, buyUserID, sellUserID, createDate, buyBookID, sellBookID,
        action, isAccepted, connection, callback){
    var query = "call TransacHistory_Insert('" + tranHisID + "', '" + buyUserID + "', '" + sellUserID + "', '"
        + createDate + "', '" + buyBookID + "', '" + sellBookID + "', '" + action + "', " + isAccepted + ")";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}

function TransacHistory_Update(tranHisID, buyUserID, sellUserID, createDate, buyBookID, sellBookID,
        action, isAccepted, connection, callback){
    var query = "call TransacHistory_Update('" + tranHisID + "', '" + buyUserID + "', '" + sellUserID + "', '"
        + createDate + "', '" + buyBookID + "', '" + sellBookID + "', '" + action + "', " + isAccepted + ")";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}


module.exports.TransacHistory_Delete = TransacHistory_Delete;
module.exports.TransacHistory_Filter = TransacHistory_Filter;
module.exports.TransacHistory_GetAll = TransacHistory_GetAll;
module.exports.TransacHistory_GetById = TransacHistory_GetById;
module.exports.TransacHistory_GetByDate = TransacHistory_GetByDate;
module.exports.TransacHistory_GetByUser = TransacHistory_GetByUser;
module.exports.TransacHistory_GetByBook = TransacHistory_GetByBook;
module.exports.TransacHistory_GetByAccepted = TransacHistory_GetByAccepted;
module.exports.TransacHistory_Insert = TransacHistory_Insert;
module.exports.TransacHistory_Update = TransacHistory_Update;