window_CrashScreen_CloseButton.onclick = function(){
  app.exit();
};
window_CrashScreen_RestartButton.onclick = function(){
  app.relaunch();
  app.exit();
};