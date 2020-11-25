const dialog_ = function (t, m, d, b) {
  for (var i = 0; i < b.length; i++)
    if (typeof b[i].onclick == "function")
      b[i].onclick = b[i].onclick.toString();
  ipcRenderer.sendToHost('enderframework--dialogs-messagebox', [t, m, d, b]);
}, alert_ = function (t = null, m = null, callback = function () { }) {
  if (m == null) {
    m = t;
    t = "This page says";
  }
  dialog_(t, m, "", [{
    text: "Ok",
    onclick: callback,
    type: "primary"
  }]);
};
module.exports = {
  dialog: dialog_,
  alert: alert_
};