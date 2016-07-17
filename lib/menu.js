"use strict"
const {app, Menu, MenuItem, ipcRenderer, BrowserWindow} = require('electron')
let aboutWindow = null

exports.init = () => {
    const template = [
      {
        label: '编辑',
        submenu: [
          {
            label: '撤销',
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo'
          },
          {
            label: '还原',
            accelerator: 'CmdOrCtrl+Y',
            role: 'redo'
          },
          {
            type: 'separator'
          },
          {
            label: '剪切',
            accelerator: 'CmdOrCtrl+X',
            role: 'cut'
          },
          {
            label: '复制',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
          },
          {
            label: '粘贴',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
          },
          {
            label: '全选',
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall'
          },
        ]
      },
      {
        label: '视图',
        submenu: [
          {
            label: '刷新',
            accelerator: 'CmdOrCtrl+R',
            click(item, focusedWindow) {
              if (focusedWindow) focusedWindow.reload();
            }
          }
        ]
      },
      {
        label: '窗口',
        role: 'window',
        submenu: [
          {
            label: '最小化',
            role: 'minimize'
          },
          {
            label: '关闭',
            role: 'close'
          },
        ]
      },
      {
          label: '账户',
          submenu: [
              {
                  label: '注销',
                  click(item, focusedWindow) {
                      if ($('.logout-mask').length == 0) {
                          $('<div class=\'logout-mask\'></div>').appendTo($('body'))
                          $(`<img src='file://${__dirname}/../../Common/img/Notes.png'></img>`).appendTo($('.logout-mask'))
                          $('<p>锤子便签</p>').appendTo($('.logout-mask'))
                          $('<p>正在注销</p>').appendTo($('.logout-mask'))
                      }
                      setTimeout(() => {
                          $('.logout-mask').toggleClass('logout-mask-active')
                          setTimeout(() => {
                                $('#main > div.globalheader > div > div.account-panel-view > div.account-panel-item-view > div > div:nth-child(2)').click()
                                setTimeout(() => {
                                    window.location.href = 'https://cloud.smartisan.com/#/login?return_app=notes'
                                    $('.logout-mask').css('display', 'block')
                                    setTimeout(() => {
                                        $('.logout-mask').toggleClass('logout-mask-active')
                                        setTimeout(() => {
                                            $('.logout-mask').css('display', 'none')
                                        }, 350)
                                    }, 500)
                                }, 800)
                          }, 300)
                      }, 200)
                  }
              }
          ]
      }
    ];

    if (process.platform === 'darwin') {
      const name = app.getName()
      template.unshift({
        label: name,
        submenu: [
          {
            label: '关于',
            click(item, focusedWindow) {
                if (aboutWindow != null) {
                    aboutWindow.focus()
                    return
                }
                aboutWindow = new BrowserWindow({
                    title: '关于',
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
                        nodeIntegration: false
                    }
                })
                aboutWindow.loadURL(`file://${__dirname}/Window/About/about.html`)
                // aboutWindow.openDevTools()
                aboutWindow.on('closed', () => {
                    aboutWindow = null
                })
            }
          },
          {
            type: 'separator'
          },
          {
            label: '服务',
            role: 'services',
            submenu: []
          },
          {
            label: '退出',
            accelerator: 'CmdOrCtrl+Q',
            click(item, focusedWindow) {
                // ipcRenderer.send('app-will-close', 'true')
                app.quit()
            }
          },
        ]
      });
      // Window menu.
      template[3].submenu = [

        {
          type: 'separator'
        },
        {
          label: '置于顶层',
          role: 'front'
        }
      ];
    }

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}
