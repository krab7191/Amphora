
const { pandoraClient } = require('../controllers/userController');
let stations;
let songs;

// These methods interact with the Pandora API
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
    },
    getSongs: (req, res) => {
        const { name } = req.params;
        console.log("Get songs from apiController");
        console.log(name);
        // Get the station associated with the incoming station name
        const station = stations.find(sta => sta.name === name);
        station.getSongList(true).then(results => {
            songs = results;
            const songDetails = extractSongMetadata();
            // console.log(songDetails);
            res.json({ songs: songDetails });
        }).catch((err) => {
            console.log(`Error getting songs: ${err}`);
        });
    }
};

extractSongMetadata = () => {
    let s = [];
    songs.forEach(song => {
        s.push({
            title: song.title,
            length: song.length,
            audioURL: song.audioURL,
            artist: song.artist.name,
            album: song.album.title,
            art: song.album.art
        });
    });
    return s;
}