/**
 * Created by Axipro on 9/11/2016.
 */
var connection = require('../DatabaseConnection/MysqlConnection');
var transHisDao = require('../DAO/TransacHistoryDAO');
var sessionDao = require('../DAO/SessionDAO');
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

function TransacHistory_GetByUser(buyUserID, sellUserID, res){
    transHisDao.TransacHistory_GetByUser(buyUserID, sellUserID, connection, function(response){
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
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
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