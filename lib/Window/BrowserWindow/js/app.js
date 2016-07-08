'use strict'
require('./menu.js')
const {ipcRenderer} = require('electron')


window.onload = () => {
    // var flag = true
    // $.get({
    //     url:"t.tt",
    //     success: function(data){
    //     },
    //     error: function(XMLHttpRequest, textStatus, errorThrown){
    //         false = false
    //     }
    // }
    // if (!flag) {return}
    var outTimer = 0;
    var timer = setInterval(() => {
        // TODO : What will happen when we didn't login
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

    $("<link>")
        .attr({ rel: "stylesheet",
            type: "text/css",
            href: `file://${__dirname}/../css/native.css`
        })
        .appendTo("head")
}

// ipcRenderer.on('')
