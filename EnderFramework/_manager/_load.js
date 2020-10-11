const storage = require('electron-json-storage');
storage.setDataPath(appPath);
document.addEventListener("DOMContentLoaded", function(event){
  storage.get('_manifest', function(error, data){
    setTimeout(function(){
      if(data.name != null){
        TopFramework.setTitle(data.name);
      }else{
        TopFramework.setTitle("[no_title]");
      }
      if(data.splashText != null){
        TopFramework.splashText(data.splashText);
      }
      if(data.window != null){
        if(data.window.isClosable == false){
          var elm = document.getElementById("_closeWin");
          elm.classList.add("disabled");
          elm.id = "";
          elm.removeEventListener("click", closeWin_, true);
        }
        if(data.window.isMinimizable == false){
          var elm = document.getElementById("_minWin");
          elm.classList.add("disabled");
          elm.id = "";
          elm.removeEventListener("click", minWin_, true);
        }
        if(data.window.isMaximizable == false){
          var elm = document.getElementById("_maxWin");
          elm.classList.add("disabled");
          elm.id = "";
          elm.removeEventListener("click", maxWin_, true);
        }
      }
      if(data.splashCooldown > 0 && data.splashCooldown != null && splashScreen_){
        doneLoadingInfo(data.splashCooldown);
      }else{
        doneLoadingInfo();
      }
    }, 0);
  });
});