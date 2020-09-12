var notify;
isFrameworkReady = false;
(function(){
  "strict-mode";
  const { ipcRenderer } = require('electron');
  notify = (t) => {
    ipcRenderer.sendToHost('do--notify', t);
  }
})();
isFrameworkReady = true;