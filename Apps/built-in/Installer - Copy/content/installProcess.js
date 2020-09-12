const { ipcRenderer } = require('electron');

function install(TPath, id, modules, permissions){
  const ID = id, installationProgress = document.getElementById("installationProgress"), installationMessage = document.getElementById("installationMessage");
  installationProgress.value = 0;
  installationMessage.innerHTML = "Preparing for the modules' installation process...";
  //console.log(TPath);
  //console.log(id);
  //console.log(modules);
  //console.log(permissions);
  var appPath = path_.replace("built-in\\Installer\\", "") + "installed\\", length = id.replace(/[^.]/g, "").length, originalID = id;
  for(var i2 = 0; i2 <= length; i2++){
    appPath += id.substring(0, (id.indexOf(".") > -1) ? id.indexOf(".") : id.length) + "\\";
    id = id.substring(id.indexOf(".") + 1);
  }
  fs.stat(appPath, (error, stats) => { 
    if (error) { 
      console.log(error); 
    } 
    else { 
      console.log("Stats object for: example_file.txt"); 
      console.log(stats); 
    
      // Using methods of the Stats object 
      console.log("Path is file:", stats.isFile()); 
      console.log("Path is directory:", stats.isDirectory()); 
    } 
  });
  //console.log(appPath);
  createExecutableFile(TPath, modules, function(){
    installationProgress.removeAttribute("value");
    installationMessage.innerHTML = "Installing modules...";
    const { execFile } = require('child_process');
    const child = execFile(TPath + "\\executable.bat", ['--version'], (error, stdout, stderr) => {
      if(error){
        //Failed to install the modules!
        installationMessage.innerHTML = "The installation process has failed!";
      }else{
        installationMessage.innerHTML = "Preparing for the app files to be moved...";
        var length = originalID.replace(/[^.]/g, "").length, newPath = path_.replace("built-in\\Installer\\", "") + "installed", done = 0;
        for(var i2 = 0; i2 <= length; i2++){
          newPath += "\\" + originalID.substring(0, (originalID.indexOf(".") > -1) ? originalID.indexOf(".") : originalID.length);
          originalID = originalID.substring(originalID.indexOf(".") + 1);
          fs.mkdir(newPath, function(err){
            if(err){
              if(fs.existsSync(newPath))
                done++;
              else{
                //Failed!
              }
            }else{
              done++;
            }
            if(done >= length + 1){
              installationProgress.value = 0;
              installationMessage.innerHTML = "Copying the app files...";
              var currentSize = 0;
              const pathLoop = function(path, newPath){
                fs.readdir(path, function (err, files){
                  if(err){
                    //Error
                  }
                  files.forEach(function(file){
                    var v = fs.lstatSync(path + file);
                    if(v.isFile()){
                      fs.copyFile(path + file, newPath + file, (err) => {
                        if(err){
                          //Failed
                        }else{
                          currentSize += v.size;
                          installationProgress.value = currentSize/totalSize;
                          if(currentSize == totalSize){
                            setTimeout(function(){
                              installationProgress.removeAttribute("value");
                              installationMessage.innerHTML = "Managing the app permissions...";
                              permissions;
                              sendPermissions(id, permissions, function(){
                                installationMessage.innerHTML = "Sending a list of the app modules to EnderServices...";
                                sendModules(id, modules, function(){
                                  installationMessage.innerHTML = "Cleaning up...";
                                  const del = require('del');
                                  (async () => {
                                    try{
                                      var path = path_ + "temporaryFiles\\";
                                      await del(path);
                                      installationMessage.innerHTML = "Finishing up...";
                                      function finish(){
                                        const ipcRenderer = require('electron').ipcRenderer;
                                        ipcRenderer.send("createadesktopshortcut", {
                                          id: ID,
                                          name: window["name"],
                                          description: window["description"],
                                          icon: appPath + "resources\\_icon.ico"
                                        });
                                        document.getElementById("_installationScreen").style.display = "none";
                                        document.getElementById("_installed").style.display = "block";
                                      }
                                      fs.mkdir(path, function(err){
                                        if(err){
                                          if(fs.existsSync(path)){
                                            finish();
                                          }
                                        }else{
                                          finish();
                                        }
                                      });
                                    }catch{
                                      //Error
                                    }
                                  })();
                                });
                              });
                            }, 500);
                          }
                        }
                      });
                    }else{
                      fs.mkdir(newPath + file + "\\", function(err){
                        if(err){
                          if(fs.existsSync(newPath + file + "\\")){
                            pathLoop(path + file + "\\", newPath + file + "\\");
                          }
                        }else{
                          pathLoop(path + file + "\\", newPath + file + "\\");
                        }
                      });
                    }
                  });
                });
              };
              pathLoop(TPath + "\\content\\", appPath);
            }
          });
        }
      }
    });
  }, installationProgress);
}