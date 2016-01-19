'use strict';

//global
window.NW_APP = {
  timers: {
    //inProgressCheck: 60000 * 5, //раз в 5 минут проверять - есть ли IN_PROGRESS
    //idle: 60000 * 240
    inProgressCheck: 1000 * 2,
    idle: 1000 * 10,
    logInterval: 1000*10*2 //3 mins
  },
  host: 'https://new-redmine-qa.kama.gs',
  idleFlag: true
};

var path = require('path');
var NW = require('nw.gui');
var win = NW.Window.get();
var appWidth = 320;

var mb = new NW.Menu({type:"menubar"});
mb.createMacBuiltin("Task widget");
NW.Window.get().menu = mb;

win.moveTo(window.screen.availWidth - appWidth, 40);
win.show();

win.showDevTools();

/*NW_APP.hasInProgress = function() {
  var taskStatus = $('.task__status');
  return taskStatus.length > 0 && $(taskStatus[0]).attr('data-task-status') !== '1'
}

NW_APP.checkInProgress = function() {
  console.log('checkInProgress: start');

  if ( NW_APP.hasInProgress() ) {

    //если в течении 4 часов {options.timers.idle} не появится таск в in_progress - покажи notification
    if (!NW_APP.idleFlag) {
      NW_APP.noTaskInProgressTimer = global.setTimeout(NW_APP.showNoInprogressWarning, NW_APP.timers.idle);
    }
    NW_APP.idleFlag = true;
  } else {
    //есть задача в in_progress
    global.clearTimeout(NW_APP.noTaskInProgressTimer);
    NW_APP.idleFlag = false;
  }
  NW_APP.checkInProgressTimer = global.setTimeout(NW_APP.checkInProgress, NW_APP.timers.inProgressCheck);
}

NW_APP.showNoInprogressWarning = function() {
  showNativeNotification('./i/icon_128.png','Внимание','Отсутствует активная задача!');
}

$(function() {

  $('.js-toggle-compact-view').on('click', function() {
    if ( $(this).attr('data-compact') === 'true' ) {
      win.resizeTo(appWidth, 800);
    } else {
      win.resizeTo(appWidth, 300);
    }

  });

  NW_APP.checkInProgressTimer = global.setTimeout(NW_APP.checkInProgress, NW_APP.timers.inProgressCheck);

  $('.app').on('click', '.js-change-status', function(e) {
    NW.Shell.openExternal(e.target.href);
    return false;
  });

});*/

$(function() {

  var IN_PROGRESS = 2;
  var globalInterval;

  $('body').on('issuesLoad', function(values) {
    function logTime() {
      window.kgtrckr.issues.forEach(function(issue) {
        if (issue.status.id === IN_PROGRESS) {
          //TODO: if alreadyLogged - PUT
          $.ajax({
            method: "POST",
            url: NW_APP.host + '/time_entries.json',
            data: {
              'time_entry[issue_id]': issue.id,
              'time_entry[hours]': 0.05,
              'time_entry[comments]': 'by tracker app v0.5',
              'key': window.kgtrckr.user.api_key
            },
            success: function() {
              var startDate = new Date();
              var startDay = startDate.getDate();
              var startMonth = startDate.getMonth()+1;
              var startYear = startDate.getFullYear();
              var str = issue.id+'_'+startDay+'-'+startMonth+'-'+startYear;
              window.localStorage.setItem(str, 0.05);
            },
            error: function() {
              alert(issue.id + ' fail post TimeEntry');
            }
          });
        }
      });
    }

    if (typeof globalInterval === 'undefined') {
      console.log('timer created');
      globalInterval = global.setInterval(logTime, NW_APP.timers.logInterval);
    }

  });
});
