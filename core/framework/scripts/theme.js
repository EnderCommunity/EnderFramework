const icon__ = document.getElementById("_icon"),
    changeIcons = function(toLight) {
        window_Icon.setAttribute("src", (toLight) ? window_Icon.getAttribute("src").replace("_dark.png", "_light.png") : window_Icon.getAttribute("src").replace("_light.png", "_dark.png"));
    },
    changeAccentColour = function(colour, isSystem = false) {
        if (colour == null || colour == "system") {
            lockAccentColour = false;
            var oldAccentColour = accentColour;
            accentColour = "#" + systemPreferences.getAccentColor();
            document.documentElement.style.setProperty('--accentColor', accentColour);
            setTimeout(function() {
                _content.executeJavaScript(`ENDERFRAMEWORK_ENVIRONMENT.changeContentAccentColor("${accentColour}"); ENDERFRAMEWORK_ENVIRONMENT.EventReceiver("accent-color-changed", ${isSystem}, "${oldAccentColour}", "${accentColour}");`);
            }, 10)
            delete oldAccentColour;
        } else if (colour != accentColour) {
            lockAccentColour = true;
            var oldAccentColour = accentColour;
            accentColour = colour;
            document.documentElement.style.setProperty('--accentColor', accentColour);
            setTimeout(function() {
                _content.executeJavaScript(`ENDERFRAMEWORK_ENVIRONMENT.changeContentAccentColor("${accentColour}"); ENDERFRAMEWORK_ENVIRONMENT.EventReceiver("accent-color-changed", ${isSystem}, "${oldAccentColour}", "${accentColour}");`);
            }, 10)
            delete oldAccentColour;
        }
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

startAccentColourTracking = function() {
    if (manifest.content.accentColor === undefined || manifest.content.accentColor == "system") {
        changeAccentColour(null, true);
        systemPreferences.on('accent-color-changed', function(event, newColour) {
            if (!lockAccentColour)
                changeAccentColour(null, true);
        });
    } else {
        changeAccentColour(manifest.content.accentColor);
    }
};