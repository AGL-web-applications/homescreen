import { homescreen, afmMain } from 'agl-js-api';

var configjson = require('../config.json');

export function load() {
    afmMain.start(configjson.background).then(function(result) {
        console.log("loading background: " + result);
    });
}


