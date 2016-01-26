'use strict';

//global
window.APP = {
  timers: {
    logInterval: 1000*10 //10 sec
  },
  host: 'https://new-redmine-qa.kama.gs',
  idleFlag: true
};

var shell = require('electron').shell;

APP.showNoInprogressWarning = function() {
  showNativeNotification('Tracker:','You haven\'t issues in progress!','./i/System Report-96.png');
}

$(function() {

  var IN_PROGRESS = 2;

  $('body').on('click', 'a[target=_blank]', function(){
    event.preventDefault();
    shell.openExternal(this.href);
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
      }
    }

    var user = JSON.parse(localStorage.getItem('user'));

    function updateTimeEntry(lsRecordName, id, timeEntryId, hours, $el) {
      $.ajax({
        method: 'PUT',
        dataType: 'text',
        url: APP.host + '/time_entries/'+ timeEntryId +'.json',
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
              url: APP.host + '/time_entries.json',
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
                  url: APP.host + '/time_entries.json?issue_id='+issue.id+'&limit=1&user_id='+user.id+'&key='+user.api_key,
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
        APP.showNoInprogressWarning();
      }
    }

    if (typeof APP.ticker === 'undefined') {
      APP.ticker = global.setInterval(logTime, APP.timers.logInterval);
    }

  });

  $('body').on('logout', function() {
    global.clearInterval(APP.ticker);
    delete APP.ticker;
    console.log(APP.ticker)
  });
});
