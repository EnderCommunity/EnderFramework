//const lockSystem = require('lock-system');
/*console.log(_os.type()); // "Windows_NT"
console.log(_os.release()); // "10.0.14393"
console.log(_os.platform()); // "win32"*/
var COWC = undefined, TWI = undefined;
document.addEventListener("DOMContentLoaded", function(){
  COWC = document.getElementById("_windowControls");
  TWI = document.getElementById("_icon");
});
const mainWindow = currentWindow, fOL = function(){
  /*if(osInfo.isWindows10){
    try{
      lockSystem();
      setTimeout(function(){
        //
        mainWindow.restore();
        mainWindow.focus();
        mainWindow.setKiosk(true);
        //
      }, 5000);
    }catch{
      //return an error
    }
  }*/
  //mainWindow.restore();
  mainWindow.setKiosk(true);
  mainWindow.setSkipTaskbar(true);
  mainWindow.setAlwaysOnTop(true);
  mainWindow.focus();
  COWC.style.display = "none";
  TWI.style.pointerEvents = "none";
}, fOU = function(){
  mainWindow.setAlwaysOnTop(false);
  mainWindow.setSkipTaskbar(false);
  mainWindow.setKiosk(false);
  mainWindow.focus();
  //mainWindow.restore();
  COWC.style.display = "inline-block";
  TWI.style.pointerEvents = "all";
}, lockCurrentWindow = function(){
  fOL();
  mainWindow.on('blur', fOL);
  //document.addEventListener("mouseout", eLEWAM);
  _content.executeJavaScript(`ENDERFRAMEWORK_ENVIRONMENT.EventReceiver("enter-lock-mode", null);`);
}, unlockCurrentWindow = function(){
  mainWindow.removeListener('blur', fOL);
  //document.removeListener("mouseout", eLEWAM);
  _content.executeJavaScript(`ENDERFRAMEWORK_ENVIRONMENT.EventReceiver("leave-lock-mode", null);`);
  fOU();
};