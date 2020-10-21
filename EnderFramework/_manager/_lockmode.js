const _os = require('os'), isWindows10 = (_os.platform() == "win32" && _os.release() > "10"), lockSystem = require('lock-system');
/*console.log(_os.type()); // "Windows_NT"
console.log(_os.release()); // "10.0.14393"
console.log(_os.platform()); // "win32"*/
var COWC = undefined, TWI = undefined;
document.addEventListener("DOMContentLoaded", function(){
  COWC = document.getElementById("_windowControls");
  TWI = document.getElementById("_icon");
});
const mainWindow = electron.remote.getCurrentWindow(), fOL = function(){
  /*if(isWindows10){
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
  mainWindow.focus();
  mainWindow.setKiosk(true);
  COWC.style.display = "none";
  TWI.style.pointerEvents = "none";
}, fOU = function(){
  mainWindow.setKiosk(false);
  mainWindow.focus();
  //mainWindow.restore();
  COWC.style.display = "inline-block";
  TWI.style.pointerEvents = "all";
}, lockCurrentWindow = function(){
  fOL();
  mainWindow.on('blur', fOL);
}, unlockCurrentWindow = function(){
  mainWindow.removeListener('blur', fOL);
  fOU();
};