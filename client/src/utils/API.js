
// Pandora API calls
import axios from "axios";



export default {
    getStations: function () {
        return axios.get('/api/stations');
    },
    getSongs: function (name) {
        return axios.get('/api/songs/' + name);
    }
};
