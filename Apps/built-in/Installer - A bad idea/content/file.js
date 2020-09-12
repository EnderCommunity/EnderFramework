function installTheModules(tPath, id, modules, _callback_ = function(){}, installationProgress, installationMessage, appPaths){
  installationProgress.value = 0;
  installationMessage.innerHTML = "Moving the modules...";
  appPath = appPaths[0];
  var n = 1;
  const loop = function(){
    fs.mkdir(appPath + appPaths[n], { recursive: true }, (error) => {
      if(error){
        //Error!
      }else{
        appPath += appPaths[n] + "\\";
        n++;
        if(n == appPaths.length){
          //
          console.log(appPath);
          var exPath = tPath + "\\executable.bat", fileContent = "cd \"" + tPath + "\"\nmove \"modules\" \"" + appPath + "\n rename \"" + appPath + "\\modules\" \"node_modules\"";
          fs.writeFile(exPath, fileContent, function(error){
            if(error){
              //Error!
            }else{
              var spawn = require('child_process').spawn,
              ls = spawn('cmd.exe', ['/c', exPath]);
              /*ls.stdout.on('data', function (data) {
                console.log('stdout: ' + data);
              });
              ls.stderr.on('data', function (data) {
                console.log('stderr: ' + data);
              });*/
              ls.on('exit', function(code){
                if(code === 0){
                  _callback_();
                }else{
                  ls = spawn('cmd.exe', ['/c', exPath]);
                  ls.on('exit', function(code){
                    if(code === 0){
                      _callback_();
                    }else{
                      //Error!
                      //console.log(code);
                      installationMessage.innerHTML = "The installation process has failed!";
                    }
                  });
                }
              });
            }
          });
          //
        }else{
          loop();
        }
      }
    });
  };
  loop();
  //
}