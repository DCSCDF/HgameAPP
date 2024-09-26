const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('node:path')


app.on('web-contents-created', (e, webContents) => {
    webContents.setWindowOpenHandler(({ url, frameName }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
});

function createWindow() {

    const win = new BrowserWindow({
        width: 1000,
        minWidth: 1060,
        height: 730,
        minHeight: 760,
        title: "HgameAPP",
        icon: path.join(__dirname, 'icon.ico'),
        frame: false,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: 'rgba(0,0,0,0)',
            height: 35,
            symbolColor: '#4b5563'
        },
    })



    win.loadFile('./src/index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})