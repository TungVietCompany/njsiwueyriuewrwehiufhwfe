var connection = require('../DatabaseConnection/MysqlConnection');
var userDao = require('../DAO/UserDAO');
var sessionDao = require('../DAO/SessionDAO');
var settingDao = require('../DAO/SettingDAO');
var ResponseData = require('../DAO/ResponseData');
var md5 = require('../Library/MD5');
//connection.connect();
//Sign up
function signup(user, res) {
    var err = new ResponseData(701, "Tên đăng ký đã tồn tại", "");
    var success = new ResponseData(200, "Đăng ký thành công", "");
    userDao.checkUserExits(user.username, connection, function (response) {
        if (response == 200) {
            userDao.insertUser(user, connection, function (response) {
                if (response != '_701_') {
                    userDao.insertUserSession(response,user.session_id, connection, function (response) {
                        if (response != 701) {
                            settingDao.Setting_Insert(user.session_id, connection, function (response) {
                                if (response != 701) {

                                    res.json(new ResponseData(200, "Đăng ký thành công", response));
                                }
                                else {
                                    res.json(err);
                                }
                            });
                        }
                        else {
                            res.json(err);
                        }
                    });
                }
                else {
                    res.json(err);
                }
            });

        }
        else {
            res.json(err);
        }
    });


}
function getUserID(topic, res){
    sessionDao.getUserIdBySessionId(topic.session_id,connection,function (response) {
        if (response != 701) {
            var user_id = response;
            res.json(new ResponseData(200, "Thành công", user_id));
        }
        else
        {
            res.json(new ResponseData(701, "Session ID không tồn tại", ""));
        }
    });
}
//Login

function login(user, res) {
    userDao.userLogin(user, connection, function (response) {
        if (response != 701) {
            res.json(new ResponseData(200, "Đăng nhập thành công", response));
        }
        else {
            res.json(new ResponseData(701, "Đăng nhập thất bại", ""));
        }
    });
}

function login_firebase(user, res) {
    userDao.userLogin_firebase(user, connection, function (response) {
        if (response != 701) {
            res.json(new ResponseData(200, "Đăng nhập thành công", response));
        }
        else {
            res.json(new ResponseData(701, "Đăng nhập thất bại", ""));
        }
    });
}

//Get User Info

function getUserInforById(session_id, res) {
    sessionDao.getUserIdBySessionId(session_id, connection, function (response) {
        if (response != 701) {
            var user_id = response;
            userDao.getUserInforById(user_id, connection, function (response) {
                var listUser = [];
                listUser.push(response);
                if (response != 701) {
                    res.json({code: 200, user: listUser});
                }
                else {
                    res.json(new ResponseData(701, "Session ID không tồn tại", ""));
                }
            });
        }
        else {
            res.json(new ResponseData(701, "Session ID không tồn tại", ""));
        }
    });
}

//Update user info
function updateUserInforById(user, res) {
    userDao.updateUserInfo(user, connection, function (response) {
        if (response != 701) {
            res.json(new ResponseData(200, "Cập nhật thông tin thành công", ""));
        }
        else {
            res.json(new ResponseData(701, "Cập nhật thông tin thất bại", ""));
        }
    });
}

function user_getRating(user_id, res) {
    userDao.user_getRating(user_id, connection, function (response) {
        if (response != 701) {
            res.json({code:200,rating:response});
        }
        else {
            res.json({code:701,rating:0});
        }
    });
}


//Update user info
function updateUserInforById_ios(user, res) {
    userDao.updateUserInfo_ios(user, connection, function (response) {
        if (response != 701) {
            res.json(new ResponseData(200, "Cập nhật thông tin thành công", ""));
        }
        else {
            res.json(new ResponseData(701, "Cập nhật thông tin thất bại", ""));
        }
    });
}

//Change password
function changePassword(user, res) {
    userDao.changePassword(user, connection, function (response) {
        if (response != 701) {
            res.json(new ResponseData(200, "Thay đổi mật khẩu thành công", ""));
        }
        else {
            res.json(new ResponseData(701, "Thay đổi mật khẩu thất bại", ""));
        }
    });
}

//Change password
function userLogout(user, res) {
    userDao.userLogout(user, connection, function (response) {
        if (response != 701) {
            res.json(new ResponseData(200, "Đăng xuất thành công", ""));
        }
        else {
            res.json(new ResponseData(701, "Đăng xuất thất bại", ""));
        }
    });
}

function getAllUser(res) {
    connection.query('call test_proc', function (err, rows) {
        if (err) {

            return console.error('could not connect to mysql', err);
        }
        res.json(rows[0]);
    });
}

function checkUserExits(username, res) {
    connection.query("CALL sp_checkUserExits_160828('" + username + "')", function (err, rows) {
        if (err) {
            res.json('STATUS:404');
        }
        res.json(rows[0][0].username);
    });
}

module.exports.updateUserInforById_ios = updateUserInforById_ios;
//DungNS 11-9-2016


function User_Delete(userid, res){
    userDao.User_Delete(userid, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function User_Filter(user, res){
    userDao.User_Filter(user, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function User_GetAll(res){
    userDao.User_GetAll(connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function User_GetByDeleted(isDeleted, res){
    userDao.User_GetByDeleted(isDeleted, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function User_GetByActive(isActive, res){
    userDao.User_GetByActive(isActive, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function User_GetByID(userID, res){
    userDao.User_GetByID(userID, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function User_GetByUserName(userName, res){
    userDao.User_GetByUserName(userName, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function User_GetByUserSession(session_id, res){
    userDao.User_GetByUserSession(session_id, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function User_Insert(user, res){
    userDao.User_Insert(user, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function User_Update(user, res){
    userDao.User_Update(user, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function User_UpdateByUserSession(user, res){
    userDao.User_UpdateByUserSession(user, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function User_CheckUserExpire(session_id, res){
    userDao.User_CheckUserExpire(session_id, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(new ResponseData(200, "Success!", ""));
    });
}

module.exports.user_getRating = user_getRating;
module.exports.User_CheckUserExpire = User_CheckUserExpire;
module.exports.login_firebase = login_firebase;
module.exports.userLogout = userLogout;
module.exports.changePassword = changePassword;
module.exports.updateUserInforById = updateUserInforById;
module.exports.getUserInforById = getUserInforById;
module.exports.getAllUser = getAllUser;
module.exports.checkUserExits = checkUserExits;
module.exports.signup = signup;
module.exports.login = login;
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
module.exports.getUserID=getUserID