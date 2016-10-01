var randomstring = require("randomstring");
var connection = require('../DatabaseConnection/MysqlConnection');
var ResponseData = require('../DAO/ResponseData');
function sendEmailToRestorePassword(email,res) {
    var password = randomstring.generate(7);
    var error = new ResponseData(701,"Cập nhật mật khẩu mới thất bại","");
    var success = new ResponseData(200,"Cập nhật mật khẩu mới thành công","");
    connection.query("CALL sp_restoreNewPassword('"+email+"','"+ password +"')", function(err, rows) {
        if(err) {
            res.json(error);
        }

        try{
            var username = rows[0][0].username;
            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'viet.ptit.17@gmail.com',
                    pass: 'ohmygod17'
                }
            });

            var mailOptions = {
                from: 'viet.ptit.17@gmail.com',
                to: email,
                subject: 'BooxTown - New Password',
                text: 'Your new password is: '+password
            };

            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    res.json(error);
                }
                res.json(success);

            });
        }catch (e)
        {
            res.json(error);
        }


    });

}

function inviteFriend(email,res) {
    var error = new ResponseData(701,"Failed","");
    var success = new ResponseData(200,"Success","");
    try{
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'viet.ptit.17@gmail.com',
                pass: 'ohmygod17'
            }
        });

        var mailOptions = {
            from: 'viet.ptit.17@gmail.com',
            to: email,
            subject: 'BooxTown - Invite',
            text: 'I want to invite you'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                res.json(error);
            }
            res.json(success);

        });
    }catch (e)
    {
        res.json(error);
    }
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

module.exports.inviteFriend = inviteFriend;
module.exports.sendEmailToRestorePassword = sendEmailToRestorePassword;

