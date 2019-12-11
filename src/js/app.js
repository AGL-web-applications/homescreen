import { load as load_template } from './templates';
import * as network from './network';
import * as apps from './apps';
import * as time from './time';
import Mustache from 'mustache';

var template;
var page = {

};

export function show() {
    document.body.innerHTML = Mustache.render(template, page);
    network.init(document.getElementById('NetworkContainer'));
    apps.init(document.getElementById('AppsContainer'));
    time.init(document.getElementById('TimeContainer'));
}

export function init() {
    load_template('main.template.html').then(function(result) {
        template = result;
        Mustache.parse(template);
        show();
    }, function(error) {
        console.error('ERRROR loading main template', error);
    });
}