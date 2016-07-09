"use strict"
const electron = require('electron')
const path = require('path')
const {app, BrowserWindow, webFrame, ipcMain} = require('electron')

let noteWindow = null, loginWindow = null
var internetFlag = false

function createWindow(isConnected) {
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
    // loginWindow.webContents.openDevTools()

    loginWindow.on('closed', () => {
        loginWindow = null
    })

    if (isConnected) {
        noteWindow = new BrowserWindow({
            title: "锤子便签",
            width: 1100,
            minWidth: 1025,
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
        noteWindow.loadURL(`http://note.t.tt`)
        // noteWindow.webContents.openDevTools()
        noteWindow.on('closed', () => {
            noteWindow = null
        })
        internetFlag = true
    }
}

app.on('ready', () => {
    require('dns').resolve('note.t.tt', function(err) {
        if (err) {
            if (noteWindow === null) {
              createWindow(false)
            }
        }
        else {
            if (noteWindow === null) {
              createWindow(true)
            }
        }
    })
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  require('dns').resolve('note.t.tt', function(err) {
      if (err) {
          if (noteWindow === null) {
            createWindow(false)
          }
      }
      else {
          if (noteWindow === null) {
            createWindow(true)
          }
      }
  })

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
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

ipcMain.on('login-did-show', (event, arg) => {
    if (!internetFlag) {
        loginWindow.webContents.send('internet-connected', 'false')
    }
})
