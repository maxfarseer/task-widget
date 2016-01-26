'use strict';

//global
window.NW_APP = {
  timers: {
    logInterval: 1000*10 //3 mins
  },
  host: 'https://new-redmine-qa.kama.gs',
  idleFlag: true
};

var path = require('path');
var gui = require('nw.gui');
//var NW = require('nw.gui');
var win = gui.Window.get();
var appWidth = 320;

var menu = new gui.Menu({type:"menubar"});
var devItems = new gui.Menu();

var showDevToolsItem = new gui.MenuItem({
  label: "Show dev tools",
  click: function() {
    win.showDevTools();
  },
  key: "i",
  modifiers: "ctrl-alt",
});

devItems.append(showDevToolsItem);

menu.createMacBuiltin("Tracker");

menu.append(
  new gui.MenuItem({
      label: 'Debug',
      submenu: devItems
  })
);
gui.Window.get().menu = menu;

win.moveTo(window.screen.availWidth - appWidth, 40);
win.show();

NW_APP.showNoInprogressWarning = function() {
  showNativeNotification('./i/System Report-96.png','Attention','You haven\'t issues in progress!');
}

$(function() {

  var IN_PROGRESS = 2;
  var globalInterval;

  $('body').on('click', 'a[target=_blank]', function(){
    require('nw.gui').Shell.openExternal( this.href );
    return false;
  });

  $('body').on('issuesLoad', function(values) {

    console.log('issuesLoad');

    function makeHumanTime(serverTime) {
      if (serverTime) {
        let hours = Math.floor(serverTime);
        let minutes = Math.round((serverTime - hours)*60);
        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return {hours: hours, minutes: minutes};
        //return hours+'<span class="colon">:</span>'+minutes;
      }
    }

    var user = window.kgtrckr.user;

    function updateTimeEntry(lsRecordName, id, timeEntryId, hours, $el) {
      $.ajax({
        method: 'PUT',
        dataType: 'text',
        url: NW_APP.host + '/time_entries/'+ timeEntryId +'.json',
        data: {
          'time_entry[issue_id]': id,
          'time_entry[hours]': hours,
          'time_entry[comments]': 'PUT by tracker app v 1.0.0',
          'key': user.api_key
        },
        success: function() {
          window.localStorage.setItem(lsRecordName, hours);
          $el.attr('data-server-time', +$el.attr('data-server-time') + 0.05);
          var time = makeHumanTime( +$el.attr('data-server-time') );

          $('.te-hours',$el).text(time.hours);
          $('.te-minutes',$el).text(time.minutes);
        },
        error: function() {
          alert('Tracker: Problem with update time entry for issue with ID ' + id);
        }
      })
    }

    function logTime() {
      var startDate = new Date();
      var startDay = startDate.getDate();
      var startMonth = startDate.getMonth()+1;
      var startYear = startDate.getFullYear();
      var haveIssuesInProgress = 0;

      window.kgtrckr.issues.forEach(function(issue) {
        var lsRecordName = issue.id+'_'+startDay+'-'+startMonth+'-'+startYear;
        var alreadyLogged = window.localStorage.getItem(lsRecordName);
        var $tEntry = $('#te_'+issue.id);

        if (issue.status.id === IN_PROGRESS) {
          haveIssuesInProgress++;
          if (alreadyLogged) {
            var timeEntryId = window.localStorage.getItem(issue.id);
            updateTimeEntry(lsRecordName, issue.id, timeEntryId, +alreadyLogged+0.05, $tEntry);
          } else {
            $.ajax({
              method: 'POST',
              url: NW_APP.host + '/time_entries.json',
              data: {
                'time_entry[issue_id]': issue.id,
                'time_entry[hours]': 0.05,
                'time_entry[comments]': 'POST by tracker app v 1.0.0',
                'key': user.api_key
              },
              success: function() {
                window.localStorage.setItem(lsRecordName, 0.05);
                $tEntry.attr('data-server-time', +$tEntry.attr('data-server-time') + 0.05);

                var time = makeHumanTime( +$tEntry.attr('data-server-time') );
                $('.te-hours',$tEntry).text(time.hours);
                $('.te-minutes',$tEntry).text(time.minutes);

                $.ajax({
                  url: NW_APP.host + '/time_entries.json?issue_id='+issue.id+'&limit=1&user_id='+user.id+'&key='+user.api_key,
                  success: function(data) {
                    window.localStorage.setItem(issue.id,data.time_entries[0].id);
                  },
                  error: function() {
                    alert('Tracker: Can not get last time entry data');
                  }
                })

              },
              error: function() {
                alert('Tracker: Problem with create time entry for issue with ID ' + issue.id);
              }
            });
          }
        }
      });

      if (!haveIssuesInProgress) {
        NW_APP.showNoInprogressWarning();
      }
    }

    if (typeof globalInterval === 'undefined') {
      globalInterval = global.setInterval(logTime, NW_APP.timers.logInterval);
    }

  });

  $('body').on('logout', function(values) {
    console.log('logout');
    global.clearInterval(globalInterval);
  });
});
