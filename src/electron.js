const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const info = require('./info.js');

const defaultMenu = require('electron-default-menu');
const gitlabuploadfile = require("./apigitlabs/api_uploadfile.js") ;
const { Menu, shell,ipcMain } = electron;

var gitlabupload = new gitlabuploadfile();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 1048, height: 880});
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.loadURL(isDev ? 'http://localhost:3001' : `file://${path.join(__dirname, './build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
  mainWindow.setTitle("乐聚测试工具套件 版本: "+info.ver);

  const menu = defaultMenu(app, shell);
  menu.splice(4, 0, {
    label: 'Custom',
    submenu: [
      {
        label: 'Open Dev tool',
        click: (item, focusedWindow) => {
          mainWindow.webContents.openDevTools();
        }
      }
    ]
  })
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('asynchronous-message', (event, arg) => {
    // console.log('get asyncchronous message ',arg);  // prints "ping"
    setTimeout(()=>{
        shell.openExternal(arg);
    },500);
    // event.sender.send('asynchronous-reply', 'pong');
    // shell.openExternal
    // event.sender.send('asynchronous-reply', 'pong')
});

ipcMain.on('openurls', (event, arg) => {
    console.log('openurls',arg);  // prints "ping"
    if (arg) {
        arg.forEach((value,index)=>{
            if (value) {
                shell.openExternal(value.web_url);
            }
        });
    }
});

ipcMain.on('uploadfile', async (event, arg) => {
  var ret = await gitlabupload.uploadfile(arg.token,arg.filepath,(step,total)=>{
    event.sender.send('uploadfile', {type:'progress',value:{step,total}});
  },()=>{
  });
  event.sender.send('uploadfile',{type:'done',value:ret});
});
