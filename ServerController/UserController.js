var connection = require('../DatabaseConnection/MysqlConnection');
var userDao = require('../DAO/UserDAO');
var sessionDao = require('../DAO/SessionDAO');
var ResponseData = require('../DAO/ResponseData');
var md5 = require('../Library/MD5');
connection.connect();
//Sign up
function signup(user, res) {
    var err = new ResponseData(701, "Tên đăng ký đã tồn tại", "");
    var success = new ResponseData(200, "Đăng ký thành công", "");
    userDao.checkUserExits(user.username, connection, function (response) {
        if (response == 200) {
            userDao.insertUser(user, connection, function (response) {
                if (response != 701) {
                    userDao.insertUserSession(response, connection, function (response) {
                        if (response == 200) {

                            res.json(success);
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
function updateUserInforById(session_id, user, res) {
    userDao.updateUserInfo(session_id, user, connection, function (response) {
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

//DungNS 11-9-2016

function User_Delete(userid, res){
    userDao.User_Delete(userid, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function User_Filter(userid, firstName, lastName, userName, birthDay, phone, isDeleted,
        createDate, res){
    userDao.User_Filter(userid, firstName, lastName, userName, birthDay, phone, isDeleted,
            createDate, connection, function(response) {
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

function User_Insert(userid, firstName, lastName, userName, mail, birthDay, phone, password, isDeleted,
        isActive, createDate, res){
    userDao.User_Insert(userid, firstName, lastName, userName, mail, birthDay, phone, password, isDeleted,
        isActive, createDate, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function User_Update(userid, firstName, lastName, userName, mail, birthDay, phone, password, isDeleted,
        isActive, createDate, res){
    userDao.User_Update(userid, firstName, lastName, userName, mail, birthDay, phone, password, isDeleted,
            isActive, createDate, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function User_UpdateByUserSession(session_id, firstName, lastName, userName, mail, birthDay, phone, password,
        isDeleted, isActive, createDate, res){
    userDao.User_UpdateByUserSession(session_id, firstName, lastName, userName, mail, birthDay, phone, password,
            isDeleted, isActive, createDate, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

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