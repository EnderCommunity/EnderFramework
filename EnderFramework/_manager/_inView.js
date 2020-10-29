window.browserViews = {};
const { BrowserView } = require("electron").remote, currentWindow_ = require("electron").remote.getCurrentWindow(), createNewView = (id, coords, contentLink) => {
  const view = new BrowserView(), ID = window.browserViews.length;
  window.browserViews[id] = view;
  currentWindow_.setBrowserView(view);
  /*var bounds = currentWindow_.getBounds(), setBounds = () => {
    //bounds = currentWindow_.getBounds();
    view.setBounds({ x: 0, y: 36, width: bounds.width, height: bounds.height - 36 });
  };
  currentWindow_.on("enter-fullscreen-mode", setBounds);
  currentWindow_.on("leave-fullscreen-mode", setBounds);
  currentWindow_.on("maximize", setBounds);
  currentWindow_.on("unmaximize", setBounds);
  currentWindow_.on("minimize", setBounds);
  currentWindow_.on("resize", setBounds);*/
  view.setBounds({
    x: coords.x,
    y: coords.y,
    width: coords.width,
    height: coords.height
  });
  view.webContents.loadURL(contentLink);
  return ID;
  //
}, updateView = (id, coords, contentLink) => {
  //updateView
  console.log(coords);
  window.browserViews[id].setBounds({
    x: Math.round(coords.x),
    y: Math.round(coords.y),
    width: Math.round(coords.width),
    height: Math.round(coords.height)
  });
};