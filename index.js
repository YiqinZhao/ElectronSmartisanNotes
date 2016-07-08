"use strict"
const electron = require('electron')
const path = require('path')
const {app, BrowserWindow, webFrame, ipcMain} = require('electron')

let noteWindow, loginWindow

function createWindow() {
    noteWindow = new BrowserWindow({
        title: "锤子便签",
        width: 1100,
        height: 600,
        frame: true,
        center: true,
        autoHideMenuBar: true,
        useContentSize: true,
        titleBarStyle: 'hidden-inset',
        show: false,
        webPreferences: {
            javascript: true,
            webSecurity: false,
            nodeIntegration: false,
            preload: path.join(__dirname, './lib/Window/BrowserWindow/js/app.js')
        }
    })

    loginWindow = new BrowserWindow({
        title: "登录",
        width: 350,
        height: 500,
        frame: true,
        center: true,
        maximizable: false,
        alwaysOnTop: true,
        resizable: false,
        autoHideMenuBar: true,
        titleBarStyle: 'hidden-inset',
        webPreferences: {
            javascript: true,
            webSecurity: false,
            nodeIntegration: false,
            preload: path.join(__dirname, './lib/Window/loginWindow/js/login.js')
        }
    })

    loginWindow.loadURL(`file://${__dirname}/lib/Window/loginWindow/login.html`)
    noteWindow.loadURL(`http://note.t.tt`)
    // noteWindow.webContents.openDevTools()
    // loginWindow.webContents.openDevTools()

    noteWindow.on('closed', () => {
        noteWindow = null
    })
    loginWindow.on('closed', () => {
        loginWindow = null
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

ipcMain.on('notes-did-login', (event, arg) => {
    if (arg == 'true') {
        loginWindow.webContents.send('page-will-load', 'true')
        setTimeout(() => {
            loginWindow.hide()
            noteWindow.show()
        }, 2000)
    }
    else {
        loginWindow.webContents.send('page-will-load', 'false')
        setTimeout(() => {
            loginWindow.hide()
            noteWindow.show()
        }, 1500)
    }
})
