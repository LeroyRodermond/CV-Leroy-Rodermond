const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require("dotenv").config();


const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Middleware om JSON en URL-encoded body's te verwerken





// Route voor het verwerken van het contactformulier
app.post('/contact', async (req, res) => {
    const { firstname, lastname, email, telefoonnummer, onderwerp, bericht } = req.body;


    const transporter = nodemailer.createTransport({
        // Stel e-mailconfiguratie in
          service: 'gmail',
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
          }
      });

      
    // Bouw het e-mailbericht
    const mailOptions = {
        from: `"${firstname}, ${lastname}"`,
        to: 'l.g.h.rodermond@gmail.com',
        subject: `${onderwerp}`,
        text: `
            Naam: ${firstname} ${lastname}
            E-mail: ${email}
            Telefoonnummer: ${telefoonnummer}
            Onderwerp: ${onderwerp}
            
            Bericht:
            ${bericht}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email succes");
        res.send("succsess")
    } catch(error) {
        console.error(error);
    }

/*
    // Verstuur de e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Er is een fout opgetreden bij het versturen van het bericht.');
        } else {
            console.log('E-mail verzonden: ' + info.response);
            res.send('Bericht is verzonden!');
        }
    });
    */
});

// Start de server
app.listen(port, () => {
    console.log(`Server gestart op http://localhost:${port}`);
});