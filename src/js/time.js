import { load as load_template } from './templates';
import Mustache from 'mustache';

var template;
var root;
var page = {
    date: {
        day: '',
        hour: ''
    },
    weather: {
        icon: 'fas fa-cloud-sun-rain',
        temperature: '20ºC'
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

function initInterval() {
    setInterval(function() {
        var date = new Date();
        page.date.day = days[date.getDay()],
        page.date.hour = formatAMPM(date);
        show();
    }, 1000);
}

export function init(node) {
    load_template('time.template.html').then(function(result) {
        template = result;
        root = node;
        Mustache.parse(template);
        initInterval();
    }, function(error) {
        console.error('ERRROR loading main template', error);
    });
}