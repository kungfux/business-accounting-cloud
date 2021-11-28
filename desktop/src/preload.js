const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('isRunningInsideDesktopApp', {
    isRunningInsideDesktopApp: true
})
