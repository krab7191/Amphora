
// Require the stuff to handle Pandora's API requests
const cookie = require('cookie');
const axios = require('axios');
const CustomStrategy = require("passport-custom").Strategy;

let csrfToken;

const pandoraStrategy = new CustomStrategy((req, done) => {

    makeHeadRequest();

    // axios.get("").then(resp => {
    //     console.log(resp);
    //     // done(err, user);
    // }).catch((err) => {
    //     console.log(err);
    // });
})

// Make a HEAD request to the root domain to save the CSRF token cookie
makeHeadRequest = callback => {
    axios.head("https://pandora.com").then(resp => {
        csrfToken = parseCookie(resp.headers['set-cookie']);
    }).catch(err => {

    });
}

logger = stuff => {
    console.log(stuff);
}

// Get the csrfToken value from the response header
parseCookie = header => {
    console.log("Parsing cookie");
    const csrfToken = header[1].split(";")[0];
    const csrfTokenValue = csrfToken.substring(csrfToken.indexOf("=") + 1, csrfToken.length);
    return csrfTokenValue;
}



module.exports = pandoraStrategy;