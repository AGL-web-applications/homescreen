import { network } from 'agl-js-api';
import Mustache from 'mustache';

var configjson = require('../config.json');
var template;

function render_network_item(networkItem) {
    document.getElementById('networkStatusContainer').innerHTML += Mustache.render(template, networkItem);
}

function load_network_state() {
    network.technologies().then(function(result) {
        result.values.forEach(function(networkItem) {
            networkItem.icon = configjson.network[networkItem.technology];
            render_network_item(networkItem);
        });
    });

}

export function init() {
    template = document.getElementById('network-status-template').innerHTML;
    Mustache.parse(template);
    load_network_state();

    network.on_global_state(function(result) {
        console.log('GLOBAL SATATE', result);
    });
}