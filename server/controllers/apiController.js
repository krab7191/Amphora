
const { pandoraClient } = require('../controllers/userController');
let stations;
let songs;
let first = true;

// These methods interact with the Pandora API
module.exports = {
    getStations: (req, res) => {
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
        let isFirst;
        const { name } = req.params;
        // Get the station associated with the incoming station name
        const station = stations.find(sta => sta.name === name);
        station.getSongList(first).then(results => {
            // After the first set of songs, pass false (See API docs)
            if (first) {
                first = false;
            }
            songs = results;
            const songDetails = extractSongMetadata();
            res.json({ songs: songDetails });
        }).catch((err) => {
            console.log(`Error getting songs: ${err}`);
            res.json({ error: "Error gettings songs" });
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