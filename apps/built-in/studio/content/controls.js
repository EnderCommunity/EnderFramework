var undoButton, redoButton;
document.addEventListener("DOMContentLoaded", function() {
    undoButton = document.getElementById("_undoButton");
    redoButton = document.getElementById("_redoButton");
});

function enableUndoButton() {
    undoButton.removeAttribute("disabled");
}

function disableUndoButton() {
    undoButton.setAttribute("disabled", "");
}

function enableRedoButton() {
    redoButton.removeAttribute("disabled");
}

function disableRedoButton() {
    redoButton.setAttribute("disabled", "");
}

function startControls() {
    window.editor.getModel().initialVersion_ = window.editor.getModel().getAlternativeVersionId();
    window.editor.getModel().currentVersion_ = window.editor.getModel().initialVersion_;
    window.editor.getModel().lastVersion_ = window.editor.getModel().initialVersion_;
    const sharedCode = e => {
        window.editor.getModel().versionId_ = window.editor.getModel().getAlternativeVersionId();
        // undoing
        if (window.editor.getModel().versionId_ < window.editor.getModel().currentVersion_) {
            enableRedoButton();
            // no more undo possible
            if (window.editor.getModel().versionId_ === window.editor.getModel().initialVersion_) {
                disableUndoButton();
            }
        } else {
            // redoing
            if (window.editor.getModel().versionId_ <= window.editor.getModel().lastVersion_) {
                // redoing the last change
                if (window.editor.getModel().versionId_ == window.editor.getModel().lastVersion_) {
                    disableRedoButton();
                }
            } else { // adding new change, disable redo when adding new changes
                disableRedoButton();
                if (window.editor.getModel().currentVersion_ > window.editor.getModel().lastVersion_) {
                    window.editor.getModel().lastVersion_ = window.editor.getModel().currentVersion_;
                }
            }
            enableUndoButton();
        }
        window.editor.getModel().currentVersion_ = window.editor.getModel().versionId_;
    };
    window.editor.onDidChangeModel(function(e) {
        sharedCode(e);
    });
    window.editor.onDidChangeModelContent(function(e) {
        sharedCode(e);
    });
}