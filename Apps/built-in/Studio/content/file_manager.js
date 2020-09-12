const chokidar = require('chokidar');
const { deflateRawSync } = require('zlib');
var addedFilesAndFolders = [];
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
function startFileManager(dir, callback = function(){}){
  var elements = {}, foundContent1 = false, foundContent2 = false, done = false, n = 0;
  (function(){
    const fs = require("fs"), filesC = document.getElementById("_fileExplorer").getElementsByClassName("c")[0];
    const pathLoop = function(path, mainDiv){
      fs.readdir(path, function (err, files){
        if(err){
          //Error
        }else{
          files.forEach(function(file){
            var v = fs.lstatSync(path + "\\" + file), _info = {};
            if(v.isFile()){
              var item = document.createElement("div"), img = document.createElement("img"), text = document.createElement("text");
              item.classList.add("item");
              img.src = getFileType(file);
              item.icon = getFileType(file);
              text.innerHTML = file;
              item.appendChild(img);
              item.appendChild(text);
              item.path = path + "\\" + file;
              item.type = getFileType_(file);
              item.textElement = text;
              mainDiv.appendChild(item);
              item.addEventListener("click", function(){
                loadAFile(this.path, this.type, this);
              });
              _info.p = path + "\\" + file;
              _info.e = item;
              addedFilesAndFolders[addedFilesAndFolders.length] = _info;
              //var elements = [], foundContent1 = false, foundContent2 = false;
              //console.log(file == "_main.html");
              //console.log(path);
              //console.log(path.substring(path.indexOf("app\\content\\\\content\\") + "app\\content\\\\content\\".length) == "");
              if(file == "_main.html" && path.substring(path.indexOf("app\\content\\content") + "app\\content\\content".length) == "" && n < 3){
                item.lockTheTab = true;
                (function(){
                  const file = item;
                  elements.f = file;
                })();
                n++;
                //callback(elements);
              }
            }else{
              var folder = document.createElement("div"), icon = document.createElement("icon"), text = document.createElement("text"), content = document.createElement("div");
              folder.classList.add("folder");
              content.classList.add("content");
              text.innerHTML = file;
              folder.appendChild(icon);
              folder.appendChild(text);
              folder.appendChild(content);
              folder._contentElement = content;
              folder.setAttribute("notopened", "");
              if(!foundContent2 && foundContent1){
                if(file == "content"){
                  foundContent2 = true;
                  (function(){
                    const _sF = folder;
                    elements.sF = _sF;
                  })();
                  n++;
                }
              }
              if(!foundContent1){
                if(file == "content"){
                  foundContent1 = true;
                  (function(){
                    const _fF = folder;
                    elements.fF = _fF;
                  })();
                  n++;
                }
              }
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
              //
              _info.p = path + "\\" + file;
              _info.e = folder;
              addedFilesAndFolders[addedFilesAndFolders.length] = _info;
              //
              //
              //
              // Initialize watcher.
              (function(){
                //
                const folderPath = path + "\\" + file, check = (path) => {
                  var doesExist = false, object = null;
                  for(var i = 0; i < addedFilesAndFolders.length; i++)
                    if(addedFilesAndFolders[i].p === path){
                      doesExist = true;
                      object = addedFilesAndFolders[i];
                    }
                  return {_: doesExist, __: object};
                }, addDirectory = (path) => {
                  //
                  console.log("---------");
                  console.log(path);
                  console.log(true);
                  console.log("---------");
                }, addFile = (path) => {
                  //
                  console.log("---------");
                  console.log(path);
                  //
                  var dir = path, l = path.replace(/[^\\]/g, "").length;
                  for(var ix = 0; ix < l; ix++)
                    dir = dir.substring(dir.indexOf("\\") + 1);
                  dir = path.replace(dir, "");
                  dir = dir.substring(0, dir.length - 1);
                  console.log(dir);
                  var c = check(dir);
                  console.log(c);
                  if(c._){
                    (function(){
                      var _info = {}, file = path.substring(dir.length + 1), item = document.createElement("div"), img = document.createElement("img"), text = document.createElement("text");
                      item.classList.add("item");
                      img.src = getFileType(file);
                      item.icon = getFileType(file);
                      text.innerHTML = file;
                      item.appendChild(img);
                      item.appendChild(text);
                      item.path = path;
                      item.type = getFileType_(file);
                      console.log(c.__.e._contentElement);
                      var options = c.__.e._contentElement.getElementsByClassName("item"), done = false;
                      for(var ix = 0; ix < options.length; ix++){
                        if(!done && options[ix].getElementsByTagName("text")[0].innerHTML >= text && options[ix].parentElement === c.__.e._contentElement){//Fix this!
                          done = true;
                          console.log(item);
                          console.log(options[ix]);
                          c.__.e._contentElement.insertBefore(item, options[ix]);//Fix this!
                        }
                      }
                      if(!done){
                        c.__.e._contentElement.appendChild(item);
                        done = true;
                      }
                      //
                      item.addEventListener("click", function(){
                        loadAFile(this.path, this.type, this);
                      });
                      _info.p = path;
                      _info.e = item;
                      addedFilesAndFolders[addedFilesAndFolders.length] = _info;
                    })();
                    //
                  }else{
                    //Error!
                  }
                  //
                  console.log(true);
                  console.log("---------");
                }, removeDirectory = (data) => {
                  //
                  console.log("---------");
                  console.log(data);
                  console.log(true);
                  console.log("---------");
                }, removeFile = (data) => {
                  //
                  console.log("---------");
                  console.log(data);
                  if(data.__.e.model === undefined){
                    try{ data.__.e.outerHTML = ""; }catch{};
                  }else{
                    //remove the tab and the model!
                    console.log(data.__.e.model.tab_);
                    if(!data.__.e.model.lockTab_ && !data.__.e.model.isOpened_){
                      data.__.e.model.tab_.outerHTML = "";
                      data.__.e.model = undefined;
                      try{ data.__.e.outerHTML = ""; }catch{};
                    }else{
                      try{ data.__.e.outerHTML = ""; }catch{};
                      if(data.__.e.model.tab_.textElement.innerHTML.substring(0, "Deleted - ".length) !== "Deleted - "){
                        //data.__.e.textElement.innerHTML = "Deleted - " + data.__.e.textElement.innerHTML;
                        data.__.e.model.tab_.textElement.innerHTML = "Deleted - " + data.__.e.model.tab_.textElement.innerHTML;
                      }
                      data.__.e.model.lockTab_ = true;
                      //
                      //Do something, the file is opened! Or maybe it's being edited!
                      //data.__.e.model.isOpened_
                      //data.__.e.model.isBeingEdited_
                    }
                  }
                  //
                  //document.getElementsByClassName("item")[44].model.tab_
                  //<div class=​"tab" style=​"display:​ inline-block;​" selected>​…​</div>​
                  //
                  console.log(true);
                  console.log("---------");
                }, change = (data) => {
                  //
                  console.log(false);
                }, watcher = chokidar.watch(folderPath, { persistent: true });
                watcher.on('addDir', path => {
                  console.log(`Directory ${path} has been added`);
                  //var o = check(path);
                  if(!check(path)._){
                    addDirectory(path);
                  }
                }).on('unlinkDir', path => {
                  console.log(`Directory ${path} has been removed`);
                  var o = check(path);
                  if(o._){
                    removeDirectory(o);
                  }
                }).on('add', path => {
                  console.log(`File ${path} has been added`);
                  //var o = check(path);
                  if(!check(path)._){
                    addFile(path);
                  }
                }).on('unlink', path => {
                  console.log(`File ${path} has been removed`);
                  var o = check(path);
                  if(o._){
                    removeFile(o);
                  }
                }).on('change', path => {
                  var o = check(path);
                  if(o._){
                    change(o);
                  }
                });
                //
              })();
              //
              //
              pathLoop(path + "\\" + file, content);
            }
            if(foundContent1 && foundContent2 && n == 3 && !done){
              done = true;
              callback(elements);
            }
          });
        }
      });
    };
    pathLoop(dir, filesC);
  })();
}