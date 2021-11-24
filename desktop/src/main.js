const { app, BrowserWindow } = require('electron')
const { Update } = require('./update')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        title: 'Business Accounting Cloud',
        width: 1400,
        height: 1000,
        webPreferences: {
            sandbox: true,
        }
    })

    mainWindow.loadURL('https://bac.kungfux-stub.com')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    new Update().initAutoUpdate()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
