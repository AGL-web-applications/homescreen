import Mustache from 'mustache';

var template;

var days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

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
        document.getElementById('timeContainer').innerHTML = Mustache.render(template, {
            day: days[date.getDay()],
            hour: formatAMPM(date)
        });
    }, 1000);
}

export function init() {
    template = document.getElementById('time-template').innerHTML;
    Mustache.parse(template);

    initInterval();
}