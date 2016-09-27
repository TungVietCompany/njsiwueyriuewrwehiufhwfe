var md5 = require('../Library/MD5');
var sessionDao = require('./SessionDAO');

function Setting_Insert(session_id, connection, callback) {
    sessionDao.getUserIdBySessionId(session_id, connection, function (response) {
        if (response != '_701_') {
            var query = "call sp_insertSetting(" + 1 + ", " + 1 + "," +
               0 + ",'01:00', '23:00'," + response + ")";
            connection.query(query, function (err, rows) {
                if (err) {
                    callback(701);
                }
                else {
                    callback(200);
                }
            });
        } else {
            callback(701);
        }
    });
}

function Setting_Update(setting, connection, callback) {
    sessionDao.getUserIdBySessionId(setting.session_id, connection, function (response) {
        if (response != '_701_') {
            var query = "call sp_updateSetting(" + setting.id + ", " +setting.is_notification + ", " + setting.is_best_time + "," +
                setting.is_current_location + ",'" + setting.time_start + "', '" + setting.time_to + "')";
            connection.query(query, function (err, rows) {
                if (err) {
                    callback(701);
                }
                else {
                    callback(200);
                }
            });
        } else {
            callback(701);
        }
    });
}

function getSettingByUserId(session_id,connection,callback) {
    sessionDao.getUserIdBySessionId(session_id,connection,function (response) {
        if(response != '_701_')
        {
            console.log(response);
            var query = "call sp_getSetting("+ response +")";
            connection.query(query
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }
                    callback(rows[0][0]);
                });
        }
        else
        {
            callback(701);
        }
    });
}

module.exports.getSettingByUserId = getSettingByUserId;
module.exports.Setting_Update = Setting_Update;
module.exports.Setting_Insert = Setting_Insert;