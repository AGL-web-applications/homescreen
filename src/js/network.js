import { load as load_template } from './templates';
import { network } from 'agl-js-api';
import Mustache from 'mustache';

var configjson = require('../config.json');
var template;
var root;
var page = {
    items: [],
    icon: function() {
        return configjson.network[this.technology];
    }
};

function show() {
    root.innerHTML = Mustache.render(template, page);
}

function load_network_state() {
    network.technologies().then(function(result) {
        page.items = result.values;
        show();
    });

}

export function init(node) {
    load_template('network.template.html').then(function(result) {
        template = result;
        root = node;
        Mustache.parse(template);
        load_network_state();
    }, function(error) {
        console.error('ERRROR loading main template', error);
    });

    network.on_global_state(function(result) {
        console.log('GLOBAL SATATE', result);
    });
}