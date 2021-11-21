const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        title: 'Business Accounting Cloud',
        width: 1000,
        height: 800,
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
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
