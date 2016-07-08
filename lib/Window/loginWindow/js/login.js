'use strict'
const {ipcRenderer} = require('electron')

var dataTexts = ['正' ,'在' ,'获' ,'取' ,'数' ,'据']
var i = 0

window.onload = () => {
    var texts = $('.login-des')
    var clock = setInterval(() => {
        $(texts[i++]).toggleClass('login-des-active')
        if (i == texts.length) {
            clearInterval(clock)
        }
    }, 50)

    // $.get({
    //     url:"t.tt",
    //     success: function(data){
    //     },
    //     error: function(XMLHttpRequest, textStatus, errorThrown){
    //         setTimeout(() => {
    //             i = 0
    //             dataTexts = ['网' ,'络' ,'连' ,'接' ,'失' ,'败']
    //             var clock = setInterval(() => {
    //                 $(texts[i++]).toggleClass('login-des-active')
    //                 if (i == texts.length) {
    //                     clearInterval(clock)
    //                 }
    //             }, 50)
    //
    //             setTimeout(() => {
    //                 i = 0
    //                 var clock = setInterval(() => {
    //                     $(texts[i]).text(dataTexts[i])
    //                     $(texts[i++]).toggleClass('login-des-active')
    //                     if (i == texts.length) {
    //                         clearInterval(clock)
    //                     }
    //                 }, 50)
    //             }, 350)
    //         }, 350)
    //     }
    // });
}

ipcRenderer.on('page-will-load', (event, arg) => {
    var texts = $('.login-des')
    console.log(arg);
    if (arg == 'true') {
        i = 0
        dataTexts = ['正' ,'在' ,'获' ,'取' ,'数' ,'据']
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
    else {
        dataTexts = ['请' ,'求' ,'登' ,'录' ,'超' ,'时']

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
})
