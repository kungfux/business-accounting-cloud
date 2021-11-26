function isRunningInsideBacApp() {
    try {
        return window.isRunningInsideDesktopApp.isRunningInsideDesktopApp;
    }
    catch { }
}
