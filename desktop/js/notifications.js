'use strict';

var NW = require('nw.gui');


var showNativeNotification = function (icon, title, message, image) {
  var notifier;
  try {
    notifier = require('node-notifier');
  } catch (error) {
    console.error(error);
    if (error.message == "Cannot find module 'node-notifier'") {
      window.alert("Can not load module 'node-notifier'.\nPlease run 'npm install'");
    }
    return false;
  }

  var path = require('path');

  icon = icon ? path.join(process.cwd(), icon) : undefined;
  image = image ? path.join(process.cwd(), image) : undefined;

  notifier.notify({
    title: title,
    message: message,
    icon: icon,
    appIcon: icon,
    contentImage: image,
    wait: true,
    sender: 'org.nwjs.sample.notifications'
  }, function (err, response) {
    if (response == "Activate\n") {
      alert("node-notifier: notification clicked");
      NW.Window.get().focus();
    }
  });

};
