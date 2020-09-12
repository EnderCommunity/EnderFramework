EnderFramework.menu.hide();
EnderFramework.topBar.setColor("var(--Color4)");
//EnderFramework.topBar.title.hide();
const fs = require("fs");
function customText(v){
  //
  return v;
}
function loadAFile(path, type){
  fs.readFile(path, 'utf8', function(err, content){
    if(err){
      //
    }else{
      document.getElementById("_Type").innerHTML = customText(type);
      window.editor.setValue(content);
      window.editor.updateEditingStatus(true);
    }
  });
}