const Dimension = (elm) => {
    return elm.offsetHeight + parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-top')) + parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-bottom'));
}
document.cover = document.getElementById("_contextMenuCover");
document.cover.hide = function () {
    var menuCovers = document.getElementsByClassName("menuCover");
    for (var i = 0; i < menuCovers.length; i++)
        menuCovers[i].outerHTML = "";
    document.cover.setAttribute("style", "display: none;");
};
document.cover.show = function () {
    document.cover.setAttribute("style", "display: block;");
};
var removeContextMenus_Loop = 0;
document.removeContextMenus = function () {
    var _contextMenus = document.getElementsByClassName("contextMenu");
    for (var i = 0; i < _contextMenus.length; i++) {
        _contextMenus[i].outerHTML = "";
    }
    document.cover.hide();
    if (removeContextMenus_Loop < 4) {
        removeContextMenus_Loop++;
        document.removeContextMenus();
    } else {
        removeContextMenus_Loop = 0;
    }
};
document.cover.hide();
var number = 0;
function sharedFunctionDropdown(element) {
    var mainContextMenu_ = element.mainContextMenu;
    var allContextMenus = document.getElementsByClassName("contextMenu");
    for (var tI = 0; tI < allContextMenus.length; tI++) {
        if (allContextMenus[tI].number > mainContextMenu_.number) {
            allContextMenus[tI].outerHTML = "";
        } else if (allContextMenus[tI].number == mainContextMenu_.number) {
            mainContextMenu_.classList.add("covered");
            var tempCover = document.createElement("div");
            tempCover.number = mainContextMenu_.number;
            tempCover.classList.add("menuCover");
            tempCover.setAttribute("style", "width: " + mainContextMenu_.offsetWidth + "px; height: " + mainContextMenu_.offsetHeight + "px; top: " + mainContextMenu_.offsetTop + "px; left: " + mainContextMenu_.offsetLeft + "px;");
            tempCover.addEventListener("click", function () {
                var allContextMenus = document.getElementsByClassName("contextMenu"), allMenusCovers = document.getElementsByClassName("menuCover");
                for (var tI = 0; tI < allContextMenus.length; tI++) {
                    if (allContextMenus[tI].number > mainContextMenu_.number) {
                        allContextMenus[tI].outerHTML = "";
                    }
                }
                tempCover.outerHTML = "";
                mainContextMenu_.classList.remove("covered");
                for (var tI = 0; tI < allMenusCovers.length; tI++)
                    if (allMenusCovers[tI].number > tempCover.number)
                        allMenusCovers[tI].click();
            });
            document.body.insertAdjacentElement('beforeend', tempCover);
        }
    }
    showContextMenu(element.dropdown, element);
}
const showContextMenu = (content, c) => {
    //console.log(content);
    var Coords, should = false;
    try {
        const rect = c.getBoundingClientRect();
        Coords = {
            left: rect.left + rect.width,
            top: rect.top
        };
        should = true;
        if (typeof content === "undefined")
            content = c.contextMenu;
    } catch {
        Coords = c;
    }
    //check the height
    /*var contextMenuHeight = 0;
    (function(){
      var p = -1;
      for(var c in content){
        contextMenuHeight += contextMenuOptionHeight;
        if(c != p + 1)
          contextMenuHeight += contentMenuHrHeight;
        p = c;
      }
    })();
    if(Coords.top + contextMenuHeight > window.innerHeight){
      console.log("flip");
      Coords.top -= contextMenuHeight;
    }*/
    var _ContextMenu = document.createElement("div");
    _ContextMenu.classList.add("contextMenu");
    //_ContextMenu.style.willChange = "auto";
    _ContextMenu.number = number++;
    const LoopContent = function (c_, MainElement) {
        const c = c_;
        for (var i in c) {
            var Element = document.createElement("div");
            Element.classList.add("option");
            Element.innerHTML = c[i].title;
            if (c[i].link !== undefined) {
                Element.url = c[i].link;
                Element.addEventListener("click", function () {
                    _content.loadURL(path.join(manifest.paths.currentApp, "content", this.url));
                    window_Cover.style.display = "block";
                    document.removeContextMenus();
                });
                MainElement.insertAdjacentElement('beforeend', Element);
                delete Element;
            } else if (c[i].function !== undefined) {
                Element.function_ = c[i].function;
                Element.addEventListener("click", function () {
                    _content.focus();
                    _content.executeJavaScript(this.function_ + "();");
                    document.removeContextMenus();
                });
                MainElement.insertAdjacentElement('beforeend', Element);
                delete Element;
            } else if (c[i].dropdown !== undefined) {
                Element.classList.add("Dropdown");
                Element.mainContextMenu = _ContextMenu;
                Element.dropdown = c[i].dropdown;
                //
                //
                /*Element.timeout = null;
                Element.addEventListener("mouseover", function(){
                  Element.timeout = setTimeout(function(){
                    sharedFunctionDropdown(this);
                  }, 1000);
                });
                Element.addEventListener("mouseout", function(){
                  if(Element.timeout != null){
                    clearTimeout(Element.timeout);
                    Element.timeout = null;
                  }
                });*/
                Element.addEventListener("click", function () {
                    sharedFunctionDropdown(this);
                });
                var a = MainElement.insertAdjacentElement('beforeend', Element);
                LoopContent(c[i].dropdown, Element);
                delete Element;
            } else {
                console.error("Unknown type!");
            }
            if (c[i].disable == true)
                Element.setAttribute("disabled", "");
            if (c[i].space == true)
                MainElement.insertAdjacentElement('beforeend', document.createElement("hr"));
        }
    };
    LoopContent(content, _ContextMenu);
    _ContextMenu.setAttribute("style", "top: " + Coords.top + "px; left: " + Coords.left + "px");
    document.cover.show();
    _ContextMenu.classList.add("animated", "fast-ish");
    document.body.insertAdjacentElement('beforeend', _ContextMenu);
    var name = "contextMenuAnimations";
    setTimeout(function () {
        var height = _ContextMenu.offsetHeight;
        _ContextMenu.classList.add("b");
        if (Coords.top + height > window.innerHeight) {
            name += "2";
            Coords.top -= height;
            if (should) {
                Coords.top += Dimension(c);
            }
        }
        if (Coords.top < 0)
            Coords.top = 0;
        if (Coords.left + _ContextMenu.offsetWidth > window.innerWidth)
            Coords.left = window.innerWidth - _ContextMenu.offsetWidth;
        _ContextMenu.setAttribute("style", "top: " + Coords.top + "px; left: " + Coords.left + "px");
        setTimeout(function () {
            _ContextMenu.classList.add(name);
        }, 0);
    }, 0);
};
document.cover.addEventListener("mousedown", function () {
    document.removeContextMenus();
});

(function () {
    const { app } = require("electron").remote;
    app.on('browser-window-blur', () => {
        document.removeContextMenus();
    });
})();
document.addEventListener('keydown', function (event) {
    if (event.key == "Escape") {
        document.removeContextMenus();
    }
});