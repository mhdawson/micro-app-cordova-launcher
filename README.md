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

