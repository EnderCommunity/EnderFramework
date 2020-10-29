const { nativeTheme } = require('electron').remote, icon__ = document.getElementById("_icon"), changeIcons = function(toLight){
  if(toLight)
    icon__.setAttribute("src", icon__.getAttribute("src").replace("_dark.png", "_light.png"));
  else
    icon__.setAttribute("src", icon__.getAttribute("src").replace("_light.png", "_dark.png"));
};
if(nativeTheme.themeSource != "system")
  stopThemeAutoChange = true;
nativeTheme.on('updated', function(){
  if(!stopThemeAutoChange){
    var theme = (nativeTheme.shouldUseDarkColors) ? "dark" : "light";
    changeIcons(!nativeTheme.shouldUseDarkColors);
    document.documentElement.setAttribute("prefers-color-scheme", theme);
    _content.send("enderframework--theme-to" + theme);
  }
  electron.remote.getCurrentWindow().setIcon((nativeTheme.shouldUseDarkColors) ? icon__.getAttribute("src").replace("_light.png", "_dark.png") : icon__.getAttribute("src").replace("_dark.png", "_light.png"));
});
document.addEventListener("DOMContentLoaded", function(){
  electron.remote.getCurrentWindow().setIcon((nativeTheme.shouldUseDarkColors) ? icon__.getAttribute("src").replace("_light.png", "_dark.png") : icon__.getAttribute("src").replace("_dark.png", "_light.png"));
});