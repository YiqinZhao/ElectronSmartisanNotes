'use strict'
const {ipcRenderer} = require('electron')


ipcRenderer.on('page-will-load', (event, arg) => {
    console.log(123123);
    if (arg) {
        $('.login-des').text('正在获取数据');
    }
})
