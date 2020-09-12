var lastModel = null, saveButton, saveAllButton, breadcrumb;
document.addEventListener("DOMContentLoaded", function(){
  saveButton = document.getElementById("_saveButton");
  saveAllButton = document.getElementById("_saveAllButton");
  breadcrumb = document.getElementById("_bar");
});
function sharedCode(cModel){
  if(lastModel != null){
    if(!lastModel.isBeingEdited_ && !lastModel.lockTab_){
      lastModel.tab_.style.display = "none";
      document.getElementById("_tabs").appendChild(lastModel.tab_);
    }else{
      if(lastModel.tab_.style.display == "none"){
        document.getElementById("_tabs").appendChild(lastModel.tab_);
      }
      lastModel.tab_.style.display = "inline-block";
      lastModel.lockTab_ = true;
    }
  }
  cModel.tab_.style.display = "inline-block";
  if(cModel.isBeingEdited_){
    saveButton.removeAttribute("disabled");
  }else{
    saveButton.setAttribute("disabled", "");
  }
  if(window.editor.modifiedFiles_.length > 0){
    saveAllButton.removeAttribute("disabled");
  }else{
    saveAllButton.setAttribute("disabled", "");
  }
  breadcrumb.innerHTML = "";
  var cD = window.editor.getModel().path_.substring((__dirname + "\\projects\\" + projectFileName + "\\").length), length = cD.replace(/[^\\]/g, "").length;
  for(var i = 0; i <= length; i++){
    var elm = document.createElement("crumb");
    if(i != length){
      elm.innerHTML = cD.substring(0, cD.indexOf("\\"));
    }else{
      elm.innerHTML = cD;
    }
    breadcrumb.appendChild(elm);
    cD = cD.substring(cD.indexOf("\\") + 1);
  }
  lastModel = cModel
}
function updateInfo(){
  const cModel = window.editor.getModel();
  sharedCode(cModel);
}
function startMonitoring(){
  window.editor.onDidChangeModel(function(){
    const cModel = window.editor.getModel();
    sharedCode(cModel);
  });
  window.editor.onDidChangeModelContent(function(){
    //
  });
}