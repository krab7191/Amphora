
// Require the stuff to handle Pandora's API requests
const cookie = require('cookie');
const axios = require('axios');
const CustomStrategy = require("passport-custom").Strategy;

let csrfToken;
let csrftokenCookie;

const pandoraStrategy = new CustomStrategy((req, done) => {

    makeHeadRequest(req, done);
})

// Make a HEAD request to the root domain to save the CSRF token cookie
makeHeadRequest = (req, done, callback) => {
    axios.head("https://pandora.com").then(resp => {
        csrftokenCookie = resp.headers['set-cookie'];
        csrfToken = parseCookie(resp.headers['set-cookie']);
    }).catch(err => {
        log(err);
    });
}

// Get the csrfToken value from the response header
parseCookie = header => {
    console.log("Parsing cookie");
    const csrfToken = header[1].split(";")[0];
    const csrfTokenValue = csrfToken.substring(csrfToken.indexOf("=") + 1, csrfToken.length);
    return csrfTokenValue;
}



module.exports = pandoraStrategy;