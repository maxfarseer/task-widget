'use strict';

const electron = require('electron');

const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

//const powerMonitor = require('electron').powerMonitor;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

app.on('ready', function() {

  mainWindow = new BrowserWindow({width: 300, height: 315});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  require('electron').powerMonitor.on('suspend', function(event) {
    event.sender.emit('sleepModeON', 'sleep mode ON')
  });

  require('electron').powerMonitor.on('resume', function(event) {
    event.sender.emit('sleepModeOFF', 'sleep mode OFF')
  });

});


app.on('window-all-closed', function() {
  app.quit();
});
