var FCM = require('fcm-node');
var connection = require('../DatabaseConnection/MysqlConnection');
var ResponseData = require('../DAO/ResponseData');
var userDao = require('../DAO/UserDAO');
var notifiDAO = require('../DAO/NotifiDAO');
var serverKey = 'AIzaSyC0AvWA0n_jQjy_zIhiUXKy8CB0p_QCEsA';
var notifiController = require('../ServerController/NotificationController');
var MD5 = require('../Library/MD5');
var fcm = new FCM(serverKey);
function sendMessageToUser(deviceId, message) {
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: deviceId,
        collapse_key: 'your_collapse_key',

        notification: {
            title: 'Booxtown Notification',
            body: message
        },

        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };

    fcm.send(message, function (err, response) {
        if (err) {
            // console.log("Something has gone wrong!");
        } else {
            //console.log("Successfully sent with response: ", response);
        }
    });
}

function sendMessageToUserKey(deviceId, message, key_screen, id_screen, title, notifi_id) {
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: deviceId,
        collapse_key: 'your_collapse_key',

        notification: {
            title: title,
            body: message
        },

        data: {  //you can send only notification or only data(or include both)
            key_screen: key_screen,
            id_screen: id_screen,
            notification_id: notifi_id
        }
    };

    fcm.send(message, function (err, response) {
        if (err) {
            // console.log("Something has gone wrong!");
        } else {
            //console.log("Successfully sent with response: ", response);
        }
    });
}
function sendMultiUser(result, res) {
    var taget_id = '_';
    var content;
    var title;
    var key_screen;
    for (var i = 0; i < result['notification_list'].length; i++) {
        var bit = result['notification_list'][i];
        taget_id = taget_id + bit.user_id + '_';
        if (i == 0) {
            content = bit.messages;
            title = bit.title_notifi;
            key_screen = bit.key_screen;
        }
        userDao.getTokenForUser(bit.user_id, connection, function (response) {
            if (response != 701) {
                sendMessageToUser(response.session_id, bit.messages);
            }
            else {
                res.json(new ResponseData(701, "Session ID không tồn tại", ""));
            }
        });
    }
    ;
    notifiController.Notification_Insert(taget_id, content, title, key_screen, res);
    res.json(new ResponseData(200, "Success!", ""));
}

function sendMultiUserKey(result, res) {
    var taget_id = '_';
    var content;
    var title;
    var key_screen;
    var id_screen;
    console.log(result);
    for (var i = 0; i < result['notification_list'].length; i++) {
        var bit = result['notification_list'][i];
        taget_id = taget_id + bit.user_id + '_';
        if (i == 0) {
            content = bit.messages;
            title = bit.title_notification;
            key_screen = bit.key_screen;
            id_screen = bit.id_screen;
        }
    }
    var s_id = MD5.getMD5ByTime("");

    notifiController.Notification_Insert(taget_id, content, title, key_screen, id_screen, s_id, res);
    var notifi_id;
    notifiDAO.getNotifiID(s_id, connection, function (response) {
        if (response != 701) {
            notifi_id = response.id;
            for (var i = 0; i < result['notification_list'].length; i++) {
                var bit = result['notification_list'][i];
                userDao.getTokenForUser(bit.user_id, connection, function (response) {
                    if (response != 701) {
                        sendMessageToUserKey(response.session_id, bit.messages, bit.key_screen, bit.id_screen, bit.title_notifi, notifi_id);
                    }
                    else {
                        res.json(new ResponseData(701, "Session ID không tồn tại", ""));
                    }
                });
            }
            ;
        }
        else {
            //res.json(new ResponseData(701, "Session ID không tồn tại", ""));
        }
    });
    res.json(new ResponseData(200, "Success!", ""));
}
function sendMultiUserKeyIOS(result, res) {
    var taget_id = '_';
    var content;
    var title;
    var key_screen;
    var id_screen;
    taget_id = '_' + result.user_id + '_';
    content = result.messages;
    title = result.title_notification;
    key_screen = result.key_screen;
    id_screen = result.id_screen;

    var s_id = MD5.getMD5ByTime("");

    notifiController.Notification_Insert(taget_id, content, title, key_screen, id_screen, s_id, res);
    var notifi_id;
    notifiDAO.getNotifiID(s_id, connection, function (response) {
        if (response != 701) {
            notifi_id = response.id;
            userDao.getTokenForUser(result.user_id, connection, function (response) {
                if (response != 701) {
                    sendMessageToUserKey(response.session_id, result.messages, result.key_screen, result.id_screen, result.title_notifi, notifi_id);
                }
                else {
                    res.json(new ResponseData(701, "Session ID không tồn tại", ""));
                }
            });

            ;
        }
        else {
            //res.json(new ResponseData(701, "Session ID không tồn tại", ""));
        }
    });
    res.json(new ResponseData(200, "Success!", ""));
}
//sendMessageToUser("c8OK4uumK1o:APA91bEq4RFzytWa-NvDS3K_dtmhvod-MWueMnGILjkGs_wv6E8B8NRL_UpyY2bMIwheFheiNfrR5wqEe6ERezCxziXZd_ZSdV6O_d0-exQ7s4zstcelfh_nnnLpUg3SlzHPiF-_vuo7","Minh em cố lên =))");
module.exports.sendMultiUserKey = sendMultiUserKey;
module.exports.sendMultiUser = sendMultiUser;
module.exports.sendMessageToUser = sendMessageToUser;
module.exports.sendMultiUserKeyIOS = sendMultiUserKeyIOS;




