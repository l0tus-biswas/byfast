const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

const port = process.env.PORT || 3000;
const dbURI = process.env.DB_URI;

// Connect to the database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Error connecting to the database:', err);
  });

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Send Mail
app.post('/send-email', (req, res) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
  
    const mailOptions = {
      from: 'RequestTalk <requesttalkservice@gmail.com>',
      to: 'lotushotmail111@gmail.com',
      subject: 'Welcome to the team!',
      html: req.body.template
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent: ' + info.response);
      }
    });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
