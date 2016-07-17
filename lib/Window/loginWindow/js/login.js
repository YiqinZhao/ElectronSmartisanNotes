'use strict'
const {ipcRenderer} = require('electron')
// require('../../../menu.js')
var i = 0

window.onload = () => {
    var texts = $('.login-des')
    var clock = setInterval(() => {
        $(texts[i++]).toggleClass('login-des-active')
        if (i == texts.length) {
            clearInterval(clock)
        }
    }, 50)
    ipcRenderer.send('login-did-show', 'true')
}

ipcRenderer.on('page-will-load', (event, arg) => {
    var texts = $('.login-des')
    if (arg == 'true') {
        textWithElegantAnimation(['正' ,'在' ,'获' ,'取' ,'数' ,'据'])
    }
    else {
        textWithElegantAnimation(['请' ,'求' ,'登' ,'录' ,'超' ,'时'])
    }
})

ipcRenderer.on('internet-connected', (event, arg) => {
    if (arg == 'false') {
        setTimeout(() => {
            textWithElegantAnimation(['网' ,'络' ,'连' ,'接' ,'失' ,'败'])
        }, 500)
    }
})

function textWithElegantAnimation(dataTexts) {
    // dataTexts = ['请' ,'求' ,'登' ,'录' ,'超' ,'时']
    var texts = $('.login-des')
    i = 0
    var clock = setInterval(() => {
        $(texts[i++]).toggleClass('login-des-active')
        if (i == texts.length) {
            clearInterval(clock)
        }
    }, 50)

    setTimeout(() => {
        i = 0
        var clock = setInterval(() => {
            $(texts[i]).text(dataTexts[i])
            $(texts[i++]).toggleClass('login-des-active')
            if (i == texts.length) {
                clearInterval(clock)
            }
        }, 50)
    }, 350)
}
