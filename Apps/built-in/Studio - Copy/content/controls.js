function enableUndoButton(){
  //
}
function disableRedoButton(){
  //
}
const initialVersion = editor.getModel().getAlternativeVersionId();
let currentVersion = initialVersion;
let lastVersion = initialVersion;
editor.onDidChangeModelContent(e => {
  const versionId = editor.getModel().getAlternativeVersionId();
  // undoing
  if(versionId < currentVersion){
    enableRedoButton();
    // no more undo possible
    if(versionId === initialVersion){
      disableUndoButton();
    }
  }else{
    // redoing
    if(versionId <= lastVersion){
      // redoing the last change
      if(versionId == lastVersion){
        disableRedoButton();
      }
    }else{ // adding new change, disable redo when adding new changes
      disableRedoButton();
      if(currentVersion > lastVersion){
        lastVersion = currentVersion;
      }
    }
    enableUndoButton();
  }
  currentVersion = versionId;
});
function undo(){
  editor.trigger('aaaa', 'undo', 'aaaa');
  editor.focus();
}
function redo(){
  editor.trigger('aaaa', 'redo', 'aaaa');
  editor.focus();
}