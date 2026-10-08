module.exports = function(minified) {
    var clayConfig = this;
    var _ = minified._;
    var $ = minified.$;
    var HTML = minified.HTML;

    function togglebackgroundAuto() {
        if (this.get() == "static") {
            clayConfig.getItemByMessageKey('background_color').show();
        } else {
            clayConfig.getItemByMessageKey('background_color').hide();
        }
    }

    function toggleServer() {
        if (this.get() == "openweathermap") {
            clayConfig.getItemByMessageKey('openweathermap_api_key').show();
        } else {
            clayConfig.getItemByMessageKey('openweathermap_api_key').hide();
        }
    }

    function toggleDnd() {
        if (this.get() == true) {
            clayConfig.getItemByMessageKey('dnd_start').show();
            clayConfig.getItemByMessageKey('dnd_end').show();
        } else {
            clayConfig.getItemByMessageKey('dnd_start').hide();
            clayConfig.getItemByMessageKey('dnd_end').hide();
        }
    }

    function toggleHourlyBeep() {
        if (this.get() == true) {
            clayConfig.getItemByMessageKey('dnd').show();
        } else {
            clayConfig.getItemByMessageKey('dnd').hide();
        }
    }


    clayConfig.on(clayConfig.EVENTS.AFTER_BUILD, function() {
        var backgroundAuto = clayConfig.getItemByMessageKey('background_auto');
        togglebackgroundAuto.call(backgroundAuto);
        backgroundAuto.on('change', togglebackgroundAuto);

        var server = clayConfig.getItemByMessageKey('server');
        toggleServer.call(server);
        server.on('change', toggleServer);

        var dnd = clayConfig.getItemByMessageKey('dnd');
        toggleDnd.call(dnd);
        dnd.on('change', toggleDnd);

        var hourlyBeep = clayConfig.getItemByMessageKey('hourly_beep');
        toggleHourlyBeep.call(hourlyBeep);
        hourlyBeep.on('change', toggleHourlyBeep);
    });

};