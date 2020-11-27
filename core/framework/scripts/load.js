const loadTheWindow = function () {
    currentWindow.hide();
    firstLoad = true;
    if (manifest.splashScreen)
        document.showSplashScreen();
    windowIsReady();
    setTimeout(function () {
        firstLoad = true;
        _content.setAttribute("src", path.join(manifest.paths.currentApp, "content", (!isSub) ? manifest.start : subInfo.url));
        //
    }, 0);
};
document.addEventListener("DOMContentLoaded", function () {
    loadTheWindow();
});