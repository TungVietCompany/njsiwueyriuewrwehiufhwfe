/**
 * Created by Administrator on 27/09/2016.
 */
var md5 = require('../Library/MD5');
var sessionDao = require('./SessionDAO');
function Notification_Insert(key_screen,target_id, content,title, connection, callback) {
            var query = "call Notification_Insert('"+key_screen+"','"+title+"','" + target_id + "', '" + content + "',"
                + "now())";
            connection.query(query, function (err, rows) {
                if (err) {
                    callback(701);
                }
                else {
                    callback(200);
                }
            });
}

function Notification_RemoveStatus(notifi, connection, callback){
    sessionDao.getUserIdBySessionId(notifi.session_id,connection,function (response) {
        if(response != '_701_') {
            var query = "call sp_UnreadNotification(" + notifi.notifi_id + "," + response + ")";
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
function Notification_AddStatus(notifi, connection, callback){
    sessionDao.getUserIdBySessionId(notifi.session_id,connection,function (response) {
        if(response != '_701_') {
            var query = "call sp_AddStatusNotification(" + notifi.notifi_id + "," + response + ")";
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

function Notification_GetTop(notifi, connection, callback){
    sessionDao.getUserIdBySessionId(notifi.session_id,connection,function (response) {
        if (response != '_701_') {
            var query = "call sp_GetTopNotification(" + notifi.top + "," +
                notifi.from + "," + response + ")";
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
module.exports.Notification_GetTop = Notification_GetTop;
module.exports.Notification_AddStatus = Notification_AddStatus;
module.exports.Notification_RemoveStatus = Notification_RemoveStatus;
module.exports.Notification_Insert = Notification_Insert;