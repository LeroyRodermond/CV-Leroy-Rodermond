const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware om JSON en URL-encoded body's te verwerken
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Stel e-mailconfiguratie in
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jouw_email@gmail.com', // Voeg hier je e-mailadres in
        pass: 'jouw_wachtwoord' // Voeg hier je wachtwoord in
    }
});

// Route voor het verwerken van het contactformulier
app.post('/contact', (req, res) => {
    const { firstname, lastname, email, telefoonnummer, onderwerp, bericht } = req.body;

    // Bouw het e-mailbericht
    const mailOptions = {
        from: 'jouw_email@gmail.com',
        to: 'l.g.h.rodermond@gmail.com',
        subject: 'Nieuw bericht van contactformulier',
        text: `
            Naam: ${firstname} ${lastname}
            E-mail: ${email}
            Telefoonnummer: ${telefoonnummer}
            Onderwerp: ${onderwerp}
            
            Bericht:
            ${bericht}
        `
    };

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
});

// Start de server
app.listen(port, () => {
    console.log(`Server gestart op http://localhost:${port}`);
});