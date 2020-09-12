document.cover = document.getElementById("_contextMenuCover");
document.cover.hide = function(){
  var menuCovers = document.getElementsByClassName("menuCover");
  for(var i = 0; i < menuCovers.length; i++)
    menuCovers[i].outerHTML = "";
    document.cover.setAttribute("style", "display: none;");
  };
document.cover.show = function(){
  document.cover.setAttribute("style", "display: block;");
};
var removeContextMenus_Loop = 0;
document.removeContextMenus = function(){
  var _contextMenus = document.getElementsByClassName("contextMenu");
  for(var i = 0; i < _contextMenus.length; i++){
    _contextMenus[i].outerHTML = "";
  }
  document.cover.hide();
  if(removeContextMenus_Loop < 4){
    removeContextMenus_Loop++;
    document.removeContextMenus();
  }else{
    removeContextMenus_Loop = 0;
  }
};
document.cover.hide();
var number = 0;
const showContextMenu = (content, c) => {
  //console.log(content);
  var Coords;
  try{
    const rect = c.getBoundingClientRect();
    Coords = {
      left: rect.left + rect.width,
      top: rect.top
    };
    if(typeof content === "undefined")
      content = c.contextMenu;
  }catch{
    Coords = c;
  }
  var _ContextMenu = document.createElement("div");
  _ContextMenu.classList.add("contextMenu");
  _ContextMenu.number = number++;
  const LoopContent = function(c, MainElement){
    for(var i in c){
      var Element = document.createElement("div");
      Element.classList.add("option");
      Element.innerHTML = c[i].title;
      if(c[i].link !== undefined){
        Element.url = c[i].link;
        Element.addEventListener("click", function(){
          _content.loadURL(appPath + "content/" + this.url);
          document.getElementById("_cover").style.display = "block";
          document.removeContextMenus();
        });
        MainElement.insertAdjacentElement('beforeend', Element);
        delete Element;
      }else if(c[i].function !== undefined){
        Element.function_ = c[i].function;
        Element.addEventListener("click", function(){
          _content.executeJavaScript(this.function_ + "();");
          document.removeContextMenus();
        });
        MainElement.insertAdjacentElement('beforeend', Element);
        delete Element;
      }else if(c[i].dropdown !== undefined){
        Element.classList.add("Dropdown");
        Element.mainContextMenu = _ContextMenu;
        Element.addEventListener("click", function(){
          var mainContextMenu_ = this.mainContextMenu;
          var allContextMenus = document.getElementsByClassName("contextMenu");
          for(var tI = 0; tI < allContextMenus.length; tI++){
            if(allContextMenus[tI].number > mainContextMenu_.number){
              allContextMenus[tI].outerHTML = "";
            }else if(allContextMenus[tI].number == mainContextMenu_.number){
              mainContextMenu_.classList.add("covered");
              var tempCover = document.createElement("div");
              tempCover.number = mainContextMenu_.number;
              tempCover.classList.add("menuCover");
              tempCover.setAttribute("style", "width: " + mainContextMenu_.offsetWidth + "px; height: " + mainContextMenu_.offsetHeight + "px; top: " + mainContextMenu_.offsetTop + "px; left: " + mainContextMenu_.offsetLeft + "px;");
              tempCover.addEventListener("click", function(){
                var allContextMenus = document.getElementsByClassName("contextMenu"), allMenusCovers = document.getElementsByClassName("menuCover");
                for(var tI = 0; tI < allContextMenus.length; tI++){
                  if(allContextMenus[tI].number > mainContextMenu_.number){
                    allContextMenus[tI].outerHTML = "";
                  }
                }
                tempCover.outerHTML = "";
                mainContextMenu_.classList.remove("covered");
                for(var tI = 0; tI < allMenusCovers.length; tI++)
                  if(allMenusCovers[tI].number > tempCover.number)
                    allMenusCovers[tI].click();
              });
              document.body.insertAdjacentElement('beforeend', tempCover);
            }
          }
          showContextMenu(c[i].dropdown, Element);
        });
        var a = MainElement.insertAdjacentElement('beforeend', Element);
        LoopContent(c[i].dropdown, Element);
        delete Element;
      }else{
        console.error("Unknown type!");
      }
      if(c[i].disable == true)
        Element.setAttribute("disabled", "");
      if(c[i].space == true)
        MainElement.insertAdjacentElement('beforeend', document.createElement("hr"));
    }
  };
  LoopContent(content, _ContextMenu);
  _ContextMenu.setAttribute("style", "top: " + Coords.top + "px; left: " + Coords.left + "px");
  document.cover.show();
  _ContextMenu.classList.add("animated", "fast-ish");
  document.body.insertAdjacentElement('beforeend', _ContextMenu);
  setTimeout(function(){
    if(Coords.top + _ContextMenu.offsetHeight > window.innerHeight)
      Coords.top = window.innerHeight - _ContextMenu.offsetHeight;
    if(Coords.left + _ContextMenu.offsetWidth > window.innerWidth)
      Coords.left = window.innerWidth - _ContextMenu.offsetWidth;
    _ContextMenu.setAttribute("style", "top: " + Coords.top + "px; left: " + Coords.left + "px");
    setTimeout(function(){
      _ContextMenu.classList.add("contextMenuAnimations");
    }, 1);
  }, 0);
};
document.cover.addEventListener("mousedown", function(){
  document.removeContextMenus();
});

(function () {
  const { app } = require("electron").remote;
  app.on('browser-window-blur', () => {
    document.removeContextMenus();
  });
})();