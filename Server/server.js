const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require("dotenv").config();


const app = express();
const port = 3000; // Server gestart op http://localhost:3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
        from: `"${email}, ${firstname}, ${lastname}"`,
        to: 'lrondersteuning@gmail.com',
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
        res.status(500).send("Er is een fout opgetreden bij het verzenden van het formulier.");
    }
 });
// Start de server
app.listen(port, () => {
    console.log(`Server gestart op http://localhost:${port}`);
});

