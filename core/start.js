require('v8-compile-cache');
const { app } = require('electron');
if(handleSquirrelEvent(app)){
  return;
}
global.os = require('os');
global.path = require('path');
global.paths = {
  main: path.join(__dirname, ".."),
  core: __dirname,
  apps: path.join(__dirname, "../apps"),
  currentUser: {
    homedir: os.homedir(),
    desktop: path.join(os.homedir(), "Desktop"),
    downloads: path.join(os.homedir(), "Downloads"),
    documents: path.join(os.homedir(), "Documents"),
    videos: path.join(os.homedir(), "Videos"),
    music: path.join(os.homedir(), "Music"),
    pictures: path.join(os.homedir(), "Pictures"),
  }
};
global.toast = require("./toast");
global.manifest = {};
console.log(paths);
//const types = require("./types");
//console.log(types.check("string", "afwawfa"));
//console.log(types.check("string", 0));
//console.log(types.check("integer", "0"));
//console.log(types.check("integer", 0));
//const check = require('check-types');
app.commandLine.appendSwitch('--enable-audio-service-sandbox');
app.commandLine.appendSwitch('--ssl-version-fallback-min', 'tls1.2');
app.commandLine.appendSwitch('js-flags', '--max-old-space-size=8192');
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
//app.commandLine.appendSwitch("--enable-transparent-visuals");
app.commandLine.appendSwitch("--disable-renderer-backgrounding");
app.commandLine.appendSwitch('--enable-features', 'OverlayScrollbar, ElasticOverscrollWin');
var done = false, appPath = paths.apps;
const windowManager = require("./window");
app.on("ready", function(){
  for(var i = 0; i < process.argv.length; i++){
    if(process.argv[i].includes("--start=")){
    //if(true){
      done = true;
      var appID = process.argv[i].replace(/\s/g, '').substring(8), length = appID.replace(/[^.]/g, "").length;
      //var appID = "com.enderadel.test", length = appID.replace(/[^.]/g, "").length;
      //var appID = "com.enderadel.test2", length = appID.replace(/[^.]/g, "").length;
      //var appID = "com.enderadel.CommandPrompt", length = appID.replace(/[^.]/g, "").length;
      appPath = path.join(appPath, "installed");
      for(var i2 = 0; i2 <= length; i2++){
        appPath = path.join(appPath, appID.substring(0, (appID.indexOf(".") > -1) ? appID.indexOf(".") : appID.length));
        appID = appID.substring(appID.indexOf(".") + 1);
      }
      windowManager.createWindow(appPath);
      break;
    }else if(process.argv[i] == "--store"){
    //}else if(true){
      done = true;
      appPath = path.join(appPath, "built-in", "store");
      windowManager.createWindow(appPath);
      break;
    }else if(process.argv[i] == "--installer"){
    //}else if(true){
      done = true;
      appPath = path.join(appPath, "built-in", "installer");
      windowManager.createWindow(appPath);
      break;
    }else if(process.argv[i] == "--studio"){
    //}else if(true){
      done = true;
      appPath = path.join(appPath, "built-in", "studio");
      windowManager.createWindow(appPath);
      break;
    }else if(process.argv[i] == "--settings"){
    //}else if(true){
      done = true;
      appPath = path.join(appPath, "built-in", "settings");
      windowManager.createWindow(appPath);
      break;
    }
  }
  if(!done){
    var init = require("./initiate");
    init.paths = paths;
    init.autoLaunch("EnderServices", false, function(){
      toast.notify("An error occurred!", "Failed to set up the auto launch process.");
    });
    //init.shortcuts("minimal");
    //init.shortcuts("normal");
    init.shortcuts("developer");
    process.exit(0);
  }
});
app.on('renderer-process-crashed', function(){
  toast.notify("An error occurred!", "The renderer process crashed.");
  setTimeout(function(){
    process.exit(0);
  }, 1000);
});
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin')
    app.quit();
});
const { ipcMain } = require('electron');
ipcMain.on('CloseEnderFramework', (event, arg) => {
  app.quit();
});
ipcMain.on('data', (event, arg) => {
  event.returnValue = manifest;
});
app.on('will-finish-launching', () => {
  //start background activites
});
function handleSquirrelEvent(application){
  if(process.argv.length === 1){
    return false;
  }
  const ChildProcess = require('child_process');
  const path = require('path');
  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);
  const spawn = function(command, args){
    let spawnedProcess, error;
    try{
      spawnedProcess = ChildProcess.spawn(command, args, {
        detached: true
      });
    }catch(error){}
    return spawnedProcess;
  };
  const spawnUpdate = function(args){
    return spawn(updateDotExe, args);
  };
  const squirrelEvent = process.argv[1];
  switch(squirrelEvent){
    case '--squirrel-install':
    case '--squirrel-updated':
      spawnUpdate(['--createShortcut', exeName]);
      setTimeout(application.quit, 1000);
      return true;
    case '--squirrel-uninstall':
      spawnUpdate(['--removeShortcut', exeName]);
      setTimeout(application.quit, 1000);
      return true;
    case '--squirrel-obsolete':
      application.quit();
      return true;
  }
}