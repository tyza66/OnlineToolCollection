var electron = require('electron');

var app = electron.app
var BrowserWindow = electron.BrowserWindow
var process = electron.process

var mainWindow = null


app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1400, height: 800, webPreferences: { nodeIntegration: true }
    })
    mainWindow.loadURL('https://www.baidu.com/')
    require('./menu.js')({app:app,mainWindow:mainWindow})
    mainWindow.on('close', () => {
        mainWindow = null
    })
})