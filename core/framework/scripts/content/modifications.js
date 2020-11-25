module.exports = function () {
  setTimeout(function () {
    var switchEls = document.getElementsByTagName("switch");
    for (var i = 0; i < switchEls.length; i++) {
      switchEls[i].addEventListener("click", function () {
        if (this.getAttribute("active") == "false")
          this.setAttribute("active", "true");
        else if (this.getAttribute("active") == "true")
          this.setAttribute("active", "false");
      });
    }
  }, 0);
  var Inputs = document.getElementsByTagName("input");
  if (Inputs.length > 0) {
    global.ContextMenuElement_ = undefined;
  }
  for (var i = 0; i < Inputs.length; i++) {
    var v = Inputs[i].getAttribute("type");
    if (v == null || v == "text" || v == "email" || v == "number" || v == "search" || v == "tel" || v == "url") {
      Inputs[i].addEventListener('contextmenu', e => {
        ContextMenuElement_ = e.target;
        ipcRenderer.sendToHost('enderframework--contextmenu-defaults', {
          X: e.clientX,
          Y: e.clientY,
          type: "input"
        });
      });
    } else if (Inputs[i].getAttribute("type") == "password") {
      Inputs[i].addEventListener('contextmenu', e => {
        ContextMenuElement_ = e.target;
        ipcRenderer.sendToHost('enderframework--contextmenu-defaults', {
          X: e.clientX,
          Y: e.clientY,
          type: "password"
        });
      });
    }
  }
  (function () {
    var a = document.getElementsByTagName("a");
    for (var i = 0; i < a.length; i++)
      if (a[i].hasAttribute("href") && a[i].getAttribute("href").substring(0, 4) == "http" && a[i].getAttribute("target") != "_blank") {
        a[i].setAttribute("Xhref", a[i].getAttribute("href"));
        a[i].removeAttribute("href");
        a[i].addEventListener("click", function () {
          ipcRenderer.sendToHost('do--openawebpage', this.getAttribute("Xhref"));
        });
      }
  })();
  var buttons = document.getElementsByTagName("button");
  for (var i = 0; i < buttons.length; i++) {
    Array.prototype.slice.call(buttons[i].attributes).forEach(function (item) {
      if (item.name == "warn") {
        var settings = JSON.parse(item.value);
        buttons[i].settings = settings;
        buttons[i].addEventListener("click", function () {
          const settings = this.settings;
          EnderFramework.dialog.messageBox({
            title: "Warning",
            message: settings.message,
            buttons: [{
              text: "cancel",
              onclick: settings.ondisagree
            }, {
              text: "ok",
              type: "warn",
              onclick: settings.onagree
            }],
            details: ""
          });
        });
      }
    });
  }
};