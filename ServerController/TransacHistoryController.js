/**
 * Created by Axipro on 9/11/2016.
 */
var connection = require('../DatabaseConnection/MysqlConnection');
var transHisDao = require('../DAO/TransacHistoryDAO');
var sessionDao = require('../DAO/SessionDAO');
var bookController=  require('../ServerController/BookController');
var md5 = require('../Library/MD5');
var ResponseData = require('../DAO/ResponseData');

function TransacHistory_Delete(transHisid, res){
    transHisDao.TransacHistory_Delete(transHisid, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function TransacHistory_Filter(transHis, res){
    transHisDao.TransacHistory_Filter(transHis, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function TransacHistory_GetAll(res){
    transHisDao.TransacHistory_GetAll(connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function TransacHistory_GetById(transHisID, res){
    transHisDao.TransacHistory_GetById(transHisID, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function TransacHistory_GetByDate(fromDate, toDate, res){
    transHisDao.TransacHistory_GetByDate(fromDate, toDate, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function TransacHistory_UpdateRating(trans, res){
    transHisDao.TransacHistory_UpdateRating(trans, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(new ResponseData(200, "Success!", ""));
    });
}

function TransacHistory_GetByUser(buyUserID, sellUserID, res){
    transHisDao.TransacHistory_GetByUser(buyUserID, sellUserID, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Transaction_getTopTransaction(transaction_id, res){
    transHisDao.Transaction_getTopTransaction(transaction_id,connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            var listTransaction = [];
            var i = 0;
            for(i = 0;i<response.length;i++)
            {
                listTransaction.push(response[i]);
            }
            res.json({code: 200, transaction: listTransaction});
    });
}

function Transaction_getTransactionInfoById(transaction_id, res){
    transHisDao.Transaction_getTransactionInfoById(transaction_id,connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}


function TransacHistory_GetByBook(buyBookID, sellBookID, res){
    transHisDao.TransacHistory_GetByBook(buyBookID, sellBookID, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function TransacHistory_GetByAccepted(isAccepted, res){
    transHisDao.TransacHistory_GetByAccepted(isAccepted, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function TransacHistory_Insert(tranHis, res){
    transHisDao.TransacHistory_Insert(tranHis, connection, function(response){
        if(response == '_701_')
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(new ResponseData(200, "Success", response));
    });
}

function TransacHistory_UpdateStatus(tranHis, res){
    transHisDao.TransacHistory_UpdateStatus(tranHis, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(new ResponseData(200, "Success!", ""));
    });
}

function TransacHistory_Update(tranHis, res){
    transHisDao.TransacHistory_Update(tranHis, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function TransacHistory_GetBookByIdTransaction(transHisID, res){
   bookController.getBookInTransaction(transHisID,res);
}

function TransacHistory_CheckTransactionExits(tranHis, res){
    transHisDao.TransacHistory_CheckTransactionExits(tranHis, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(new ResponseData(200, "Success!",  ""));
    });
}

module.exports.TransacHistory_CheckTransactionExits = TransacHistory_CheckTransactionExits;
module.exports.TransacHistory_UpdateRating =TransacHistory_UpdateRating;
module.exports.Transaction_getTopTransaction =Transaction_getTopTransaction;
module.exports.Transaction_getTransactionInfoById =Transaction_getTransactionInfoById;
module.exports.TransacHistory_GetBookByIdTransaction =TransacHistory_GetBookByIdTransaction;
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