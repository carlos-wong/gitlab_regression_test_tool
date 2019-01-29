const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

const defaultMenu = require('electron-default-menu');
const gitlabuploadfile = require("../src/gitlabs/api_uploadfile.js") ;
const { Menu, shell,ipcMain } = electron;

var gitlabupload = new gitlabuploadfile();

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 1048, height: 880});
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadURL(isDev ? 'http://localhost:3001' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.on('closed', () => mainWindow = null);

    const menu = defaultMenu(app, shell);
    
    // Add custom menu 
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
    // Set top-level application menu, using modified template 
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

ipcMain.on('carlos-gitlab-api-token',(event,arg)=>{
    console.log('carlos-gitlab-api-token arg is:',arg);
});

ipcMain.on('carlos-read-write-file', (event, arg) => {
    // console.log(arg,' user data path:',app.getPath('userData'));
    if(arg.type =='read'){
        fs.readFile(app.getPath('userData')+'/'+arg.path,'utf8',(err,data)=>{
            event.returnValue = {err:err,data:data && data.toString()};
        });
    }
    else if(arg.type =='write'){
        fs.writeFile(app.getPath('userData')+'/'+arg.path,arg.data,'utf8',(err,data)=>{
            // console.log('write file:',arg.path,' data:',arg.data,' err:',err);
            event.returnValue = {err:err,data:data};
        });
    }
    // event.returnValue = null;
});

ipcMain.on('synchronous-message', async (event, arg) => {
  var ret = await gitlabupload.uploadfile(arg.token,arg.filepath);
  event.returnValue = ret;
});
