var Clay = require('pebble-clay');
var clayConfig = require('./config');
var customClay = require('./custom-clay');
var clay = new Clay(clayConfig, customClay, { autoHandleEvents: false });



var xhrRequest = function (url, type, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        callback(this.responseText);
    };
    xhr.open(type, url);
    xhr.send();
};

function locationSuccess(pos) {
    console.log("locationSuccess");

    if (localStorage.getItem("var_mms_server")) {
        console.log("CAT " + localStorage.getItem("var_mms_server"));
    
        var i = (localStorage.getItem("var_mms_server") + '').indexOf("openweathermap", 0);
        if (i === -1 ? false : true) {
            openweathermap(pos);
        }
        else {
            console.log("error. not getting weather 1");
        }
    }
    else {
        console.log("error. not getting weather 2");
    }
}



function openweathermap(pos) {
    console.log("Getting weather from OpenWeatherMap");
    var apikey = localStorage.getItem("var_mms_openweathermap_api_key");
    if (apikey && apikey != "undefined" && '' !== apikey) {
        openweathermapWithKey(pos, apikey);
    }
    else {
        var url = "http://pebble.itigor.com/make-me-smile/tools.php?get_openweathermap_apikey";

        xhrRequest(url, 'GET', function(responseText) {
            var apikey = false;
            // responseText contains a JSON object
            var json = JSON.parse(responseText);

            if (json.apikey) {
                apikey = json.apikey;
            }

            openweathermapWithKey(pos, apikey);
        });
    }
}

function openweathermapWithKey(pos, apikey) {
    var temperature_format = "metric";
    if (localStorage.getItem("var_mms_temperature_scale")) {
        var i = (localStorage.getItem("var_mms_temperature_scale") + '').indexOf("fahrenheit", 0);
        if (i === -1 ? false : true) {
            temperature_format = "imperial";
        }
    }

    // Construct URL
    var url = "",
        urlMain = "http://api.openweathermap.org/data/2.5/";
    if (localStorage.getItem("var_mms_custom_location")) {
        url = urlMain+"weather?q=" + encodeURIComponent(localStorage.getItem("var_mms_custom_location"));
    }
    else {
        url = urlMain+"weather?lat=" + pos.coords.latitude + "&lon=" + pos.coords.longitude;
    }
    url += '&units='+temperature_format;

    if (apikey) {
        url += '&APPID='+apikey;
    }

    // Send request to OpenWeatherMap
    xhrRequest(url, 'GET', function(responseText) {
        if (typeof(responseText) == "undefined" || responseText.indexOf("failed to connect") >= 0) {
            console.log(new Date() + " - No response from weather server. One more try.");
            getLocation(pos);
        }
        else {
            // responseText contains a JSON object with weather info
            var json = JSON.parse(responseText);

            var conditions_id = 0;
            var temperature = "N/A";
            var humidity = "N/A";

            if (parseInt(json.cod) != 404) {
                temperature = Math.round(json.main.temp)+"°";
                humidity = Math.round(json.main.humidity);

                // Conditions
                conditions_id = getConditionsId(json.weather[0].icon, json.weather[0].id);
            }

            // Assemble dictionary using our keys
            var dictionary = {
                "TEMPERATURE": temperature,
                "CONDITIONS": conditions_id,
                "HUMIDITY": humidity,
            };

            // Send to Pebble
            Pebble.sendAppMessage(
                dictionary,
                function(e) {
                    console.log("Weather info sent to Pebble successfully!");
                },
                function(e) {
                    console.log("Error sending weather info to Pebble!");
                }
            );
        }
    });
}

function getConditionsId(icon, conditions_id) {
    if (!icon.localeCompare("01d") || conditions_id == 904) {
        conditions_id = 1010;
    }
    else if (!icon.localeCompare("01n")) {
        conditions_id = 1020;
    }
    else if (!icon.localeCompare("02d")) {
        conditions_id = 1110;
    }
    else if (!icon.localeCompare("02n")) {
        conditions_id = 1120;
    }

    return conditions_id;
}

