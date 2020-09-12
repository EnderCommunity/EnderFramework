var codeboxes = document.getElementsByTagName("codebox");
window.codebox = [];
for(var i = 0; i < codeboxes.length; i++){
  var mode_ = codeboxes[i].getAttribute("mode");
  var startValue_ = codeboxes[i].getAttribute("startValue");
  var autocomplete_ = codeboxes[i].getAttribute("autocomplete");
  if(autocomplete_ !== undefined && autocomplete_ !== null){
    autocomplete_ = "autocomplete";
  }else{
    autocomplete_ = "";
  }
  window.codebox[i] = CodeMirror(codeboxes[i], {
    extraKeys: {"Ctrl-Space": autocomplete_},
    theme: "theme-codebox",
    mode: mode_,
    lineNumbers: true,
    autoCloseTags: true,
    matchBrackets: true,
    value: (startValue_ !== undefined && startValue_ != null) ? startValue_ : "",
    indentUnit: 2,
    smartIndent: true,
    tabSize: 4,
    indentWithTabs: false,
    rtlMoveVisually: false,
    lineWrapping: false,
    firstLineNumber: 1,
    lineNumberFormatter: function(line){
      return "" + line;
    },
    scrollbarStyle: "native",
    coverGutterNextToScrollbar: false,
    readOnly: false,
    showCursorWhenSelecting: true,
    lineWiseCopyCut: true,
    autofocus: false,
    dragDrop: true,
    allowDropFileTypes: null,
    cursorHeight: 1,
    resetSelectionOnContextMenu: true,
    maxHighlightLength: Infinity,
    spellcheck: false,
    viewportMargin: 10,
    autocapitalize: false
  });
  window.codebox[i].setSize("100%", "100%");
  if(autocomplete_ == "autocomplete"){
    window.codebox[i].on("keyup", function(cm, e){
      if(e.keyCode >= 65 && e.keyCode <= 90)
        CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
    });
  }
  eval("codebox_" + i + "(window['codebox-" + (i + 1) + "'], CodeMirror);");
}