const icon__ = document.getElementById("_icon"),
    changeIcons = function(toLight) {
        window_Icon.setAttribute("src", (toLight) ? window_Icon.getAttribute("src").replace("_dark.png", "_light.png") : window_Icon.getAttribute("src").replace("_light.png", "_dark.png"));
    };
if (nativeTheme.themeSource != "system")
    stopThemeAutoChange = true;
nativeTheme.on('updated', function() {
    if (!stopThemeAutoChange) {
        var theme = (nativeTheme.shouldUseDarkColors) ? "dark" : "light";
        changeIcons(!nativeTheme.shouldUseDarkColors);
        document.documentElement.setAttribute("prefers-color-scheme", theme);
        _content.send("enderframework--theme-to" + theme); //Oh!
    }
    currentWindow.setIcon((nativeTheme.shouldUseDarkColors) ? icon__.getAttribute("src").replace("_light.png", "_dark.png") : icon__.getAttribute("src").replace("_dark.png", "_light.png"));
});
document.addEventListener("DOMContentLoaded", function() {
    currentWindow.setIcon((nativeTheme.shouldUseDarkColors) ? icon__.getAttribute("src").replace("_light.png", "_dark.png") : icon__.getAttribute("src").replace("_dark.png", "_light.png"));
});

document.documentElement.setAttribute("platform", osInfo.getNameCode());