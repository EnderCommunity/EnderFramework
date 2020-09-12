function getFileType_(file){
  var v = file, length = file.replace(/[^.]/g, "").length;
  for(var i = 0; i <= length; i++){
    file = file.substring(file.indexOf(".") + 1);
    if(i == length){
      v = file;
    }
  }
  return v.toUpperCase();
}
function getFileType(file){
  var v = file, length = file.replace(/[^.]/g, "").length;
  for(var i = 0; i <= length; i++){
    file = file.substring(file.indexOf(".") + 1);
    if(i == length){
      v = file.toLowerCase();
    }
  }
  var path = __dirname + "\\icons\\" + ((document.getElementsByTagName("html")[0].getAttribute("prefers-color-scheme") == "light") ? "light" : "dark") + "\\";
  if(v == "js" || v == "html" || v == "css"){
    path = path + "file-code.svg";
  }else if(v == "sql" || v == "db"){
    path = path + "database.svg";
  }else if(v == "mp3" || v == "mp4" || v == "ogg" || v == "mp4" || v == "webm" || v == "gif" || v == "avi" || v == "mov" || v == "m4p " || v == "m4v" || v == "mpg"){
    path = path + "file-media.svg";
  }else if(v == "pdf"){
    path = path + "file-pdf.svg";
  }else if(v == "zip" || v == "rar"){
    path = path + "file-zip.svg";
  }else if(v == "json"){
    path = path + "json.svg";
  }else if(v == "key"){
    path = path + "key.svg";
  }else{
    path = path + "file.svg";
  }
  return path;
}
function startFileManager(dir){
  (function(){
    const fs = require("fs"), filesC = document.getElementById("_fileExplorer");
    const pathLoop = function(path, mainDiv){
      fs.readdir(path, function (err, files){
        if(err){
          //Error
        }else{
          files.forEach(function(file){
            var v = fs.lstatSync(path + "\\" + file);
            if(v.isFile()){
              var item = document.createElement("div"), img = document.createElement("img"), text = document.createElement("text");
              item.classList.add("item");
              img.src = getFileType(file);
              text.innerHTML = file;
              item.appendChild(img);
              item.appendChild(text);
              item.path = path + "\\" + file;
              item.type = getFileType_(file);
              mainDiv.appendChild(item);
              item.addEventListener("click", function(){
                loadAFile(this.path, this.type);
              });
            }else{
              var folder = document.createElement("div"), icon = document.createElement("icon"), text = document.createElement("text"), content = document.createElement("div");
              folder.classList.add("folder");
              content.classList.add("content");
              text.innerHTML = file;
              folder.appendChild(icon);
              folder.appendChild(text);
              folder.appendChild(content);
              folder.setAttribute("notopened", "");
              icon.mainDiv = folder;
              text.mainDiv = folder;
              icon.addEventListener("click", function(){
                if(this.mainDiv.hasAttribute("opened")){
                  this.mainDiv.removeAttribute("opened");
                  this.mainDiv.setAttribute("notopened", "");
                }else{
                  this.mainDiv.removeAttribute("notopened");
                  this.mainDiv.setAttribute("opened", "");
                }
              });
              text.addEventListener("click", function(){
                if(this.mainDiv.hasAttribute("opened")){
                  this.mainDiv.removeAttribute("opened");
                  this.mainDiv.setAttribute("notopened", "");
                }else{
                  this.mainDiv.removeAttribute("notopened");
                  this.mainDiv.setAttribute("opened", "");
                }
              });
              mainDiv.insertBefore(folder, mainDiv.firstChild);
              pathLoop(path + "\\" + file + "\\", content);
            }
          });
        }
      });
    };
    pathLoop(dir, filesC);
  })();
}