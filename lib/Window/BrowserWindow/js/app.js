'use strict'
require('./render.js')
const {ipcRenderer} = require('electron')


window.onload = () => {
    var timer = setInterval(() => {
        // TODO : What will happen when we didn't login
        if (window.location.href != 'https://cloud.smartisan.com/#/login?return_app=notes') {
            clearInterval(timer);
            ipcRenderer.send('notes-did-login', 'true')
        }
    }, 300)

    $("<link>")
        .attr({ rel: "stylesheet",
            type: "text/css",
            href: `file://${__dirname}/../css/native.css`
        })
        .appendTo("head")
}

// ipcRenderer.on('')
