var connection = require('../DatabaseConnection/MysqlConnection');
var settingDao = require('../DAO/SettingDAO');
var sessionDao = require('../DAO/SessionDAO');
var md5 = require('../Library/MD5');
var ResponseData = require('../DAO/ResponseData');

function Setting_Insert(user, res) {
    settingDao.Setting_Update(user, connection, function (response) {
        if (response != 701) {
            res.json(new ResponseData(200, "Success", ''));
        }
        else {
            res.json(new ResponseData(701, "Failed", ""));
        }
    });
}

function Setting_Update(setting, res) {
    settingDao.Setting_Update(setting, connection, function (response) {
        if (response != 701) {
            res.json(new ResponseData(200, "Success", ''));
        }
        else {
            res.json(new ResponseData(701, "Failed", ""));
        }
    });
}

function getSettingByUserId(session_id,res) {
    settingDao.getSettingByUserId(session_id,connection,function (response) {
        if(response != 701)
        {
            var listSetting = [];
            listSetting.push(response);
            res.json({code: 200, setting: listSetting});
        }
        else
        {
            res.json(new ResponseData(701, "Failed", ""));
        }
    });
}

module.exports.getSettingByUserId = getSettingByUserId;
module.exports.Setting_Update = Setting_Update;
module.exports.Setting_Insert = Setting_Insert;