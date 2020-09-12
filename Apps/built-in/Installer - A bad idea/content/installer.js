const dropArea = document.getElementById('FileSelector'), fs = require("fs");
dropArea.addEventListener('change', (event) => {
  getAFile(event.target.files[0]);
});
dropArea.addEventListener('dragover', (event) => {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
});
dropArea.addEventListener('drop', (event) => {
  event.stopPropagation();
  event.preventDefault();
  getAFile(event.dataTransfer.files[0]);
});
const loadingDiv = document.getElementById("loading"), dropAndSelectDiv = document.getElementById("COfDropOSelect"), infoDiv = document.getElementById("info");
function getAFile(data){
  dropAndSelectDiv.style.display = "none";
  loadingDiv.style.display = "block";
  //console.log(data.name);
  //console.log(data.path);
  //console.log((data.size/1e+6).toFixed(2) + " MB");
  const randomNumber = Math.floor(Math.random()*Math.floor(99999999999999)), unzipper = require("unzipper"), appTPath = path_ + "temporaryFiles\\" + randomNumber + "-" + data.name.substring(0, data.name.length - 4);
  fs.createReadStream(data.path).pipe(unzipper.Extract({ path: appTPath })).promise().then(function(){
    let data_ = fs.readFileSync(appTPath + "\\info.json");
    var data__ = null;
    data__ = JSON.parse(data_);
    var a = setInterval(function(){
      if(data__ != null){
        clearInterval(a);
        document.getElementById("_title").innerHTML = "Do you want to install " + data__.name + "?";
        document.getElementById("_publisher").innerHTML = "Publisher: " + data__.publisher;
        document.getElementById("_version").innerHTML = "Version: " + data__.version;
        document.getElementById("_type").innerHTML = "Type: " + data__.type;
        window["name"] = data__.name;
        window["description"] = data__.description;
        document.getElementById("info--icon").src = "../temporaryFiles/" + randomNumber + "-" + data.name.substring(0, data.name.length - 4) + "/resources/" + ((document.getElementsByTagName("html")[0].getAttribute("prefers-color-scheme") == "dark") ? "dark/" : "light/") + data__.icon;
        var permissions, modules;
        fs.readFile(appTPath + "\\system_requirements.json", 'utf8', function(err, contents){
          console.log(JSON.parse(contents));
        });
        fs.readFile(appTPath + "\\permissions.data", 'utf8', function(err, contents){
          //
          if(err){
            //
          }else{
            permissions = contents;
            fs.readFile(appTPath + "\\modules.data", 'utf8', function(err2, contents2){
              if(err2){
                //
              }else{
                modules = contents2;
                //console.log(permissions);
                //console.log(modules);
                document.getElementById("_install").addEventListener("click", function(){
                  document.getElementById("info").style.display = "none";
                  document.getElementById("_installationScreen").style.display = "block";
                  setTimeout(function(){
                    install(appTPath, data__.id, modules, permissions);
                  }, 500);
                });
                var COfModules = document.getElementById("_modules"), COfPermissions = document.getElementById("_capabilites");
                var tModules = modules, tPermissions = permissions, modulesInfo = [], permissionInfo = [];
                var length_ = tModules.replace(/[^\n]/g, "").length + 1;
                for(var ix = 0; ix < length_; ix++){
                  var command = tModules.substring(0, tModules.indexOf("\n"));
                  command = command.replace(/\s/g, "");
                  command = command.substring(0, (command.indexOf("##") > -1) ? command.indexOf("##") : command.length);
                  if(command.indexOf("install") > -1 && command.indexOf("uninstall") < 0){
                    command = command.substring(command.indexOf("`") + 1);
                    var moduleName = command.substring(0, command.indexOf("`"));
                    modulesInfo[modulesInfo.length] = moduleName;
                  }
                  tModules = tModules.substring(tModules.indexOf("\n") + 1);
                }
                length_ = tPermissions.replace(/[^\n]/g, "").length + 1;
                for(var ix = 0; ix < length_; ix++){
                  var command = tPermissions.substring(0, tPermissions.indexOf("\n"));
                  command = command.replace(/\s/g, "");
                  command = command.substring(0, (command.indexOf("##") > -1) ? command.indexOf("##") : command.length);
                  if(command.indexOf("request") > -1 && command.indexOf("remove") < 0){
                    command = command.substring(command.indexOf("`") + 1);
                    var permissionName = command.substring(0, command.indexOf("`"));
                    permissionInfo[permissionInfo.length] = permissionName;
                  }
                  tPermissions = tPermissions.substring(tPermissions.indexOf("\n") + 1);
                }
                for(var i = 0; i < modulesInfo.length; i++){
                  var element = document.createElement("h4");
                  element.innerHTML = modulesInfo[i];
                  COfModules.appendChild(element);
                }
                if(modulesInfo.length == 0){
                  var element = document.createElement("h4");
                  element.innerHTML = "None";
                  COfModules.appendChild(element);
                }
                for(var i = 0; i < permissionInfo.length; i++){
                  var element = document.createElement("h4");
                  element.innerHTML = (function(){
                    if(permissionInfo[i] == "location"){
                      return "- Access this device's location";
                    }else if(permissionInfo[i] == "camera"){
                      return "- Take pictures and record videos";
                    }else if(permissionInfo[i] == "microphone"){
                      return "- Record audio";
                    }else if(permissionInfo[i] == "notifications"){
                      return "- Send notifications";
                    }else if(permissionInfo[i] == "web_access"){
                      return "- Open websites within the app";
                    }else if(permissionInfo[i] == "usb_devices"){
                      return "- Access your USB devices";
                    }else if(permissionInfo[i] == "file_editing"){
                      return "- Edit files";
                    }else if(permissionInfo[i] == "clipboard"){
                      return "- Access your clipboard";
                    }else if(permissionInfo[i] == "insecure_content"){
                      return "- Load insecure content";
                    }else if(permissionInfo[i] == "storage"){
                      return "- Access photos, videos, and files on your device";
                    }else{
                      return "-[" + permissionInfo[i] + "] - there is no such permission";
                    }
                  })();
                  COfPermissions.appendChild(element);
                }
                if(permissionInfo.length == 0){
                  var element = document.createElement("h4");
                  element.innerHTML = "None";
                  COfPermissions.appendChild(element);
                }
                loadingDiv.style.display = "none";
                infoDiv.style.display = "block";
                getDirSize(appTPath + "\\content\\");
              }
            });
          }
        });
      }
    }, 100);
  }, function(e){
    //Error
  });
}