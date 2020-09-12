/*window.addEventListener("DOMContentLoaded", function(){
  setTimeout(function(){
    (function(){
      const path = require('path');
      const amdLoader = require('../../../../node_modules/monaco-editor/min/vs/loader.js');
      const amdRequire = amdLoader.require;
      const amdDefine = amdLoader.require.define;
      function uriFromPath(_path) {
        var pathName = path.resolve(_path).replace(/\\/g, '/');
        if(pathName.length > 0 && pathName.charAt(0) !== '/') {
          pathName = '/' + pathName;
        }
        return encodeURI('file://' + pathName);
      }
      var loop = setInterval(function(){
        if(path_ != null){
          clearInterval(loop);
          console.log(0);
          amdRequire.config({
            baseUrl: uriFromPath(path_.replace("\\Apps\\built-in\\Studio\\", "\\node_modules\\monaco-editor\\min"))
          });
          self.module = undefined;
          const element = document.getElementById("_editor");
          amdRequire(['vs/editor/editor.main'], function(){
            window.editor = monaco.editor.create(element, {
              value: "",
              language: "javascript",
              theme: (document.getElementsByTagName("html")[0].getAttribute("prefers-color-scheme") == "light") ? "vs": "vs-dark",
              acceptSuggestionOnEnter: "smart",
              quickSuggestions: true,
              wordBasedSuggestions: true,
              autoClosingBrackets: true,
              autoClosingOvertype: true,
              autoClosingQuotes: true,
              automaticLayout: true,
              colorDecorators: true,
              contextmenu: true,
              tabCompletion: true
            });
          });
        }
      }, 10);
    })();
  }, 0);
});*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const { fstat } = require("fs");
const app = electron_1.app;
const BrowserWindow = electron_1.BrowserWindow;
const dialog = electron_1.dialog;
amdRequire(['vs/editor/editor.main'], () => {
  onModuleLoaded();
});0
function onModuleLoaded(){
  window.editor = monaco.editor.create(document.getElementById('_editor'), {
    value: "",
    language: "plaintext",
    theme: (document.getElementsByTagName("html")[0].getAttribute("prefers-color-scheme") == "light") ? "vs": "vs-dark",
    acceptSuggestionOnEnter: "smart",
    quickSuggestions: true,
    wordBasedSuggestions: true,
    autoClosingBrackets: true,
    autoClosingOvertype: true,
    autoClosingQuotes: true,
    automaticLayout: true,
    colorDecorators: true,
    contextmenu: false,
    tabCompletion: false,
    readOnly: true
  });
  window.editor.updateEditingStatus = (v) => {
    window.editor.updateOptions({ readOnly: !v })
    if(v)
      document.getElementById("_editor").removeAttribute("disabled_");
    else
      document.getElementById("_editor").setAttribute("disabled_", "");
  };
  const postion = document.getElementById("_Position");
  window.editor.onDidChangeCursorPosition(function(e){
    postion.innerHTML = "Ln " + e.position.lineNumber + ", Col " + e.position.column;
  });
}