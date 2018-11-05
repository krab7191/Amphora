
const axios = require('axios');
const cheerio = require('cheerio');
const { pandoraClient } = require('../controllers/userController');
let stations;

// Defining methods for the userController
module.exports = {
    getStations: (req, res) => {
        console.log("Get stations from apiController");
        pandoraClient.user.getStations().then(st => {
            stations = st.array();
            let stNames = [];
            stations.forEach(station => {
                stNames.push(station.name);
            });
            res.json({ stations: stNames });
        });
    }
};
