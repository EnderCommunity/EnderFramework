//EnderFramework.window.topBar.setColor("var(--TopBar-BackgroundColor)");
var updateTopBarColorOnLoad = function () {
    customTopBarColorDone = true;
    if (customTopBarColor == null)
        customTopBarColor = "var(--TopBar-BackgroundColor)";
    if (manifest.menu.type == "none" || manifest.menu.type == "normal")
        Window_TopBar.style.background = customTopBarColor;
    delete customTopBarColor;
};