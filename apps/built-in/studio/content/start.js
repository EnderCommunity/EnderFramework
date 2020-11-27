const dialog = require("electron").remote.dialog;
EnderFramework.window.menu.hide();
EnderFramework.window.topBar.setColor("transparent");
//EnderFramework.topBar.title.hide();
const fs = require("fs");

function customText(v) {
    if (v == "JS")
        return "JavaScript"
    if (v == "DATA")
        return "EnderData File";
    return v;
}

function customText_(v) {
    if (v == "JS")
        return "javascript";
    if (v == "HTML" || v == "CSS" || v == "JSON" || v == "SQL")
        return v.toLowerCase();
    if (v == "DATA")
        return "enderdata";
    return "plaintext";
}

function loadAFile(path, type, element) {
    fs.readFile(path, 'utf8', function(err, content) {
        if (err) {
            if (element.model === undefined) {
                return 0;
            }
        }
        //}else{
        //
        if (window.editor.getModel() !== null) {
            window.editor.getModel().isOpened_ = false;
        }
        //
        document.getElementById("_Type").innerHTML = customText(type);
        window.editor.updateEditingStatus(true);
        if (element.model !== undefined) {
            var tabs = document.getElementById("_tabs").getElementsByClassName("tab");
            for (var i = 0; i < tabs.length; i++) {
                tabs[i].removeAttribute("selected");
            }
            element.model.isOpened_ = true;
            element.model.tab_.setAttribute("selected", "");
            window.editor.getModel().viewState_ = window.editor.saveViewState();
            window.editor.setModel(element.model);
            if (element.model.viewState_ !== undefined) {
                window.editor.restoreViewState(element.model.viewState_);
            }
        } else {
            var length = path.replace(/[^\\]/g, "").length,
                name = path;
            for (var i = 0; i <= length; i++) {
                name = name.substring(name.indexOf("\\") + 1);
            }
            //name;
            var allTabs = document.getElementById("_tabs").getElementsByClassName("tab");
            for (var i = 0; i < allTabs.length; i++) {
                allTabs[i].removeAttribute("selected");
            }
            var tabs = document.getElementById("_tabs"),
                newTab = document.createElement("div"),
                img = document.createElement("img"),
                text = document.createElement("text"),
                closeButton = document.createElement("icon");
            newTab.classList.add("tab");
            text.innerHTML = name;
            closeButton.innerHTML = "close";
            img.src = element.icon;
            newTab.appendChild(img);
            newTab.appendChild(text);
            newTab.appendChild(closeButton);
            newTab.setAttribute("selected", "");
            newTab.textElement = text;
            newTab.addEventListener("click", function() {
                const m = this.model;
                loadAFile(m.path_, getFileType_(m.path_), m.element);
            });
            tabs.appendChild(newTab);
            element.model = window.createModel(content, customText_(type));
            element.model.isOpened_ = true;
            newTab.model = element.model;
            element.model.tab_ = newTab;
            element.model.isBeingEdited_ = false;
            element.model.autoChange_ = false;
            element.model.saved_ = 2;
            element.model.type_ = path_;
            //element.model.originalContent_ = content;
            element.model.path_ = element.path;
            element.model.element = element;
            (function() {
                const model = element.model;
                var done = false;
                model.onDidChangeRawContentFast(function() {
                    //console.log(model.saved_);
                    if (model.saved_ >= 2) {
                        if (model.isBeingEdited_ == false) {
                            done = false;
                        }
                        if (model.autoChange_) {
                            model.autoChange_ = false;
                        } else {
                            model.isBeingEdited_ = true;
                            if (!done) {
                                done = true;
                                //window.editor.modifiedFiles_++;
                                window.editor.modifiedFiles_[window.editor.modifiedFiles_.length] = model;
                                element.setAttribute("modified", "");
                                element.model.tab_.setAttribute("modified", "");
                            }
                        }
                        updateInfo();
                    }
                });
            })();
            //
            if (window.editor.getModel() != null && window.editor.getModel() !== undefined) {
                window.editor.getModel().viewState_ = window.editor.saveViewState();
            }
            window.editor.setModel(element.model);
        }
        (function() {
            const model = element.model;
            //model.checkForEdit
            fs.watchFile(model.path_, (curr, prev) => {
                if (model.saved_ >= 2) {
                    if (!model.isBeingEdited_) {
                        fs.readFile(model.path_, 'utf8', (err, content) => {
                            if (!err) {
                                model.autoChange_ = true;
                                model.setValue(content);
                            }
                        });
                    }
                } else {
                    model.saved_++;
                }
                //console.log(`the current mtime is: ${curr.mtime}`);
                //console.log(`the previous mtime was: ${prev.mtime}`);
            });
        })();
        //}
    });
}