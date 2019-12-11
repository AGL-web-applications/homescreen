import { load as load_template } from './templates';
import { homescreen, afmMain } from 'agl-js-api';
import Mustache from 'mustache';

var configjson = require('../config.json');
var template;
var root;
var page = {
    apps: []
};

function show() {
    root.innerHTML = Mustache.render(template, page);
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

            if( internalApp ) {
                page.apps.push({
                    id: internalApp.id,
                    name: internalApp.name,
                    icon: app.icon
                });

                if( app.id === configjson.launch ) {
                    afmMain.start(internalApp.id).then(function(result) {
                        console.log("success: " + result);
                    });
                }
            }

        });

        show();
    });
}

export function start(appId) {
    homescreen.showWindow(appId.split('@')[0]).then(function(result) {
        console.log("success: " + result);
    });
}

export function init(node) {
    load_template('apps.template.html').then(function(result) {
        template = result;
        root = node;
        Mustache.parse(template);
        load_application_list();
    }, function(error) {
        console.error('ERRROR loading main template', error);
    });
}