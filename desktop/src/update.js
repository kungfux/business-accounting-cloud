const { app, dialog, BrowserWindow } = require('electron')
const { autoUpdater } = require("electron-updater");

class Update {
    initAutoUpdate() {
        app.whenReady().then(() => {
            autoUpdater.on('update-available', (ev, info) => {
                dialog.showMessageBox(
                    BrowserWindow.getAllWindows()[0],
                    {
                        title: 'Доступно обновление',
                        message: 'Сейчас будет загружена новая версия программы.\r\nЭто может занять какое-то время.',
                        type: 'info'
                    })
            })

            autoUpdater.on('update-downloaded', (ev, info) => {
                dialog.showMessageBoxSync(
                    BrowserWindow.getAllWindows()[0],
                    {
                        title: 'Доступно обновление',
                        message: 'Сейчас будет установлена новая версия программы.',
                        type: 'info'
                    })
                autoUpdater.quitAndInstall(false, true);
            });

            autoUpdater.checkForUpdatesAndNotify()
        })
    }
}

module.exports = { Update }