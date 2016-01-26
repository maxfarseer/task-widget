'use strict';

var showNativeNotification = function (title, message, image, icon) {

  var myNotification = new Notification(title, {
    body: message
  });

  myNotification.onclick = function () {
    console.log('Notification clicked')
  }

  return myNotification;

}
