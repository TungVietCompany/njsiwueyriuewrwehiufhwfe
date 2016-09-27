/**
 * Created by Administrator on 27/09/2016.
 */
var connection = require('../DatabaseConnection/MysqlConnection');
var notifiDAO = require('../DAO/NotifiDAO');
var sessionDao = require('../DAO/SessionDAO');
var md5 = require('../Library/MD5');
var ResponseData = require('../DAO/ResponseData');

function Notification_Insert(target_id, content,title,key_screen, res){
    notifiDAO.Notification_Insert(key_screen,target_id,content,title, connection, function(response){
        if(response == 701){
            // res.json(new ResponseData(701, "Failed", ""));
        }
        else{
            //res.json(new ResponseData(200, "Success", ""));
        }
    });
}
function Notification_AddStatus(notifi, res){
    notifiDAO.Notification_AddStatus(notifi, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Failed", ""));
        else
            res.json(new ResponseData(200, "Success", ""));
    });
}

function Notification_RemoveStatus(notifi, res){
    notifiDAO.Notification_RemoveStatus(notifi, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Failed", ""));
        else
            res.json(new ResponseData(200, "Success", ""));
    });
}
function Notification_GetTop(notifi, res){
    notifiDAO.Notification_GetTop(notifi, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            var listNotifi = [];
        var i = 0;
        for (i = 0; i < response.length; i++) {
            listNotifi.push(response[i]);
        }
        res.json({code:200,notifi : listNotifi});
    });
}
module.exports.Notification_GetTop = Notification_GetTop;
module.exports.Notification_AddStatus = Notification_AddStatus;
module.exports.Notification_RemoveStatus = Notification_RemoveStatus;
module.exports.Notification_Insert = Notification_Insert;