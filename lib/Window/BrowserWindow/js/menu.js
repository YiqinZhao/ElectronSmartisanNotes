"use strict"
const {webFrame} = require('electron')
const {remote} = require('electron');
const {Menu, MenuItem} = remote;

webFrame.setZoomFactor(0.8)
var cssFlag = true

const template = [
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      },
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        }
      },
      {
        role: 'togglefullscreen'
      },
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      },
    ]
  },
  {
      label: 'Account',
      submenu: [
          {
              label: 'logout',
              click(item, focusedWindow) {
                  if ($('.logout-mask').length == 0) {
                      $('<div class=\'logout-mask\'></div>').appendTo($('body'))
                      $(`<img src='file://${__dirname}/../../loginWindow/img/Notes.png'></img>`).appendTo($('.logout-mask'))
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
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() { require('electron').shell.openExternal('http://electron.atom.io'); }
      },
    ]
  },
];

if (process.platform === 'darwin') {
  const name = require('electron').remote.app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      },
    ]
  });
  // Window menu.
  template[3].submenu = [

    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  ];
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
