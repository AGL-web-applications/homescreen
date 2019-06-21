import Mustache from 'mustache';

var host = document.location.hostname;
var port = document.location.port;
var args = new URLSearchParams(document.location.search.substring(1));
var token = args.get("x-afb-token") || args.get("token") || "HELLO";
var afb;
var template;

function log(smgs) {
    document.getElementById('log').innerHTML += '<div>'+smgs+'</div>';
}

function getIcon(app) {
    if( app.icon.match(/^.*\.svg$/) ) {
        return '/icons/'+app.id;
    } else {
        return '/images/noicon.svg';
    }
}

function display_applications(apps) {
    var appContainer = document.getElementById('AppContainer');
    for( var i=0; i<apps.length; i++) {
        apps[i].icon = getIcon(apps[i]);
        appContainer.innerHTML += Mustache.render(template, apps[i]);
    }
}

function load_application_list() {
    var ws = new afb.ws(function() {
        var api_verb = "afm-main/runnables";
        ws.call(api_verb, {}).then(
            function(obj) {
                display_applications(obj.response);
            },
            function(obj) {
                //TODO Manage errors
                log("failure");
            }
        );
    },
    function() {
        //TODO manage errors
        log("ws aborted");
    });
}

export function launch(app) {
    var appId = app.getAttribute('app-id');
    var ws = new afb.ws(function() {
        var api_verb = "afm-main/start";
        var request = {id: appId};
        ws.call(api_verb, request).then(
            function(obj) {
                log("success: " + obj.response);
            },
            function(obj) {
                //TODO Manage errors
                log("failure");
            }
        );
    },
    function() {
        //TODO Manage errors
        log("ws aborted");
    });
}

export function init() {
    template = document.getElementById('item-template').innerHTML;
    Mustache.parse(template);

    // host: "raspberrypi3.local:31022",
    afb = new AFB({
        host: host+":"+port,
        token: token
    });
    load_application_list();
}