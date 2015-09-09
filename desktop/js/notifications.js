'use strict';

var NW = require('nw.gui');


var showNativeNotification = function (icon, title, message, image) {

  var path = require('path');

  icon = icon ? path.join(process.cwd(), icon) : undefined;
  image = image ? path.join(process.cwd(), image) : undefined;

  var options = {
    body: message,
    icon: icon,
    contentImage: image
  };

  var notification = new Notification(title,options);

  notification.onclick = function () {
    NW_APP.idleFlag = false;
    console.log('onclick');
  }

  notification.onshow = function () {
    //работает только если окно активно
  }

  notification.onclose = function() {
    //не работает
    console.log('closed');
  }

  notification.onerror = function() {
    console.log('error');
  }

  return notification;

};
