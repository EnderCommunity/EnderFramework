const
  storage = require('electron-json-storage'),
  toast = require("./toast"),
  { app, nativeTheme } = require("electron"),
  path = require("path"),
  os = require("os"),
  url = require('url');

module.exports = {
  createWindow: (contentPath) => {
    storage.setDataPath(contentPath);

    storage.get('manifest', function (error, data) {
      if (error) {
        toast.notify("An error occurred!", "Faild to access the manifest file.");
        process.exit(0);
      } else {
        const { BrowserWindow } = (data.window.type == "acrylic") ? require("electron-acrylic-window") : require("electron");
        
        if (data.hardware != undefined && data.hardware.highGPUPerformance)
          app.commandLine.appendSwitch("--force_high_performance_gpu");
        else
          app.commandLine.appendSwitch("--force_low_power_gpu");
          nativeTheme.themeSource = "system";
        
        if (data.content.colorScheme != null)
          nativeTheme.themeSource = data.content.colorScheme;
        
        if (data.content.redirectAnimationsCooldown > 5000) {
          console.warn(`The maximum value that can be assigned to the redirect animations cooldown is 5000ms (5s). The given value (${data.content.redirectAnimationsCooldown}ms) will be reset to 5000ms!`);
          data.content.redirectAnimationsCooldown = 5000;
        }
        
        if (data.window != null) {
          win = new BrowserWindow({
            title: data.name,
            width: data.window.width,
            height: data.window.height,
            center: true,
            frame: false,
            show: false,
            icon: path.join(contentPath, "resources", "icons", "main.ico"),
            webPreferences: {
              devTools: data.enable.devTools,
              nodeIntegration: true,
              nodeIntegrationInWorker: false,
              nodeIntegrationInSubFrames: false,
              preload: path.join(paths.core, "framework", "scripts", "preload.js"),
              sandbox: false,
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
              spellcheck: data.enable.spellcheck,
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
            paintWhenInitiallyHidden: false,//This may break some things...
            transparent: false,
            titleBarStyle: "custom",
            vibrancy: (data.window.type == "acrylic") ? ((os.platform == "win32") ? {
              theme: (nativeTheme.shouldUseDarkColors) ? '#01010100' : '#ffffff00',
              effect: 'acrylic',
              disableOnBlur: false
            } : "appearance-based") : false
          });
          
          if (data.window.type != "acrylic")
            win.setBackgroundColor((nativeTheme.shouldUseDarkColors) ? '#101010' : '#f7f7f7');
          
          win.webContents.openDevTools({ mode: 'undocked' });
          //win.webContents.openDevTools({mode: 'docked'});
          win.contentPath = contentPath;
          win.setMenu(null);
          
          const { screen } = require('electron');
          var dimensions = screen.getPrimaryDisplay().size;
          
          dimensions.width = Math.round((dimensions.width - data.window.minWidth) / 2);
          dimensions.height = Math.round((dimensions.height - data.window.minHeight) / 2);
          
          win.setPosition(dimensions.width, dimensions.height);
          
          win.loadURL(url.format({
            pathname: path.join(paths.core, 'framework', 'window.html'),
            protocol: "file",
            slashes: true
          }));
          
          win.on('closed', () => {
            win = null;
          });
          
          win.on('unresponsive', () => {
            toast.notify("The app is unresponsive!", "The app is getting closed.");
            app.quit();
          });
          
          win.setResizable(data.window.resizable);
          
          win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
            Object.assign(options, {
              show: false
            });
          });
          
          data.content.protocol;//Do something with this!
          manifest = data;
          manifest.paths = paths;
          manifest.paths.currentApp = contentPath;
          global.paths = manifest.paths;
          
          return win;
        } else {
          toast.notify("An error occurred!", "This is a corrupted/incomplete manifest.");
          process.exit(0);
        }
      }
    });
  }
};