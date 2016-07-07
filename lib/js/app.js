"use strict"
require('./render.js')


window.onload = () => {
    $("<link>")
        .attr({ rel: "stylesheet",
            type: "text/css",
            href: `file://${__dirname}/../css/native.css`
        })
        .appendTo("head")
}
