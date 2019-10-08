import { afmMain } from 'agl-js-api';
import Mustache from 'mustache';

var configjson = require('../config.json');
var template;
var parent;

function renderApp(app) {
    parent.innerHTML = Mustache.render(template, app) + parent.innerHTML;
}

function locateApp(appId, appList) {
    return appList.find(function(app){
        return app.id.split('@')[0] === appId
    });
}

function load_application_list() {
    afmMain.runnables().then(function(result) {
        configjson.apps.forEach(function(app) {
            var internalApp = locateApp(app.id, result);

            renderApp({
                id: internalApp.id,
                name: internalApp.name,
                icon: app.icon
            });
        });
    });
}

export function start(node) {
    var appId = node.getAttribute('app-id');
    afmMain.start(appId).then(function(result) {
        console.log("success: " + result);
    });
}

export function init() {
    template = document.getElementById('app-template').innerHTML;
    parent = document.getElementById('app-template').parentNode
    Mustache.parse(template);
    load_application_list();
}