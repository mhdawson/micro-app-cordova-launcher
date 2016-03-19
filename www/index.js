// Copyright 2016 the project authors as listed in the AUTHORS file.
// All rights reserved. Use of this source code is governed by the
// license that can be found in the LICENSE file.

const BUTTON_ROW_SIZE = 50;
const FRAME_ADJUST = 10;

function showApp(event) {
  for (var i = 0; i < event.data.config.apps.length; i++) {
    if (event.data.showId !== i) {
      $('#frame' + i).hide();
      $('#framebutton' + i).show();
    } else {
      $('#frame' + i).show();
      $('#framebutton' + i).hide();
    }
  }
}

var decryptConfigValue = function(value, pass) {
  var passphrase = pass + pass;
  return CryptoJS.AES.decrypt(value, passphrase).toString(CryptoJS.enc.Utf8);
}

var config;
function readConfig(launchApps) {
  window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/config.json", function(configFile) {
    configFile.file(function(theFile) {
      var fileReader = new FileReader();
      fileReader.onloadend = function(event)  {
        try { 
          // parsing directly with JSON.parse resulted in errors, this works
          config = eval("(" + event.target.result + ")");
        } catch (e) {
          alert('Bad configuration file:' + e.message);
          throw (e);
        }
        launchApps();
      }
      fileReader.readAsText(theFile);
    }, function() {
      alert('Cannot read configuration file');
    });
  }, function(err) {
      alert('Configuration file does not exist');
  });
}

var authNeeded = false;
function readConfigAndAuth(launchApps) {
  readConfig(function() {
    // first check if there is a need to authenticate
    for (var i = 0; i < config.apps.length; i++) {
      if (config.apps[i].auth != undefined) {
        authNeeded = true;
      }
    }

    if (authNeeded) {
        $("#buttons").html('<tr height=' + BUTTON_ROW_SIZE + 'px"><td>Password:' +
                           '<input id="authpassword" type="password"></input>'  +
                           '<button id="authbutton">go</button></td></tr>');
        $('#authbutton').click(launchApps);
    } else {
      launchApps();
    }
  });
}

function adjustOrientationSizes() {
/*  var height;
  var width;
  switch(window.orientation) {
    case -90:
    case 90:
      height = window.innerWidth - BUTTON_ROW_SIZE;
      width = window.innerHeight;
      break;
    default:
      height = window.innerHeight - BUTTON_ROW_SIZE;
      width = window.innerWidth;
      break;
  }

  for (var i = 0; i < config.apps.length; i++) {
    var frameId = '#frame' + i;
    $(frameId).height(height);
    $(frameId).width(width);
  }
  $(appWindow).height(height + BUTTON_ROW_SIZE);
  $(appWindow).width(width - FRAME_ADJUST);
*/
}

var startHeight;
var startWidth;
var app = {
    // constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.start, false);
    },
    // load and run the micro-apps
    start: function() {
      startHeight = window.innerHeight;
      startWidth = window.innerWidth;
      readConfigAndAuth(function() {
        try {
          var pass;
          if (authNeeded) {
            pass = $('#authpassword').val();
          }

          // authentiation may have changed the window size
          // so set it back to the original device window size
          // and also reset the zoom
          var viewport= document.querySelector('meta[name="viewport"]');
          window.resizeTo(startWidth, startHeight);
          viewport.content = 'width=device-width minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0'

          // create the frames for the applications
          var frames = new Array();
          for (var i = 0; i < config.apps.length; i++) {
            frames[i] = '<table id="frame' + i + '"></table>';
          }
          $("#frames").hide();
          $("#frames").html('<tr><td>' + frames.join('\n') + '</td></tr>');
          $("#frames").height(startHeight - BUTTON_ROW_SIZE - FRAME_ADJUST*2);
          $("#frames").width(startWidth - FRAME_ADJUST);
          $("#frames").show();

          // basic setup of the frames
          for (var i = 0; i < config.apps.length; i++) {
            var frameId = '#frame' + i;
            $(frameId).hide();
            $(frameId).height(startHeight - BUTTON_ROW_SIZE - FRAME_ADJUST*2);
            $(frameId).width(startWidth - FRAME_ADJUST);
          }

          // ok now fill in the content for the frames
          var frameButtons = new Array();
          for (var i = 0; i < config.apps.length; i++) {
            var method = 'http://';
            if (config.apps[i].tls) {
              method = 'https://' + decryptConfigValue(config.apps[i].auth, pass) + '@';
            };
            var frameId = '#frame' + i;
            var content = '<tr><td><iframe height="100%" width="100%" src="' +
                          method +
                          config.apps[i].hostname +
                          ':' +
                          config.apps[i].port +
                          '?windowopen=y' +
                          '" frameborder="0" scrolling="yes"></iframe></td></tr>';
            $(frameId).html(content);
            frameButtons[i] = '<td><button id="framebutton' + i + '" type="button">' + config.apps[i].name + '</button></td>';
          }

          // setup the buttons
          $("#buttons").html('<tr height=' + BUTTON_ROW_SIZE + 'px">' + frameButtons.join('') + '</tr>');
          for (var i = 0; i < config.apps.length; i++) {
            $('#framebutton' + i).click({config: config, showId: i}, showApp);
          }

          window.addEventListener('orientationchange', adjustOrientationSizes);
       
          showApp({ data: {config: config, showId: 0}});
        } catch (e) {
          alert('Failed to start micro-app-launcher ' + e.message);
          throw (e);
        }
      });
    }
};

app.initialize();

