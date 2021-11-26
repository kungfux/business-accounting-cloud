const { app, dialog, BrowserWindow } = require('electron')
const { autoUpdater } = require("electron-updater");

class Update {
    initAutoUpdate() {
        app.whenReady().then(() => {
            setInterval(() => {
                // Check for updates every 6 hours
                autoUpdater.checkForUpdatesAndNotify()
            }, 21600000)

            autoUpdater.on('update-downloaded', (ev, info) => {
                dialog.showMessageBox(
                    this.getWindow(),
                    {
                        title: 'Доступно обновление',
                        message: 'Новая версия программы готова к установке',
                        detail: 'Нажмите "Обновить сейчас", чтобы закрыть программу и обновить сейчас, либо отложите обновление до завершения работы с программой, нажав "После закрытия"',
                        type: 'info',
                        buttons: ['Обновить сейчас', 'После закрытия']
                    }
                ).then((data) => {
                    if (data.response === 0) {
                        autoUpdater.quitAndInstall(false, true)
                        return
                    } else {
                        autoUpdater.autoInstallOnAppQuit = true
                    }
                });
            });

            autoUpdater.on('download-progress', (progressObj) => {
                var window = this.getWindow()
                if (window === undefined) {
                    return;
                }
                window.setProgressBar(progressObj.percent / 100)
            })

            autoUpdater.checkForUpdatesAndNotify()
        })
    }

    getWindow() {
        var windows = BrowserWindow.getAllWindows()
        if (windows.length > 0) {
            return windows[0]
        }
        else {
            return undefined
        }
    }
}

module.exports = { Update }