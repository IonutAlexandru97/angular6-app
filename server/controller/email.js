var nodeMailer = require('nodemailer');

module.exports.sendMail = (req, res, next) => {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ionutalexandru618@gmail.com',
            pass: 'subatomizat12345'
        }
    });

    let mailOptions = {
        to: 'ionut_alexandru.candea@yahoo.com',
        subject: req.body.subject,
        text: req.body.message
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log(error);
        }
        console.log ('Message %s sent:  %s', info.messageId, info.response);
        res.end();
    });
}
