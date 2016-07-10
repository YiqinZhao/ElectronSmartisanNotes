'use strict'
require('./menu.js')
const {ipcRenderer} = require('electron')
var loginFlag = true, cssFlag = true
var noteFrame

window.onload = () => {
    $("<link>")
        .attr({ rel: "stylesheet",
            type: "text/css",
            href: `file://${__dirname}/../css/native.css`
        })
        .appendTo("head")
    var k = 0
    var noteClock = setInterval(() => {
        if ($(document.getElementById('cloud_app_notes')).length != 0) {
            noteFrame = $(document.getElementById('cloud_app_notes').contentDocument).children()

            $('head', noteFrame).append($(
                '<style>\
                    .note-header {\
                        display: none;\
                    }\
                    .note-logo {\
                        display: none;\
                    }\
                    .titlebar {\
                        -webkit-app-region: drag\
                    }\
                </style>'
            ))
        }
    }, 200) // Yes, we love dirt check, right?!

    var outTimer = 0;
    var timer = setInterval(() => {
        if (window.location.href != 'https://cloud.smartisan.com/#/login?return_app=notes') {
            clearInterval(timer)
            ipcRenderer.send('notes-did-login', 'true')
        }
        else {
            if (++outTimer > 10) {
                clearInterval(timer)
                ipcRenderer.send('notes-did-login', 'false')
            }
        }
    }, 300)


}
