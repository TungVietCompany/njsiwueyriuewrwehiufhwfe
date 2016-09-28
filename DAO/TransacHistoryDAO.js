/**
 * Created by Axipro on 9/10/2016.
 */
var md5 = require('../Library/MD5');
var sessionDao = require('./SessionDAO');


function TransacHistory_Delete(transHisid, connection, callback) {
    connection.query("call TransacHistory_Delete('" + transHisid + "')", function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows.affectedRows);
        }
    });
}

function TransacHistory_Filter(transHis, connection, callback) {
    var query = "call Book_Filter('" + (transHis.bookid ? transHis.bookid : 'null') + "', '" + (transHis.title ? transHis.title : 'null')
        + "', '" + (transHis.author ? transHis.author : 'null') + "', '" + (transHis.photo ? transHis.photo : 'null') + "', '"
        + (transHis.hashTag ? transHis.hashTag : 'null') + "', " + (transHis.locationLongitude ? transHis.locationLongitude : 'null') + ", "
        + (transHis.locationLatitude ? transHis.locationLatitude : 'null') + ", '" + (transHis.createDate ? transHis.createDate : 'null') + "', '"
        + (transHis.bookCondition ? transHis.bookCondition : 'null') + "', '" + (transHis.action ? transHis.action : 'null') + "', "
        + (transHis.isDeleted ? transHis.isDeleted : 'null') + ")";
    connection.query(query, function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows[0]);
        }
    });
}

function TransacHistory_GetAll(connection, callback) {
    connection.query("call TransacHistory_GetAll()", function (err, rows) {
        if (err)
            callback(701);
        else
            callback(rows[0]);
    });
}

function TransacHistory_GetById(transHisID, connection, callback) {
    connection.query("call TransacHistory_GetById('" + transHisID + "')", function (err, rows) {
        if (err)
            callback(701);
        else
            callback(rows[0]);
    });
}

function TransacHistory_GetByDate(fromDate, toDate, connection, callback) {
    connection.query("call TransacHistory_GetByDate('" + (fromDate ? fromDate : 'null') + "', '"
        + (toDate ? toDate : 'null') + "')", function (err, rows) {
        if (err)
            callback(701);
        else
            callback(rows[0]);
    });
}

function TransacHistory_GetByUser(buyUserID, sellUserID, connection, callback) {
    connection.query("call TransacHistory_GetByUser('" + (buyUserID ? buyUserID : 'null') + "', '"
        + (sellUserID ? sellUserID : 'null') + "')", function (err, rows) {
        if (err)
            callback(701);
        else
            callback(rows[0]);
    });
}

function TransacHistory_GetByBook(buyBookID, sellBookID, connection, callback) {
    connection.query("call TransacHistory_GetByBook('" + (buyBookID ? buyBookID : 'null') + "', '"
        + (sellBookID ? sellBookID : 'null') + "')", function (err, rows) {
        if (err)
            callback(701);
        else
            callback(rows[0]);
    });
}

function TransacHistory_GetByAccepted(isAccepted, connection, callback) {
    //isAccepted: int
    connection.query("call TransacHistory_GetByAccepted(" + isAccepted + ")", function (err, rows) {
        if (err)
            callback(701);
        else
            callback(rows[0]);
    });
}

function TransacHistory_UpdateStatus(transHis, connection, callback) {
    sessionDao.getUserIdBySessionId(transHis.session_id, connection, function (response) {
        if (response != 701) {
            var query = "call sp_updateTransactionStatus(" + transHis.trans_id + ", "
                + transHis.status_id + ")";
            connection.query(query, function (err, rows) {
                if (err) {
                    callback(701);
                }
                else {
                    callback(200);
                }
            });
        } else
            callback(701);
    });
}

function TransacHistory_Insert(transHis, connection, callback) {
    sessionDao.getUserIdBySessionId(transHis.session_id, connection, function (response) {

        if (response != '_701_') {
            var query = "call TransacHistory_Insert(" + transHis.buyUserID + ", "
                + transHis.sellUserID + ", now(), '" + transHis.buyBookID + "', "
                + transHis.sellBookID + ", '" + transHis.action + "');";
            connection.query(query, function (err, rows) {
                if (err) {
                    console.log(err);
                    callback('_701_');
                }
                else {
                        if(transHis.action == "swap")
                        {
                            TransacHistory_InsertBookSwap(rows[0][0].id, transHis.buyBookID,connection, function (response) {
                                if(response != '_701_')
                                {
                                    callback(rows[0][0].id);
                                }
                                else
                                {
                                    callback('_701_');
                                }
                            });

                        }
                        else
                        {
                            callback(rows[0][0].id);
                        }

                }
            });
        } else
            callback('_701_');
    });
}

function TransacHistory_InsertBookSwap(id,buyBookID,connection,callback) {
    var listSwap = buyBookID.split("_+_");
    var i = 0;
    var query = "INSERT INTO book_swap (transaction_id,book_id) VALUES ";
    for(i = 0;i<listSwap.length;i++)
    {
        query += "(" + id + ","+listSwap[i] + ")";
        if(i < listSwap.length - 1)
        {
            query += ",";
        }
    }
    connection.query(query, function (err, rows) {
        if (err) {
            callback('_701_');
        }
        else
        {
            callback(id);
        }
    });
}

function TransacHistory_Update(tranHis, connection, callback) {
    var query = "call TransacHistory_Update('" + transHis.tranHisID + "', '" + transHis.buyUserID + "', '"
        + transHis.sellUserID + "', '" + transHis.createDate + "', '" + transHis.buyBookID + "', '" + transHis.sellBookID
        + "', '" + transHis.action + "', " + transHis.isAccepted + ")";
    connection.query(query, function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows.affectedRows);
        }
    });
}


module.exports.TransacHistory_UpdateStatus = TransacHistory_UpdateStatus;
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