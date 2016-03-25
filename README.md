# micro-app-cordova-launcher

I've been building a number of small applications that capture/display
data from sensors, interact with the outside world, or just provide
some small service like displaying timezones for members in the teams
I work with.

The applications are built with [Node.js](https://nodejs.org/en/) with
the GUI being able to be run remotely in a web browwer.  You can learn
more by reading up on the micro-app framework [here]
(https://github.com/mhdawson/micro-app-framework).

While its nice to be able to run the applications remotely using 
a browser from any machine sometimes you want the look and feel of
a native application either on your workstation or mobile device.

This project [micro-app-electron-launcher]
(https://github.com/mhdawson/micro-app-electron-launcher) works
with the framework to provide native look and feel for linux,
windows (and mac, but I've not tested that) along with some
nice options like being able to open multiple apps and position
them on your desktop easily.

This project rounds things out by using
[cordova](https://cordova.apache.org/) in order to allow
you do deploy the applications as a native application on your
mobilde device.  So far I've only tested on Android but since
cordova supports iphones it should work there as well.

Using this project you can build a native package (ex apk
for android that supports one or more micro-apps).

This screenshot shows the native app on the main page for my
phone:

![phone-main-page](https://raw.githubusercontent.com/mhdawson/micro-app-cordova-launcher/master/pictures/phone-app-display.jpg)


The following are screenshots of a number of the apps running
on my phone:

![alert-dashboard](https://raw.githubusercontent.com/mhdawson/micro-app-cordova-launcher/master/pictures/phone-alert-dashboard.jpg)

![dialer](https://raw.githubusercontent.com/mhdawson/micro-app-cordova-launcher/master/pictures/phone-dialer.jpg)

![house-dashboard](https://raw.githubusercontent.com/mhdawson/micro-app-cordova-launcher/master/pictures/phone-house-dashboard.jpg)

![timezones](https://raw.githubusercontent.com/mhdawson/micro-app-cordova-launcher/master/pictures/phone-timezones.jpg)


# Configuration

The micro-apps to be supported by the native application are configured
through a config.json file wihthin the www directory for the cordova
project.

The native application can be configured to support one or
more micro-apps.  If more than one is configured then 
there will be a row of buttons across the top that can 
be used to select the current micro-app GUI to display. In
addition, you can swipe left or right on the buttons to move
between the apps in a sequential manner.

The configuration file shares the same format with the
[micro-app-electron-launcher](https://github.com/mhdawson/micro-app-electron-launcher)
project so you can easily configure your apps across your
workstation/mobile devices.  

For example this is one of my configuration files
(with some sensitive parts masked out) :

<PRE>
{ "apps": [
    { "name": "home",
      "hostname": "X.X.X.X",
      "port": "8081"
    },
    { "name": "cottage",
      "hostname": "X.X.X.X",
      "port": "8081"
    },
    { "name": "phone",
      "hostname": "X.X.X.X",
      "port": "8083"
    },
    { "name": "Alert",
      "hostname": "X.X.X.X",
      "port": "8084",
      "options": { "x": 3065, "y": 10, "sizable": false }
    },
    { "name": "timezones",
      "hostname": "X.X.X.X",
      "port": "80",
      "options": { "x": 2750, "y": 10, "sizable": false }
    },
    { "name": "totp",
      "tls": true,
      "hostname": "X.X.X.X",
      "port": "8082",
      "auth": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "options": { "x": 2920, "y": 10, "sizable": false }
    }
  ]
}
</PRE>

In order to be compatible with the configuration files for the
[micro-app-electron-launcher](https://github.com/mhdawson/micro-app-electron-launcher)
project it ignores unsupported parameters.  For example, in the
configuration file above, options is a value not supported by the
cordova launcher so it is simply ignored.


The values you can configure for each micro-app are as follows:

* name - any name you want to assign to the entry
* hostname - hostname where the micro-app is running
* port - port on which micro-app is listening
* tls - true if the micro-app requires tls for connections,
        false othewise
* auth - if the micro-app requires authentication then you
         must provide the password for the micro-app
         encrypted using the enc_config_value.js utility.
         (see below).  When you start native application
         you will be prompted for the password used to
         generate the key for the encryption. 

The script lib/enc_config_value.js from the
https://github.com/mhdawson/micro-app-electron-launcher
project can be used to encrypt a configuration value
as follows:

<PRE>
node lib/enc_config_value.js value mypassword
</PRE>

The value provided for 'value' should be the username and password required
by the micro-app separated by a ':' character.  For example:

<PRE>
node lib/enc_config_value.js "user1:pass1" mypassword
</PRE>

The authentication page will only be shown if one
or more of the configured applications requires
authentication.  The screen is as follows:

![authscreen](https://raw.githubusercontent.com/mhdawson/micro-app-cordova-launcher/master/pictures/phone-auth.jpg)


# Building

