document.addEventListener("DOMContentLoaded", function(event){
  if(osInfo.isWindows){
    //
  }else if(osInfo.isLinux){
    //
  }else if(osInfo.isMacOS){
    document.getElementById("_closeWin").setAttribute("macOS", "");
    document.getElementById("_closeWin").classList.remove("click", "click_");
    document.getElementById("_closeWin").innerHTML = "";
    document.getElementById("_maxWin").setAttribute("macOS", "");
    document.getElementById("_maxWin").classList.remove("click");
    document.getElementById("_maxWin").innerHTML = "";
    document.getElementById("_minWin").setAttribute("macOS", "");
    document.getElementById("_minWin").classList.remove("click");
    document.getElementById("_minWin").innerHTML = "";
  }else{
    //
  }
});