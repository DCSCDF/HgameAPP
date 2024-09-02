// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const path = require('node:path')
const gotTheLock = app.requestSingleInstanceLock()

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1000,
        minWidth: 1060,
        height: 730,
        minHeight: 760,
        title: "HgameAPP",
        icon: path.join(__dirname, 'icon.ico'),
        webPreferences: {
            webSecurity: false
        },
        frame: false,

        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: 'rgba(0,0,0,0)',
            height: 35,
            symbolColor: '#4b5563'
        },


    })





    //隐藏顶部菜单
    Menu.setApplicationMenu(null)
    //设置网站url
    mainWindow.loadURL("http://app.hgame.store/")
    // F12开发者窗口
    /* mainWindow.webContents.openDevTools({ mode: 'right' }) */
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
if (!gotTheLock) {
    app.quit()
} else {
    app.whenReady().then(() => {
        createWindow()

        app.on('activate', () => {
            // 在 macOS 系统内, 如果没有已开启的应用窗口
            // 点击托盘图标时通常会重新创建一个新窗口
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
    })
}

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
