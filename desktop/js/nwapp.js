'use strict';

var path = require('path');
var NW = require('nw.gui');
var win = NW.Window.get();
var appWidth = 320;
var noTaskInProgressTimer;

var mb = new NW.Menu({type:"menubar"});
mb.createMacBuiltin("Task widget");
NW.Window.get().menu = mb;

win.moveTo(window.screen.availWidth - appWidth, 40);
win.show();

function checkInProgress() {
  var taskStatus = $('.task__status');
  if (taskStatus.length > 0 && $(taskStatus[0]).attr('data-task-status') !== '1' ) {
    var timer = global.setTimeout(function() {
      //в течении 5 минут нет задачи в IN_PROGRESS
      noTaskInProgressTimer = global.setTimeout(checkNoOneInProgress,60000 * 240);
    },60000 * 5);
  }
}

function checkNoOneInProgress() {
  var taskStatus = $('.task__status');
  if (taskStatus.length > 0 && $(taskStatus[0]).attr('data-task-status') !== '1' ) {
    showNativeNotification('./i/icon_128.png','Внимание','Отсутствует активная задача!');
  } else {
    global.clearInterval(noTaskInProgressTimer);
  }
}

$(function() {

  $('.js-toggle-compact-view').on('click', function() {
    if ( $(this).attr('data-compact') === 'true' ) {
      win.resizeTo(appWidth, 800);
    } else {
      win.resizeTo(appWidth, 300);
    }

  });

  var checkInProgressTimer = global.setInterval(checkInProgress, 1000);

});
