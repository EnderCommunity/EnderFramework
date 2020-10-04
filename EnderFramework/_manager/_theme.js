const { nativeTheme } = require('electron').remote;
if(nativeTheme.themeSource != "system")
  stopThemeAutoChange = true;
nativeTheme.on('updated', function(){
  if(!stopThemeAutoChange){
    var theme = (nativeTheme.shouldUseDarkColors) ? "dark" : "light";
    document.documentElement.setAttribute("prefers-color-scheme", theme);
    _content.send("enderframework--theme-to" + theme);
  }
});