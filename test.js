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
        to: 'viet.ptit.17@gmail.com,Tung.ars150293@gmail.com',
        subject: 'BooxTown - New Password',
        text: 'Your new password is: 12312312312'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        console.log('success');

    });
}catch (e)
{
    console.log(e);
}