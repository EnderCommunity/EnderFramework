module.exports = function () {
    var isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches, isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches, isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches, hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;
    if (isDarkMode)
        document.documentElement.setAttribute('prefers-color-scheme', 'dark');
    else
        document.documentElement.setAttribute('prefers-color-scheme', 'light');
    ipcRenderer.on("enderframework--theme-tolight", function () {
        document.documentElement.setAttribute("prefers-color-scheme", "light");
    });
    ipcRenderer.on("enderframework--theme-todark", function () {
        document.documentElement.setAttribute("prefers-color-scheme", "dark");
    });
};