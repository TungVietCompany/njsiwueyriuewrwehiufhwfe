var md5 = require('../Library/MD5');
var sessionDao = require('./SessionDAO');

function insertUser(user, connection, callback) {

    var query = "call sp_insertUser('" + user.first_name + "','" + user.last_name + "','"
        + user.username + "','" + user.email + "','" + user.birthday + "','" + user.phone + "','" + user.password + "',0,1,NOW())";
    connection.query(query
        , function (err, rows) {
            if (err) {
                callback('_701_');
            }
            callback(rows[0][0].id);
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

function insertUserSession(user_id,session_id, connection, callback) {
    connection.query("call sp_insertUserSession('" + user_id + "','"+session_id+"','')"
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
                updateUserSession(rows[0][0].id,user.session_id,user.device_type,connection,function (response) {
                    if(response == 200)
                    {
                        callback(user.session_id);
                    }
                });
            }catch(e) {
                callback(701);
            }
        });
}

function userLogin_firebase(user, connection, callback) {
    connection.query("call sp_checkLoginValid('" + user.username + "','" + user.password + "')"
        , function (err, rows) {
            if (err) {
                callback(701);
            }
            try{
                updateUserSession(rows[0][0].id,user.session_id,user.device_type,connection,function (response) {
                    if(response == 200)
                    {
                        callback(user.session_id);
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

function getTokenForUser(user_id,connection,callback) {
    connection.query("CALL getTokenForUser(" + user_id +")"
        , function (err, rows) {
            if (err) {
                console.log(err);
                callback(701);
            }
            console.log(rows[0]);
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

function updateUserInfo(session_id,user,connection,callback) {
    sessionDao.getUserIdBySessionId(session_id,connection,function (response) {
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
    console.log(session_id + "  "+pwd_old);
    connection.query("CALL sp_checkValidUsernameAndOldPassword('" + session_id +"','"+pwd_old+"')"
        , function (err, rows) {
            if (err) {
                callback(701);
            }
            try{
                console.log(rows[0]);
                var user_id = JSON.stringify(rows[0][0].id);
                callback(rows[0][0].id);
            }catch (e)
            {
                callback('_701_');
            }
        });
}

function changePassword(user,connection,callback) {
    checkValidUsernameAndOldPassword(user.session_id,user.pwd_old,connection,function (response) {
        if(response != '_701_')
        {
            connection.query("call sp_resetPassword(" + response + ",'" + user.pwd_new + "')"
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
        if(response != '_701_')
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

//DungNS 11-9-2016

function User_Delete(userid, connection, callback){
    connection.query("call User_Delete('" + userid + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}

function User_Filter(user, connection, callback){
    var query = "call User_Filter('" + (user.userid ? user.userid : 'null') + "', '" + (user.firstName ? user.firstName : 'null')
        + "', '" + (user.lastName ? user.lastName : 'null') + "', '" + (user.userName ? user.userName : 'null') + "', '"
        + (user.birthDay ? user.birthDay : 'null') + "', '" + (user.phone ? user.phone : 'null') + "', "
        + (user.isDeleted ? user.isDeleted : 'null') + ", '" + (user.createDate ? user.createDate : 'null') + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function User_GetAll(connection, callback){
    connection.query("call User_GetAll()", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function User_GetByDeleted(isDeleted, connection, callback){
    connection.query("call User_GetByDeleted(" + isDeleted + ")", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function User_GetByActive(isActive, connection, callback){
    connection.query("call User_GetByActive(" + isActive + ")", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function User_GetByID(userID, connection, callback){
    connection.query("call User_GetById('" + userID + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function User_GetByUserName(userName, connection, callback){
    connection.query("call User_GetByUserName('" + userName + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function User_GetByUserSession(session_id, connection, callback){
    sessionDao.getUserIdBySessionId(session_id, connection, function(response){
        if(response != 701){
            connection.query("call User_GetById('" + response + "')", function(err, rows){
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

function User_Insert(user, connection, callback){
    //isDeleted, isActive: int
    var query = "call User_Insert('" + user.userid + "', '" + user.firstName + "', '" + user.lastName + "', '"
        + user.userName + "', '" + user.mail + "', '" + user.birthDay + "', '" + user.phone + "', '" + user.password
        + "', " + user.isDeleted  + ", " + user.isActive + ", '" + user.createDate + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}

function User_Update(user, connection, callback){
    //isDeleted, IsActive: int
    var query = "call User_Update('" + user.userid + "', '" + user.firstName + "', '" + user.lastName + "', '"
        + user.userName + "', '" + user.mail + "', '" + user.birthDay + "', '" + user.phone + "', '" + user.password
        + "', " + user.isDeleted  + ", " + user.isActive + ", '" + user.createDate + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}

function User_UpdateByUserSession(user, connection, callback){
    sessionDao.getUserIdBySessionId(user.session_id, connection, function(response){
        if(response != 701){
            connection.query("call User_Update('" + response + "', '" + user.firstName + "', '" + user.lastName + "', '"
                + user.userName + "', '" + user.mail + "', '" + user.birthDay + "', '" + user.phone + "', '" + user.password
                + "', " + user.isDeleted + ", " + user.isActive + ", '" + user.createDate + "')", function(err, rows){
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

module.exports.userLogin_firebase = userLogin_firebase;
module.exports.userLogout = userLogout;
module.exports.changePassword = changePassword;
module.exports.updateUserInfo = updateUserInfo;
module.exports.getUserInforById = getUserInforById;
module.exports.userLogin = userLogin;
module.exports.insertUser = insertUser;
module.exports.checkUserExits = checkUserExits;
module.exports.insertUserSession = insertUserSession;
module.exports.User_Delete = User_Delete;
module.exports.User_Filter = User_Filter;
module.exports.User_GetAll = User_GetAll;
module.exports.User_GetByDeleted = User_GetByDeleted;
module.exports.User_GetByID = User_GetByID;
module.exports.User_GetByUserName = User_GetByUserName;
module.exports.User_GetByUserSession = User_GetByUserSession;
module.exports.User_Insert = User_Insert;
module.exports.User_Update = User_Update;
module.exports.User_UpdateByUserSession = User_UpdateByUserSession;
module.exports.getTokenForUser = getTokenForUser;