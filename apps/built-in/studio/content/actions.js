const notify = (v) => {
    alert(v);
};
var saveButton = document.getElementById("_saveButton"),
    saveAllButton = document.getElementById("_saveAllButton"),
    newFileButton = document.getElementById("_newFileButton");
document.onkeydown = function(evt) {
    if (!evt)
        evt = event;
    if (evt.ctrlKey && evt.altKey && evt.keyCode == 83) {
        if (!saveAllButton.hasAttribute("disabled")) {
            saveAllButton.click();
        }
    } else if (evt.ctrlKey && evt.keyCode == 83) {
        if (!saveButton.hasAttribute("disabled")) {
            saveButton.click();
        }
    }
};
newFileButton.addEventListener("click", function() {
    //
});
saveButton.addEventListener("click", function() {
    _saveCurrentFile();
});
saveAllButton.addEventListener("click", function() {
    _saveAllFiles();
});