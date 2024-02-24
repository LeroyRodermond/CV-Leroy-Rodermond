// zorg ervoor dat er een random getal geprint wordt op het scherm wanneer je op verstuur drukt
// een random getal van 6 cijfers of letters dus random getallen / woorden zoals: 28Av4c
// die de gebruiker daarna moet invoeren om de mail te versturen

// Functie om een willekeurige CAPTCHA te genereren
function generateCaptcha() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var captcha = '';
    for (var i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
}

// Functie om de CAPTCHA weer te geven
function displayCaptcha() {
    var captcha = generateCaptcha();
    var captchaDisplay = document.getElementById('captchaDisplay');
    captchaDisplay.innerHTML = 'Voer de volgende CAPTCHA in: <strong>' + captcha + '</strong>';
    // Sla de gegenereerde CAPTCHA op in een verborgen veld zodat je deze kunt controleren wanneer het formulier wordt verzonden
    document.getElementById('captchaInput').setAttribute('data-correct-captcha', captcha);
}

// Roep de displayCaptcha functie aan wanneer het formulier wordt geladen
window.onload = function() {
    displayCaptcha();
};

function onSubmit(event) {
    event.preventDefault();
    var form = document.querySelector('.form-contactpagina');
    var captchaInput = document.getElementById('captchaInput').value;
    var correctCaptcha = document.getElementById('captchaInput').getAttribute('data-correct-captcha');
    
    if (captchaInput.toLowerCase() === correctCaptcha.toLowerCase()) {
        // CAPTCHA correct, het formulier versturen
        alert("Captcha is correct! Formulier wordt verzonden.");
        form.reset(); // Het formulier wordt geleegd
        displayCaptcha(); // Een nieuwe CAPTCHA wordt gegenereerd
    } else {
        // CAPTCHA onjuist, toont foutmelding 
        alert("Onjuiste CAPTCHA, probeer opnieuw!");
        // Genereer een nieuwe CAPTCHA
        displayCaptcha();
    }
}