function locationError(err) {
    console.log("Error requesting location!");
    console.warn('location error: ' + err.code + ' - ' + err.message);
}

function getWeather() {
    if (localStorage.getItem("var_mms_custom_location")) {
        locationSuccess(false);
    }
    else {
        navigator.geolocation.getCurrentPosition(
            locationSuccess,
            locationError,
            {timeout: 15000, maximumAge: 2100000}
        );
    }
}

function getPlatform() {
    var platform = 'aplite';
    if(Pebble.getActiveWatchInfo) {
        // Available for use!
        var watch = Pebble.getActiveWatchInfo();
        platform = watch.platform;
    }

    return platform;
}


// Listen for when the watchface is opened
Pebble.addEventListener('ready', function(e) {
    console.log("PebbleKit JS ready!");

    // Get the initial weather
    getWeather();
});


/*
// Listen for when an AppMessage is received
Pebble.addEventListener('appmessage', function(e) {
    console.log("AppMessage received!");
    getWeather();
});
*/


Pebble.addEventListener('showConfiguration', function(e) {
    Pebble.openURL(clay.generateUrl());
});

Pebble.addEventListener('webviewclosed', function(e) {
    if (e && e.response) {
        console.log('ROB 1: ');
        var configurations = clay.getSettings(e.response, false);
        var platform = getPlatform();

        console.log('ROB 4: ' + JSON.stringify(configurations));

        //localStorage.setItem("var_mms_custom_location", configurations.location);
        localStorage.setItem("var_mms_temperature_scale", configurations.temperature_scale.value);
        localStorage.setItem("var_mms_bluetooth", configurations.bluetooth.value);
        localStorage.setItem("var_mms_battery", configurations.battery.value);
        localStorage.setItem("var_mms_server", configurations.server.value);
        localStorage.setItem("var_mms_background_auto", configurations.background_auto.value);
        localStorage.setItem("var_mms_background_color_"+platform, configurations.background_color.value);
        localStorage.setItem("var_mms_hourly_beep", configurations.hourly_beep.value);
        localStorage.setItem("var_mms_dnd", configurations.dnd.value);
        localStorage.setItem("var_mms_dnd_start", configurations.dnd_start.value);
        localStorage.setItem("var_mms_dnd_end", configurations.dnd_end.value);
        localStorage.setItem("var_mms_hour_lead_zero", configurations.hour_lead_zero.value);
        localStorage.setItem("var_mms_day_of_week_humidity", configurations.day_of_week_humidity.value);
        localStorage.setItem("var_mms_openweathermap_api_key", configurations.openweathermap_api_key.value);

        var settings = {
            "BLUETOOTH"      : configurations.bluetooth.value,
            "BATTERY"        : configurations.battery.value == "battery_always",
            "HOURLY_BEEP"    : configurations.hourly_beep.value,
            "DND"            : configurations.dnd.value,
            "HOUR_LEAD_ZERO" : configurations.hour_lead_zero.value,
            "SHOW_HUMIDITY"  : configurations.day_of_week_humidity.value == "show_humidity",
        };

        var dnd_start = parseInt(configurations.dnd_start.value);
        var dnd_end = parseInt(configurations.dnd_end.value);
        if (configurations.dnd.value) {
            if (isNaN(dnd_start) || isNaN(dnd_end)) {
                dnd_start = 0;
                dnd_end = 0;
            }
            settings.DND_START = dnd_start;
            settings.DND_END = dnd_end;
        }

        if (configurations.background_auto.value == "auto") {
            settings.SCREEN_COLOR = "auto";
        } else {
            settings.SCREEN_COLOR = configurations.background_color.value.toString(16).toUpperCase();
        }

        console.log('ROB 5: ' + settings.SCREEN_COLOR);


        Pebble.sendAppMessage(
            settings,
            function(e) {
                console.log("Configurations sent to Pebble successfully!");
            },
            function(e) {
                console.log("Error sending configurations to Pebble!");
            }
        );
    }
    else {
        console.log('Configuration canceled');
    }
});