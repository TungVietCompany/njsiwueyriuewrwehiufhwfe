var md5 = require('../Library/MD5');
var sessionDao = require('./SessionDAO');

function insertUser(user, connection, callback) {
    var user_id = md5.getMD5ByTime(user.username);
    connection.query("call sp_insertUser('" + user_id + "','" + user.first_name + "','" + user.last_name + "','"
        + user.username + "','" + user.email + "','" + user.birthday + "','" + user.phone + "','" + user.password + "',0,1,NOW())"
        , function (err, rows) {
            if (err) {
                callback(701);
            }
            callback(user_id);
        });
}

function checkUserExits(username, connection, callback) {

    connection.query("call sp_checkUserExits('" + username + "')", function (err, rows) {
        if (err) {
            callback(701);
        }
        try {
            var user1 = rows[0][0].username;
            callback(701);

        } catch (e) {
            callback(200);
        }
    });
}

function insertUserSession(user_id, connection, callback) {
    var session_id = md5.getMD5ByTime(user_id);
    connection.query("call sp_insertUserSession('" + md5.getMD5ByTime('') + "','" + user_id + "','"+session_id+"','')"
        , function (err, rows) {
            if (err) {
                callback(701);
            }
            callback(session_id);
        });
}

function userLogin(user, connection, callback) {
    connection.query("call sp_checkLoginValid('" + user.username + "','" + user.password + "')"
        , function (err, rows) {
            if (err) {
                callback(701);
            }
            try{
                var session_id = md5.getMD5ByTime(user.username);
                updateUserSession(rows[0][0].id,session_id,user.device_type,connection,function (response) {
                    if(response == 200)
                    {
                        callback(session_id);
                    }
                });
            }catch(e) {
                callback(701);
            }
        });
}

function updateUserSession(user_id,session_id,device_type,connection,callback) {
    connection.query("call sp_updateUserSession('" + user_id + "','" + session_id + "','"+device_type +"')"
        , function (err, rows) {
            if (err) {
                callback(701);
            }
            callback(200);
        });
}

function getUserInforById(user_id,connection,callback) {
    connection.query("CALL sp_getUserById('" + user_id +"')"
        , function (err, rows) {
            if (err) {
                callback(701);
            }
            var user= JSON.stringify(rows[0][0]);
            if(user_id != null)
            {
                callback(rows[0][0]);
            }
            else
            {
                callback(701);
            }
        });
}

function updateUserInfo(user,connection,callback) {
    sessionDao.getUserIdBySessionId(user.session_id,connection,function (response) {
        if(response != 701)
        {
            connection.query("call sp_updateUser('" + response + "','" + user.first_name + "','" + user.last_name + "','"
               + user.email + "','" + user.birthday + "','" + user.phone + "')"
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }
                    callback(200);
                });
        }
        else
        {
            callback(701);
        }
    });
}

function updateUserInfo_ios(user,connection,callback) {
    sessionDao.getUserIdBySessionId(user.session_id,connection,function (response) {
        if(response != 701)
        {
            connection.query("call sp_updateUser('" + response + "','" + user.first_name + "','" + user.last_name + "','"
                + user.email + "','" + user.birthday + "','" + user.phone + "')"
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }
                    callback(200);
                });
        }
        else
        {
            callback(701);
        }
    });
}

function checkValidUsernameAndOldPassword(session_id,pwd_old,connection,callback) {
    connection.query("CALL sp_checkValidUsernameAndOldPassword('" + session_id +"','"+pwd_old+"')"
        , function (err, rows) {
            if (err) {
                callback(701);
            }
            try{
                var user_id = JSON.stringify(rows[0][0].id);
                callback(rows[0][0].id);
            }catch (e)
            {
                callback(701);
            }
        });
}

function changePassword(user,connection,callback) {
    checkValidUsernameAndOldPassword(user.session_id,user.pwd_old,connection,function (response) {
        if(response != 701)
        {
            connection.query("call sp_resetPassword('" + response + "','" + user.pwd_new + "')"
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }
                    callback(200);
                });
        }
        else
        {
            callback(701);
        }
    });
}

function userLogout(user,connection,callback) {
    sessionDao.getUserIdBySessionId(user.session_id,connection,function (response) {
        if(response != 701)
        {
            connection.query("call sp_userLogout('" + user.session_id + "')"
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }
                    callback(200);
                });
        }
        else
        {
            callback(701);
        }
    });
}


module.exports.updateUserInfo_ios = updateUserInfo_ios;
module.exports.userLogout = userLogout;
module.exports.changePassword = changePassword;
module.exports.updateUserInfo = updateUserInfo;
module.exports.getUserInforById = getUserInforById;
module.exports.userLogin = userLogin;
module.exports.insertUser = insertUser;
module.exports.checkUserExits = checkUserExits;
module.exports.insertUserSession = insertUserSession;