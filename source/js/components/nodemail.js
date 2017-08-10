const nodemailer = require('nodemailer');

const router = express.Router();
app.use('/sayHello', router);
router.post('/', handleSayHello); // handle the route at yourdomain.com/sayHello



function handleSayHello(req, res) {
    // Not the movie transporter!
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'merkursajt2017@gmail.com', // Your email id
            pass: 'paranoja88!' // Your password
        }
    });
}

const text = 'Hello world from \n\n';

const mailOptions = {
    from: 'merkursajt2017@gmail.com', // sender address
    to: 'borisic.nikola@yahoo.com', // list of receivers
    subject: 'Email Example', // Subject line
    text: text //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});
