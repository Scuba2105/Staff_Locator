'use strict'

const { app, BrowserWindow, Menu } = require("electron");
Menu.setApplicationMenu(false)

let win = null;

if (require('electron-squirrel-startup')) app.quit();

function creatWindow() {
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        fullscreenable: true,
        resizable: true,
               webPreferences: {
            nodeIntergration: true,
            contextIsolation: false
        },
        icon: 'HNECTLB.ico'

    });

    const jhhWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        fullscreenable: true,
        resizable: true,
        webPreferences: {
            nodeIntergration: true,
            contextIsolation: false
        },
        icon: 'HNECTLB.ico'
    });
    jhhWindow.loadFile("jhh.html");
    jhhWindow.once("ready-to-show", () => {
        jhhWindow.show();

    });

    const jhhteamWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        fullscreenable: true,
        resizable: true,
        webPreferences: {
            nodeIntergration: true,
            contextIsolation: false
        },
        icon: 'HNECTLB.ico'
    });
    jhhteamWindow.loadFile("jhhteam.html");
    jhhteamWindow.once("ready-to-show", () => {
        jhhteamWindow.show();

    });
    const greenteamWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        fullscreenable: true,
        resizable: true,
        webPreferences: {
            nodeIntergration: true,
            contextIsolation: false
        },
        icon: 'HNECTLB.ico'
    });
    greenteamWindow.loadFile("greenteam.html");
    greenteamWindow.once("ready-to-show", () => {
        greenteamWindow.show();

    });


    const tamworthWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        fullscreenable: true,
        resizable: true,
        webPreferences: {
            nodeIntergration: true,
            contextIsolation: false
        },
        icon: 'HNECTLB.ico'
    });
    tamworthWindow.loadFile("tamworth.html");
    tamworthWindow.once("ready-to-show", () => {
        tamworthWindow.show();
    });

    /*const testWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        fullscreenable: true,
        resizable: true,
        webPreferences: {
            nodeIntergration: true,
            contextIsolation: false
        },
        icon: 'HNECTLB.ico'
    });
    testWindow.loadFile("test.html");
    testWindow.once("ready-to-show", () => {
        testWindow.show();
    });

*/



    win.loadFile("index.html");
}





app.whenReady().then(creatWindow);

