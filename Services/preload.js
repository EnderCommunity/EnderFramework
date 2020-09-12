const electron = require('electron'), TransparencyMouseFix = require('electron-transparency-mouse-fix'), currentWindow = electron.remote.getCurrentWindow();
currentWindow.show();
const fix = new TransparencyMouseFix({
  log: false,
  fixPointerEvents: 'auto'
});
document.addEventListener("DOMContentLoaded", function(){
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches, isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches, isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches;
  if(isDarkMode)
    document.documentElement.setAttribute('prefers-color-scheme', 'dark');
  else
    document.documentElement.setAttribute('prefers-color-scheme', 'light');
});
window.isClickable = function(v){
  currentWindow.setIgnoreMouseEvents(!v);
};