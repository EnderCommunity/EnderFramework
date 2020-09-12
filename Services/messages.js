const { ipcRenderer } = require("electron");
var coverBeingUsedBy = {menu: false}, isMenuShown = false, isCoverBeningUsed = function(){
  for(var i in coverBeingUsedBy)
    if(coverBeingUsedBy[i] == true)
      return true;
  return false;
};
function showCover(){
  document.body.classList.add("AlertsC");
}
document.getElementById("_backgroundcover").addEventListener("click", function(){
  isMenuShown = false;
  coverBeingUsedBy.menu = false;
  document.getElementById("_menu").style.display = "none";
  if(!isCoverBeningUsed()){
    document.body.classList.remove("AlertsC");
    window.isClickable(false);
  }
});
ipcRenderer.on("endermessage", function(event, args){
  if(args.action == "menu"){
    if(isMenuShown){
      isMenuShown = false;
      coverBeingUsedBy.menu = false;
      document.getElementById("_menu").style.display = "none";
      if(!isCoverBeningUsed()){
        document.body.classList.remove("AlertsC");
        window.isClickable(false);
      }
    }else{
      isMenuShown = true;
      coverBeingUsedBy.menu = true;
      document.body.classList.add("AlertsC");
      window.isClickable(true);
      document.getElementById("_menu").style.display = "block";
    }
  }
});