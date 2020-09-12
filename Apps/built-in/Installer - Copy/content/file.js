function createExecutableFile(path, modules, callback = function(){}, installationProgress){
  var fileContent = "cd " + path_.replace("Apps\\built-in\\Installer\\", "") + "\n";
  for(var i = 0; i < modules.length; i++){
    fileContent += "npm install " + modules[i] + "\n";
  }
  installationProgress.value = 0.5;
  fs.writeFile(path + "\\executable.bat", fileContent, function(error){
    if(error){
      //
    }else{
      installationProgress.value = 1;
      callback();
    }
  });
}