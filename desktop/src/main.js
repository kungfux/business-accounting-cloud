const { app, BrowserWindow, Menu } = require('electron')
const { Update } = require('./update')
const { MainMenu } = require('./main-menu')
const path = require('path')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        title: 'Business Accounting Cloud',
        width: 1400,
        height: 1000,
        webPreferences: {
            sandbox: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadURL('https://bac.kungfux-stub.com')
}

app.whenReady().then(() => {
    createWindow()

    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    const menu = new MainMenu().getMenu()
    Menu.setApplicationMenu(menu)
    new Update().initAutoUpdate()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
