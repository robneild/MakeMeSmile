module.exports = [
  {
    "type": "heading",
    "defaultValue": "App Configuration"
  },
  {
    "type": "text",
    "defaultValue": "Here is some introductory text."
  },


  {
    "type": "section",
    "items": [

      {
        "type": "radiogroup",
        "messageKey": "temperature_scale",
        "label": "Temperature units",
        "defaultValue": "celsius",
        "options": [
          {
            "label": "Celsius",
            "value": "celsius"
          },
          {
            "label": "Fahrenheit",
            "value": "fahrenheit"
          }
        ]
      }

    ]
  },



  {
    "type": "section",
    "items": [

      {
        "type": "radiogroup",
        "messageKey": "server",
        "label": "Weather service to use",
        "defaultValue": "yahoo",
        "options": [
          {
            "label": "YahooWeather",
            "value": "yahoo"
          },
          {
            "label": "OpenWeatherMap",
            "value": "openweather"
          }
        ]
      },


      {
        "type": "input",
        "messageKey": "openweathermap_api_key",
        "defaultValue": "",
        "label": "OpenWeatherMap API Key",
        "attributes": {
          "placeholder": "api key (optional)"
        }
      }

    ]
  },


  {
    "type": "section",
    "items": [

      {
        "type": "radiogroup",
        "messageKey": "background_auto",
        "label": "Screen background",
        "defaultValue": "auto",
        "options": [
          {
            "label": "Auto",
            "value": "auto"
          },
          {
            "label": "Static",
            "value": "static"
          }
        ]
      },



      {
        "type": "color",
        "messageKey": "background_color",
        "defaultValue": "0xFFFFFF",
        "label": "Color"
      }

    ]
  },



  {
    "type": "section",
    "items": [

      {
        "type": "radiogroup",
        "messageKey": "bluetooth",
        "label": "Bluetooth icon",
        "description": "When would you like to see bluetooth icon?",
        "defaultValue": "on_disconnect",
        "options": [
          {
            "label": "Never",
            "value": "never"
          },
          {
            "label": "On disconnect",
            "value": "on_disconnect"
          },
          {
            "label": "Always",
            "value": "always"
          }
        ]
      },




      {
        "type": "radiogroup",
        "messageKey": "battery",
        "label": "Battery icon",
        "description": "Would you like to see battery icon?",
        "defaultValue":"on_charge",
        "options": [
          {
            "label": "On charge",
            "value": "on_charge"
          },
          {
            "label": "Always",
            "value": "battery_always"
          }
        ]
      },




      {
        "type": "toggle",
        "messageKey": "hour_lead_zero",
        "label": "Hour leading zero",
        "description": "Should leading zero be shown in hours?",
        "defaultValue": true
      },




      {
        "type": "radiogroup",
        "messageKey": "day_of_week_humidity",
        "label": "Humidity or Day of Week",
        "description": "Would you like to see humidity or day of week?",
        "defaultValue": "day_of_week",
        "options": [
          {
            "label": "Day of Week",
            "value": "day_of_week"
          },
          {
            "label": "Humidity",
            "value": "show_humidity"
          }
        ]
      }
    ]
  },


  {
    "type": "section",
    "items": [


      {
        "type": "toggle",
        "messageKey": "hourly_beep",
        "label": "Hourly vibration",
        "description": "Would you like to have your watch vibrate every hour?",
        "defaultValue": false
      },



      {
        "type": "toggle",
        "messageKey": "dnd",
        "label": "Don't disturb",
        "defaultValue": false
      },


      {
        "type": "input",
        "messageKey": "dnd_start",
        "defaultValue": "",
        "label": "Don't disturb start",
        "attributes": {
          "placeholder": "from [0-23]",
          "limit": 2
        }
      },

      {
        "type": "input",
        "messageKey": "dnd_end",
        "defaultValue": "",
        "label": "Don't disturb end",
        "attributes": {
          "placeholder": "till [0-23]",
          "limit": 2
        }
      }

    ]
  },



  {
    "type": "submit",
    "defaultValue": "Save Settings"
  }
];