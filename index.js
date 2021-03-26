const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const nodemailer = require('nodemailer');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', function (req,res){
  res.send('Hello World!');
});

app.post('/mailgun', function (req, res){
  var { host, port, fromEmail, pass, toEmail, title, message, content } = req.body;
    
  let transporter = nodemailer.createTransport({
    host: `${host}`,
    port: `${port}`,
    secure: true,
    auth: {
      user: `${fromEmail}`,
      pass: `${pass}`
    }
  });

  transporter.sendMail({
    from: `Nao responda <${fromEmail}>`,
    to: `${toEmail}`,
    subject: `${title}`,
    text: `${message}`,
    html: `${content}`
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
  res.sendStatus(200);
});

app.listen(3000,() => {
    console.log('Server On');
});