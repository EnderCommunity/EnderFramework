document.addEventListener("DOMContentLoaded", function(event){
  if(system.type == "Windows_NT"){
    //
  }else if(system.type == "Linux"){
    //
  }else if(system.type == "Darwin"){
    document.getElementById("_closeWin").setAttribute("macOS", "");
    document.getElementById("_closeWin").classList.remove("click");
    document.getElementById("_maxWin").setAttribute("macOS", "");
    document.getElementById("_maxWin").classList.remove("click");
    document.getElementById("_minWin").setAttribute("macOS", "");
    document.getElementById("_minWin").classList.remove("click");
  }else{
    //
  }
});