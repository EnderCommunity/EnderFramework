const _newWindow = () => {
  //
}, _saveCurrentFile = () => {
  window.editor.updateEditingStatus(0);
  (function(){
    window.editor.getModel().autoChange_ = false;
    window.editor.getModel().saved_ = 0;
    fs.writeFile(window.editor.getModel().path_, window.editor.getModel().getValue(), 'utf8', function(err){
      if(err){
        notify("Failed to save this save!");
      }else{
        //
        for(var i = 0; i < window.editor.modifiedFiles_.length; i++){
          if(window.editor.modifiedFiles_[i] == window.editor.getModel()){
            window.editor.modifiedFiles_[i] = undefined;
            if(window.editor.modifiedFiles_.length == 1){
              window.editor.modifiedFiles_ = [];
            }
          }
        }
        //
        window.editor.getModel().element.removeAttribute("modified");
        window.editor.getModel().tab_.removeAttribute("modified");
        window.editor.getModel().isBeingEdited_ = false;
        window.editor.getModel().saved_++;
        updateInfo();
        window.editor.updateEditingStatus(1);
      }
    });
  })();
}, _saveCurrentFileAs = () => {
  /*var name = window.editor.getModel().path_, l = name.replace(/[^\\]/g, "").length, path_____;
  for(var i = 0; i < l; i++)
    name = name.substring(name.indexOf("\\") + 1);
    path_____ = window.editor.getModel().path_.replace(name, "");*/
  (function(){
    dialog.showSaveDialog(null, {
      title: "EnderStudio | Save As",
      defaultPath: window.editor.getModel().path_
    }).then(function(e){
      if(!e.canceled && e.filePath !== ""){
        fs.writeFile(e.filePath, window.editor.getModel().getValue(), 'utf8', function(err){
          console.log(e.filePath);
          if(err){
            console.log(err);
            notify("Failed to save this file!");
          }else{
            console.log(e.filePath);
            if(e.filePath.length >= projectPath.length && e.filePath.substring(0, projectPath.length) === projectPath){
              var loop = setInterval(() => {
                //Look for the element!
              }, 10);
            }
          }
        });
      }
      //
    });
    //
  })();
  //
}, _saveAllFiles = () => {
  if(window.editor.modifiedFiles_.length !== 0 && window.editor.modifiedFiles_.length !== undefined){
    window.editor.updateEditingStatus(false);
    var done = 0, done_ = function(){
      if(done == window.editor.modifiedFiles_.length){
        window.editor.modifiedFiles_ = [];
        updateInfo();
        window.editor.updateEditingStatus(true);
      }
    };
    for(var i = 0; i < window.editor.modifiedFiles_.length; i++){
      if(window.editor.modifiedFiles_[i] !== undefined){
        (function(){
          const number = i;
          window.editor.modifiedFiles_[number].autoChange_ = false;
          window.editor.modifiedFiles_[number].saved_ = 0;
          fs.writeFile(window.editor.modifiedFiles_[number].path_, window.editor.modifiedFiles_[number].getValue(), 'utf8', function(err){
            if(err){
              //
            }else{
              done++;
              window.editor.modifiedFiles_[number].element.removeAttribute("modified");
              window.editor.modifiedFiles_[number].tab_.removeAttribute("modified");
              window.editor.modifiedFiles_[number].isBeingEdited_ = false;
              window.editor.modifiedFiles_[number].saved_++;
              window.editor.modifiedFiles_[number] = undefined;
              //window.editor.restoreViewState(window.editor.viewState_);
              done_();
            }
          });
        })();
      }else{
        done++;
        done_();
      }
    }
  }
}, _undo = () => {
  window.editor.trigger('aaaa', 'undo', 'aaaa');
  window.editor.focus();
}, _redo = () => {
  window.editor.trigger('aaaa', 'redo', 'aaaa');
  window.editor.focus();
}, _newFile = () => {
  //
}, _run = (mode) => {
  //
}, _newProcess = (type, dir) => {
  //
}, _autoSave = (state) => {
  //
}, _closeTheProject = () => {
  //
}, _closeTheEditor = () => {
  //
}, _cut = () => {
  window.editor.focus()
  window.editor.trigger('source','editor.action.clipboardCutAction');
}, _copy = () => {
  window.editor.focus()
  window.editor.trigger('source','editor.action.clipboardCopyAction');
}, _paste = () => {
  window.editor.focus()
  window.editor.trigger('source','editor.action.clipboardPasteAction');
}, _find = () => {
  window.editor.getAction('actions.find').run();
}, _commandPalette = () => {
  window.editor.trigger('anyString', 'editor.action.quickCommand');
}, _findInFiles = () => {
  //
}, _replace = () => {
  window.editor.getAction('editor.action.startFindReplaceAction').run();
}, _replaceInFiles = () => {
  //
}, _formatDocument = () => {
  window.editor.getAction('editor.action.formatDocument').run();
}, _changeAll = () => {
  window.editor.focus();
  window.editor.getAction('editor.action.changeAll').run();
  window.editor.focus();
}, _rename = () => {
  window.editor.focus()
  window.editor.getAction('editor.action.rename').run();
}, _quickOutline = () => {
  window.editor.focus()
  window.editor.getAction('editor.action.quickOutline').run();
}, _terminal = () => {
  //
}, _build = (type) => {
  //
}, _about = () => {
  //
};