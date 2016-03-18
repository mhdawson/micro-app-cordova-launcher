# Work in progress

Some notes for now

// create the project
<PRE>
cordova create launcher com.devrus.launcher "Micro App Launcher"
cd launcher
</PRE>

// add required platforms
<PRE>
cordova platform add android
</PRE>


// add required plugins

// in order to enable file functionality
<PRE>
cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git
</PRE>

// patch in order to allow server certificates that are not verified 

// only do this for development

// from http://ivancevich.me/articles/ignoring-invalid-ssl-certificates-on-cordova-android-ios/
<PRE>
patch platforms/android/CordovaLib/src/org/apache/cordova/engine/SystemWebViewClient.java <allowServers.patch
</PRE>

<PRE>
rm contents of www
copy contents of www from this github project to launcher/www
copy config.xml from github project to launcher directory
</PRE>

cordova run

