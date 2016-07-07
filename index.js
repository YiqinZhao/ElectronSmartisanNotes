"use strict"
const electron = require('electron')
const path = require('path')
const {app, BrowserWindow, webFrame} = require('electron')

let noteWindow

function createWindow() {
    noteWindow = new BrowserWindow({
        title: "ElectronicNote",
        width: 1100,
        height: 700,
        frame: true,
        autoHideMenuBar: true,
        webPreferences: {
            javascript: true,
            webSecurity: false,
            nodeIntegration: false,
            preload: path.join(__dirname, './lib/js/app.js')
        }
    })

    noteWindow.loadURL(`http://note.t.tt`)
    // noteWindow.webContents.openDevTools()

    noteWindow.on('closed', () => {
        noteWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (noteWindow === null) {
    createWindow()
  }
})
