'use strict';

var gui = require('nw.gui'); //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)

var win = gui.Window.get();

var appWidth = 320;
win.moveTo(window.screen.availWidth - appWidth, 40);
win.show();

$(function() {

  $('.js-toggle-compact-view').on('click', function() {
    if ( $(this).attr('data-compact') === 'true' ) {
      win.resizeTo(appWidth, 800);
    } else {
      win.resizeTo(appWidth, 300);
    }

  });

});
