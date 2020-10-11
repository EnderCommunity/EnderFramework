global.projectFileName = null;
global.projectPath = null;
const startProcess = (path) => {
  projectPath = path;
  projectFileName = path.substring((__dirname + "\\projects\\").length);
  EnderFramework.menu.show();
  document.getElementById("_editorLayout").style.display = "block";
  document.getElementById("_Errors").innerHTML = "0";
  document.getElementById("_Warnings").innerHTML = "0";
  document.getElementById("_Position").innerHTML = "Ln -, Col -";
  document.getElementById("_Type").innerHTML = "-";
  startFileManager(path + "\\app", function(elements){
    for(var element in elements){
      if(element == "fF"){
        (function(){
          const _element = elements[element];
          setTimeout(function(){
            _element.getElementsByTagName("text")[0].click();
          }, 300);
        })();
      }
      if(element == "sF"){
        (function(){
          const _element = elements[element];
          setTimeout(function(){
            _element.getElementsByTagName("text")[0].click();
          }, 600);
        })();
      }
      if(element == "f"){
        (function(){
          const _element = elements[element];
          setTimeout(function(){
            _element.click();
          }, 900);
        })();
      }
    }
  });
  EnderFramework.topBar.setColor(null);
};