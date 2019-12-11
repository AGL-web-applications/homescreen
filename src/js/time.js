import { load as load_template } from './templates';
import Mustache from 'mustache';
import { weather } from 'agl-js-api';

var template;
var root;
var counter = 0;
var interval;
var updateTime = 10000;
var page = {
    date: {
        day: '',
        hour: ''
    },
    weather: undefined,
    showTemperature: function() {
        return counter%5 === 0;
    },
    showWind: function() {
        return counter%5 === 1;
    },
    showPosition: function() {
        return counter%5 === 2;
    },
    showHumidity: function() {
        return counter%5 === 3;
    },
    showDescription: function() {
        return counter%5 === 4;
    }
}

var days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

function show() {
    root.innerHTML = Mustache.render(template, page);
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function update() {
    var date = new Date();
    page.date.day = days[date.getDay()],
    page.date.hour = formatAMPM(date);
    if( counter === 0 || !page.weather) {
        weather.current_weather().then(function(result) {
            page.weather = result;
            show();
        }, function(error) {
            console.error(error);
            show();
        });
    } else {
        show();
    }
    counter = (counter+1) % Math.floor(300000/updateTime);
}

function initInterval() {
    clearInterval(interval);
    interval = setInterval(update, updateTime);
}

export function init(node) {
    load_template('time.template.html').then(function(result) {
        template = result;
        root = node;
        Mustache.parse(template);
        update();
        initInterval();
    }, function(error) {
        console.error('ERRROR loading main template', error);
    });
}

export function refresh() {
    clearInterval();
    counter = 0;
    update();
    initInterval();
}