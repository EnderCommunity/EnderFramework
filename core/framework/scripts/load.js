const loadTheWindow = function(){
  firstLoad = true;
  if(manifest.splashScreen)
    document.showSplashScreen();
  setTimeout(function(){
    firstLoad = true;
    _content.setAttribute("src", path.join(manifest.paths.currentApp, "content", (!isSub) ? manifest.start : subInfo.url));
    //
  }, 0);
};
loadTheWindow();