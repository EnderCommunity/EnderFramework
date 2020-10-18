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
amdRequire(['vs/editor/editor.main'], () => {
  onModuleLoaded();
});
function onModuleLoaded(){
  window.editor = monaco.editor.create(document.getElementById('_editor'), {
    value: "",
    language: "plaintext",
    theme: (document.getElementsByTagName("html")[0].getAttribute("prefers-color-scheme") == "light") ? "vs": "vs-dark",
    acceptSuggestionOnEnter: "on",
    quickSuggestions: true,
    wordBasedSuggestions: true,
    autoClosingBrackets: true,
    autoClosingOvertype: true,
    autoClosingQuotes: true,
    automaticLayout: true,
    colorDecorators: true,
    contextmenu: false,
    fontSize: "16px",
    readOnly: true,
    model: null
  });
  //window.editor.modifiedFiles_ = 0;
  window.editor.modifiedFiles_ = [];
  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  window.createModel = monaco.editor.createModel;
  window.editor.saveViewState();
  /*const defModel = monaco.editor.createModel(
    "const helloWorld = () => { return \"Hello World!\"; }",
    "javascript"
  );
  console.log(defModel);*/
  //monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  //monaco.languages.typescript.typescriptDefaults.addExtraLib();
  window.editor.updateEditingStatus = (v) => {
    if(v == 0 || v == 1){
      window.editor.updateOptions({ readOnly: !((v == 0) ? false : true) })
    }else{
      window.editor.updateOptions({ readOnly: !v })
    }
    if(v === true){
      document.getElementById("_editor").removeAttribute("disabled_");
      document.getElementsByTagName("loading")[0].removeAttribute("top");
    }else if(v === false){
      document.getElementById("_editor").setAttribute("disabled_", "");
      document.getElementsByTagName("loading")[0].setAttribute("top", "");
    }else if(v === 1){
      document.getElementById("_editor").removeAttribute("disabled_");
      document.getElementsByTagName("loading")[0].style.display = "block";
    }else if(v === 0){
      document.getElementById("_editor").setAttribute("disabled_", "");
      document.getElementsByTagName("loading")[0].style.display = "none";
    }
    if(v == 0 || v == false){
      document.getElementById("_bottomBar").setAttribute("EditorBlocked", "");
      var elms = document.getElementById("_bottomBar").querySelectorAll("*");
      for(var i = 0; i < elms.length; i++){
        if(!elms[i].classList.contains("right")){
          elms[i].classList.add("glitch");
        }
      }
    }else{
      document.getElementById("_bottomBar").removeAttribute("EditorBlocked");
      var elms = document.getElementById("_bottomBar").querySelectorAll("*");
      for(var i = 0; i < elms.length; i++){
        if(!elms[i].classList.contains("right")){
          elms[i].classList.remove("glitch");
        }
      }
    }
  };
  const postion = document.getElementById("_Position");
  window.editor.onDidChangeCursorPosition(function(e){
    postion.innerHTML = "Ln " + e.position.lineNumber + ", Col " + e.position.column;
  });
  monaco.languages.register({ id: 'enderdata' });
  monaco.languages.setMonarchTokensProvider('enderdata', {
    tokenizer: {
      root: [
        [/install*/, "keyword"],
        [/uninstall*/, "keyword"],
        [/request*/, "keyword"],
        [/remove*/, "keyword"],
        [/`[a-zA-Z 0-9_-]+`/, "string"],
        [/##.*/, "comment"]
      ]
    }
  });
  monaco.languages.registerCompletionItemProvider('enderdata', {
    provideCompletionItems: () => {
      var suggestions = [{
        label: 'install',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'install ~ `${1:name}`',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
        label: 'uninstall',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'uninstall ~ `${1:name}`',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
        label: 'request',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'request ~ `${1:name}`',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
        label: 'remove',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'remove ~ `${1:name}`',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }];
      return { suggestions: suggestions };
    }
  });
  startMonitoring();
  //
  EnderFramework.contextMenu.create([{
    type: "function",
    functionName: "_quickOutline",
    title: "Go to Symbol..."
  }, {
    type: "divider"
  }, {
    type: "function",
    functionName: "_rename",
    title: "Rename Symbol"
  }, {
    type: "function",
    functionName: "_changeAll",
    title: "Change All Occurrences"
  }, {
    type: "function",
    functionName: "_formatDocument",
    title: "Format Document"
  }, {
    type: "divider"
  }, {
    type: "action",
    actionName: "Cut",
    title: "Cut"
  }, {
    type: "action",
    actionName: "Copy",
    title: "Copy"
  }, {
    type: "action",
    actionName: "Paste",
    title: "Paste"
  }, {
    type: "divider"
  }, {
    type: "function",
    functionName: "_commandPalette",
    title: "Command Palette"
  }], function(error, menu){
    console.log(error);
    menu.attachTo(document.getElementById('_editor'), true);
  });
  //
}