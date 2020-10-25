require('v8-compile-cache');
var done = false;
//var done = false, runOS = false;//EnderOS
const { screen } = require('electron'), path = require("path"), { ipcMain, nativeTheme } = require('electron'), url = require("url"), storage = require('electron-json-storage'), electron = require("electron"), WindowsToaster = require('node-notifier').WindowsToaster, app = electron.app;
//
// Module to control application life. (this variable should already exist)
// this should be placed at top of main.js to handle setup events quickly
if(handleSquirrelEvent(app)) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}
//
var windowType = "normal";
(function(){
  const startPath = __dirname.replace("AppScripts", ""), {BrowserWindow} = require("electron"), notifier =  new WindowsToaster({
    withFallback: false,
    customPath: undefined
  }), createAWindow = (path_) => {
    storage.setDataPath(path_);
    storage.get('_manifest', function(error, data){
      //console.log(data.hardware);
      if(data.hardware.highGPUPerformance){
        app.commandLine.appendSwitch("--force_high_performance_gpu");
      }else{
        app.commandLine.appendSwitch("--force_low_power_gpu");
      }
      appName = data.name;
      nativeTheme.themeSource = "system";
      if(data.content.colorScheme != null){
        nativeTheme.themeSource = data.content.colorScheme;
      }
      setTimeout(function(){
        enableSplashScreen = data.splashScreen;
        enableDevTools = data.enable.devTools;
        enableSpellcheck = data.enable.spellcheck;
        enableWebview = data.enable.webview;
        enableJavaScript = data.enable.JavaScript;
        enableRedirectAnimations = data.content.redirectAnimations;
        _redirectCooldown = data.content.redirectAnimationsCooldown;
        theMenuOfTheWindow = data.menu;
        infoScreen = data.content.infoScreen;
        maximizeOnStart_ = data.window.maximizeOnStart;
        appDFTOS[0] = data.name;
        appDFTOS[1] = data.version;
        appDFTOS[2] = data.publisher;
        __contextMenu = data.content.contextMenu;
        serverConnectionURLs[0] = data.server.bugTracking;
        serverConnectionURLs[1] = data.server.feedback;
        serverConnectionURLs[2] = data.server.bugReporting;
        _coverOnMax = data.content.coverOnMaximize;
        if(_redirectCooldown > 1000){
          console.warn("The maximum value that can be assigned to the redirect animations cooldown is 1000 (1s). The given value (" + _redirectCooldown + ") will be reset to 1000!");
          _redirectCooldown = 1000;
        }
        theme = data.content.theme;
        if(data.window != null){
          win = new BrowserWindow({
            title: data.name,
            width: data.window.width,
            height: data.window.height,
            center: true,
            frame: false,
            show: false,
            icon: path.join(path_, "\\resources\\_icon.ico"),
            //icon: undefined,
            webPreferences: {
              worldSafeExecuteJavaScript: true,
              devTools: data.enable.devTools,
              nodeIntegration: true,
              nodeIntegrationInWorker: true,
              nodeIntegrationInSubFrames: true,
              preload: path.join(startPath, 'EnderFramework\\_manager\\_preload.js'),
              sandbox: false,//Find a way to change it to true
              enableRemoteModule: true,
              javascript: true,
              webSecurity: true,
              allowRunningInsecureContent: false,
              images: true,
              textAreasAreResizable: false,
              webgl: data.enable.WebGL,
              plugins: data.enable.plugins,
              experimentalFeatures: false,
              offscreen: false,
              contextIsolation: false,
              nativeWindowOpen: false,
              autoplayPolicy: "no-user-gesture-required",
              spellcheck: false,
              webviewTag: true
            },
            resizable: true,
            maximizable: data.window.isMaximizable,
            minimizable: data.window.isMinimizable,
            closable: data.window.isClosable,
            fullscreenable: data.window.isFullscreenable,
            minHeight: data.window.minHeight,
            minWidth: data.window.minWidth,
            maxWidth: data.window.maxWidth,
            maxHeight: data.window.maxHeight,
            paintWhenInitiallyHidden: true,
            transparent: false,
            titleBarStyle: "customButtonsOnHover",
            thickFrame: true
            /*vibrancy: (data.window.type == "acrylic") ? {
              theme: (nativeTheme.shouldUseDarkColors) ? '#1010107D' : '#f7f7f77D',
              effect: 'acrylic',
              disableOnBlur: false
            } : false*/
          });
          windowType = data.window.type;
          //const { setVibrancy } = require("electron-acrylic-window");
          console.log(data.window.type);
          if(data.window.type != "acrylic")
            win.setBackgroundColor((nativeTheme.shouldUseDarkColors) ? '#151515' : '#F5F5F5');
          //
          //win.webContents.openDevTools({mode:'undocked'});
          win.webContents.openDevTools({mode: 'docked'});
          //win.webContents.openDevTools();
          win.hide();
          win.startPath = startPath;
          //else
          //  win.setBackgroundColor('#00000000');
          win.setMenu(null);
          //const { screen } = require('electron');
          var d = screen.getPrimaryDisplay().size;
          d.width = Math.round((d.width - data.window.minWidth)/2);
          d.height = Math.round((d.height - data.window.minHeight)/2);
          win.setPosition(d.width, d.height);
          //if(data.enable.devTools)
          //  win.webContents.openDevTools();
          win.loadURL(url.format({
            pathname: path.join(startPath, 'EnderFramework\\_manager\\_window.html'),
            //pathname: path.join('C:\\Users\\win10\\Desktop\\test\\electron-acrylic-window\\test\\test.html'),
            protocol: "file",
            slashes: true
          }));
          win.on('closed', () => {
            win = null;
          });
          win.on('unresponsive', () => {
            app.quit();
          });
          win.setResizable(data.window.resizable);
          //if(data.window.maximizeOnStart)
          //  win.maximize();
          //
          win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
            Object.assign(options, {
              show: false
            });
            //event.newGuest = new BrowserWindow(options)
          })
          //
          return win;
        }
        data.content.protocol;//Do something with this!
      }, 0);
    });
  };
  //app.commandLine.appendSwitch('--flag-switches-begin');
  app.commandLine.appendSwitch('--enable-audio-service-sandbox');
  app.commandLine.appendSwitch('--ssl-version-fallback-min', 'tls1.2');
  app.commandLine.appendSwitch('disable-features', 'cookies-without-samesite-must-be-secure');
  app.commandLine.appendSwitch('enable-features', 'same-site-by-default-cookies');
  //app.commandLine.appendSwitch('enable-features', 'elastic-overscroll-win');
  //app.commandLine.appendSwitch("--elastic-overscroll-win");
  app.commandLine.appendSwitch('js-flags', '--max-old-space-size=8192');
  app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
  app.commandLine.appendSwitch("--enable-transparent-visuals");
  app.commandLine.appendSwitch("--disable-http2");
  app.commandLine.appendSwitch("--disable-renderer-backgrounding");
  app.commandLine.appendSwitch('--enable-features', 'OverlayScrollbar');
  //app.commandLine.appendSwitch('--flag-switches-end');
  global.enableDevTools = false;
  global.enableSpellcheck = false;
  global.enableWebview = false;
  global.enableJavaScript = true;
  global.enableRedirectAnimations = true;
  global._redirectCooldown = true;
  global.theme = "_default";
  global.startPath = path.join(__dirname);
  global.enableSplashScreen = true;
  global.theMenuOfTheWindow = "none";
  global.infoScreen = true;
  global.maximizeOnStart_ = true;
  global.appDFTOS = [];
  global.__contextMenu = true;
  global.serverConnectionURLs = [null, null, null];
  global.appPath = startPath + "Apps\\installed\\";
  global.appName = null;
  global._coverOnMax = "none";
  for(var i = 0; i < process.argv.length; i++){
    if(process.argv[i].includes("--start=")){
    //if(true){
      done = true;
      var appID = process.argv[i].replace(/\s/g, '').substring(8), length = appID.replace(/[^.]/g, "").length;
      //var appID = "com.enderadel.test", length = appID.replace(/[^.]/g, "").length;
      //var appID = "com.enderadel.test2", length = appID.replace(/[^.]/g, "").length;
      //var appID = "com.enderadel.CommandPrompt", length = appID.replace(/[^.]/g, "").length;
      for(var i2 = 0; i2 <= length; i2++){
        appPath += appID.substring(0, (appID.indexOf(".") > -1) ? appID.indexOf(".") : appID.length) + "\\";
        appID = appID.substring(appID.indexOf(".") + 1);
      }
      //process.env.NODE_PATH+=':/includes/plugin:/includes/plugin/a';
      createAWindow(appPath);
      break;
    }else if(process.argv[i] == "--store"){
      done = true;
      appPath = startPath + "Apps\\built-in\\Store\\";
      createAWindow(appPath);
      break;
    }else if(process.argv[i] == "--installer"){
    //}else if(true){
      done = true;
      appPath = startPath + "Apps\\built-in\\Installer\\";
      createAWindow(appPath);
      break;
    }else if(process.argv[i] == "--studio"){
    //}else if(true){
      done = true;
      appPath = startPath + "Apps\\built-in\\Studio\\";
      createAWindow(appPath);
      break;
    }else if(process.argv[i] == "--settings"){
      done = true;
      appPath = startPath + "Apps\\built-in\\Settings\\";
      createAWindow(appPath);
      break;
    }
    /*else if(process.argv[i] == "--file-explorer"){
      done = true;
      appPath = startPath + "Apps\\built-in\\FileExplorer\\";
      createAWindow(appPath);
      break;
    }*/
    /*else if(process.argv[i] == "--assistant"){
      done = true;
      appPath = startPath + "Apps\\built-in\\Assistant\\";
      createAWindow(appPath);
      break;
    }*/
  }
  /*if(!done){
    done = true;
    appPath = startPath + "Apps\\built-in\\Installer\\";
    createAWindow(appPath);
  }*/
  if(!done){
  //if(!done && !runOS){
    appPath = startPath + "Services\\";
    //start EnderServices background process
    var AutoLaunch = require('auto-launch');
    var autoLauncher = new AutoLaunch({
      name: 'EnderServices'
    });
    (async function(){
      return autoLauncher.isEnabled();
    })().then(function(v){
      if(!v)
        autoLauncher.enable()
      autoLauncher.disable();//remove this line later
    });
    notifier.notify({
      title: 'EnderServcies',
      message: "You're signed in as Adel Sbeh (adel@example.com)",
      icon: path.join(startPath, "Services/User/1/profilePhoto.png"),
      id: undefined,
      appID: "EnderServices"
    });
  }/*else if(runOS){
    runOS = null;
  }*/
  //app.disableHardwareAcceleration();
  app.on("ready", function(){
    if(!done){
    //if(!done && runOS !== null){
      let overlayWindow = new BrowserWindow({
        title: "EnderServices",
        show: false,
        width: 800,
        height: 600, 
        transparent: true,
        frame:false,
        icon: path.join(appPath, "resources\\_icon.ico"),
        webPreferences: {
          devTools: true,
          nodeIntegration: true,
          nodeIntegrationInWorker: true,
          nodeIntegrationInSubFrames: true,
          preload: path.join(appPath, "preload.js"),
          blinkFeatures: 'OverlayScrollbars'
        },
        skipTaskbar: true,
        resizable: false,
        movable: false,
        alwaysOnTop: true
      });
      overlayWindow.setSkipTaskbar(true);
      overlayWindow.setIgnoreMouseEvents(true);
      overlayWindow.setAlwaysOnTop(true, 'screen');
      overlayWindow.setFullScreen(true);
      //overlayWindow.webContents.openDevTools();
      overlayWindow.loadURL(appPath + "overlay.html");
      //overlayWindow.webContents.openDevTools()
      overlayWindow.on('closed', function(){
        overlayWindow = null;
      });
      const { globalShortcut } = require('electron');
      app.whenReady().then(() => {
        globalShortcut.register('CommandOrControl+M', () => {
          overlayWindow.webContents.send('endermessage', {'action': 'menu'});
        });
      });
    }/*else if(runOS === null){
      //console.log("run!");
      let OSWindow = new BrowserWindow({
        title: "EnderOS",
        frame: false,
        fullscreen: true,
        skipTaskbar: true,
        alwaysOnTop: true,
        kiosk: true,
        autoHideMenuBar: true,
        webPreferences: {
          devTools: true,
          nodeIntegration: true,
          nodeIntegrationInWorker: true,
          nodeIntegrationInSubFrames: true,
          preload: path.join(__dirname.replace("AppScripts", ""), "EnderOS", "start.js")
        }
      });
      OSWindow.setSkipTaskbar(true);
      OSWindow.loadURL(__dirname.replace("AppScripts", "") + "EnderOS\\c.html");
      //overlayWindow.webContents.openDevTools()
      OSWindow.on('closed', function(){
        OSWindow = null;
      });
      //
    }*/
  });
  app.on('renderer-process-crashed', function(){
    notifier.notify({
      title: 'EnderServcies',
      message: 'The renderer process has crashed!'
    });
  });
  app.on('window-all-closed', () => {
    if(process.platform !== 'darwin')
      app.quit();
  });
  ipcMain.on('CloseEnderFramework', (event, arg) => {
    app.quit();
  });
  ipcMain.on('data', (event, arg) => {
    event.returnValue = [enableDevTools, enableSpellcheck, enableJavaScript, enableRedirectAnimations, _redirectCooldown, theme, startPath, enableSplashScreen, theMenuOfTheWindow, infoScreen, appDFTOS, __contextMenu, serverConnectionURLs, appPath, maximizeOnStart_, windowType, enableWebview, _coverOnMax];
  });
  /*ipcMain.on('setAcrylicLight', (event, arg) => {
    setVibrancy(win, {
      theme: 'appearance-based',
      effect: 'acrylic',
      useCustomWindowRefreshMethod: true,
      maximumRefreshRate: 60,
      disableOnBlur: true
    });
  });
  ipcMain.on('setAcrylicDark', (event, arg) => {
    setVibrancy(win, {
      theme: 'appearance-based',
      effect: 'acrylic',
      useCustomWindowRefreshMethod: true,
      maximumRefreshRate: 60,
      disableOnBlur: true
    });
  });*/
  /*app.setUserTasks([{
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }]);*/
  app.on('will-finish-launching', () => {
    //start background activites
  });
  const createDesktopShortcut = require('create-desktop-shortcuts');
  const os = require('os'), desktop = os.homedir() + "\\Desktop";
  ipcMain.on('createadesktopshortcut', (event, args) => {
    createDesktopShortcut({
      onlyCurrentOS: true,
      verbose: true,
      windows: {
        filePath: process.execPath,
        outputPath: desktop,
        name: args.name,
        description: args.description,
        icon: args.icon,
        arguments: '--start=' + args.id,
        windowMode: 'normal',
        comment: 'EnderFramework app'
      }
    });
    createDesktopShortcut({
      onlyCurrentOS: true,
      verbose: true,
      windows: {
        filePath: process.execPath,
        outputPath: __dirname + "\\Apps\\built-in\\Installer\\shortcuts\\",
        name: args.name,
        description: args.description,
        icon: args.icon,
        arguments: '--start=' + args.id,
        windowMode: 'normal',
        comment: 'EnderFramework app'
      }
    });
  });
})();
if(!done && done !== null){
  const createDesktopShortcut_ = require('create-desktop-shortcuts'), os_ = require('os'), desktop_ = os_.homedir() + "\\Desktop";
  createDesktopShortcut_({
    onlyCurrentOS: true,
    verbose: true,
    windows: {
      filePath: process.execPath,
      outputPath: desktop_,
      name: "EnderSettings",
      description: "",
      icon: __dirname.replace("\\AppScripts", "") + "\\Apps\\built-in\\Settings\\resources\\_icon.ico",
      arguments: "--settings",
      windowMode: 'normal',
      comment: 'EnderFramework app'
    }
  });
  createDesktopShortcut_({
    onlyCurrentOS: true,
    verbose: true,
    windows: {
      filePath: process.execPath,
      outputPath: desktop_,
      name: "EnderStore",
      description: "",
      icon: __dirname.replace("\\AppScripts", "") + "\\Apps\\built-in\\Store\\resources\\_icon.ico",
      arguments: "--store",
      windowMode: 'normal',
      comment: 'EnderFramework app'
    }
  });
  /*createDesktopShortcut_({
    onlyCurrentOS: true,
    verbose: true,
    windows: {
      filePath: process.execPath,
      outputPath: desktop_,
      name: "EnderExplorer",
      description: "",
      icon: __dirname.replace("\\AppScripts", "") + "\\Apps\\built-in\\FileExplorer\\resources\\_icon.ico",
      arguments: "--file-explorer",
      windowMode: 'normal',
      comment: 'EnderFramework app'
    }
  });*/
  createDesktopShortcut_({
    onlyCurrentOS: true,
    verbose: true,
    windows: {
      filePath: process.execPath,
      outputPath: desktop_,
      name: "EnderInstaller",
      description: "",
      icon: __dirname.replace("\\AppScripts", "") + "\\Apps\\built-in\\Installer\\resources\\_icon.ico",
      arguments: "--installer",
      windowMode: 'normal',
      comment: 'EnderFramework app'
    }
  });
  /*createDesktopShortcut_({
    onlyCurrentOS: true,
    verbose: true,
    windows: {
      filePath: process.execPath,
      outputPath: desktop_,
      name: "EnderAssistant",
      description: "",
      icon: __dirname.replace("\\AppScripts", "") + "\\Apps\\built-in\\Assistant\\resources\\_icon.ico",
      arguments: "--assistant",
      windowMode: 'normal',
      comment: 'EnderFramework app'
    }
  });*/
  createDesktopShortcut_({
    onlyCurrentOS: true,
    verbose: true,
    windows: {
      filePath: process.execPath,
      outputPath: desktop_,
      name: "EnderStudio",
      description: "",
      icon: __dirname.replace("\\AppScripts", "") + "\\Apps\\built-in\\Studio\\resources\\_icon.ico",
      arguments: "--studio",
      windowMode: 'normal',
      comment: 'EnderFramework app'
    }
  });
}












































function handleSquirrelEvent(application){
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
      let spawnedProcess, error;

      try {
          spawnedProcess = ChildProcess.spawn(command, args, {
              detached: true
          });
      } catch (error) {}

      return spawnedProcess;
  };

  const spawnUpdate = function(args) {
      return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
      case '--squirrel-install':
      case '--squirrel-updated':
          // Optionally do things such as:
          // - Add your .exe to the PATH
          // - Write to the registry for things like file associations and
          //   explorer context menus

          // Install desktop and start menu shortcuts
          spawnUpdate(['--createShortcut', exeName]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-uninstall':
          // Undo anything you did in the --squirrel-install and
          // --squirrel-updated handlers

          // Remove desktop and start menu shortcuts
          spawnUpdate(['--removeShortcut', exeName]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-obsolete':
          // This is called on the outgoing version of your app before
          // we update to the new version - it's the opposite of
          // --squirrel-updated

          application.quit();
          return true;
  }
}














app.on('ready', () => {
  var processor_ = require('./../Processor/start.js');
  processor_.powerMonitor();
});