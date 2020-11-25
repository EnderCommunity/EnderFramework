var mainBarOptions = [];
document.addEventListener("DOMContentLoaded", function(){
  (function(){
    content = _content;
    _menuContent = manifest.menu;
    var _menu = document.getElementById("_menu");
    if(_menuContent.type == "none"){
      _menu.style.display = "none";
    }else if(_menuContent.type == "menu"){
      _menu.style.display = "none";
      _menu = document.getElementById("_menu2");
      const options = _menuContent.options;
      const menuLoop = function(value, MainElement){
        for(var i in value){
          var Element = document.createElement("div");
          Element.classList.add("option");
          Element.innerHTML = value[i].title;
          if(value[i].home == true){
            Element.addEventListener("click", function(){
              window_Cover.style.display = "block";
              content.loadURL(path.join(manifest.paths.currentApp, "content", manifest.start));
            });
            MainElement.insertAdjacentElement('beforeend', Element);
          }else if(value[i].link !== undefined){
            Element.url = ((value[i].link).substring(0, 4) == ("http" || "file")) ? (value[i].link) : path.join(manifest.paths.currentApp, "content", value[i].link);
            Element.addEventListener("click", function(){
              window_Cover.style.display = "block";
              content.loadURL(this.url);
            });
            MainElement.insertAdjacentElement('beforeend', Element);
          }else if(value[i].function !== undefined){
            Element.function = value[i].function;
            Element.addEventListener("click", function(){
              content.executeJavaScript(this.function + "();");
            });
            MainElement.insertAdjacentElement('beforeend', Element);
          }else if(value[i].dropdown !== undefined){
            Element.contextMenu = value[i].dropdown;
            Element.addEventListener("click", function(){
              var rect = this.getBoundingClientRect();
              showContextMenu(this.contextMenu, {
                left: rect.left,
                top: rect.top + rect.height
              });
            });
            MainElement.insertAdjacentElement('beforeend', Element);
          }else{
            console.error("Unknown type!");
          }
        }
      };
      menuLoop(options, _menu);
      _menu.style.display = "inline-block";
      if(!isSub)
        document.getElementById("_title").style.display = "none";
    }else if(_menuContent.type == "side"){
      _menu.style.display = "none";
      _menu = document.getElementById("_menu3").getElementsByTagName("div")[0];
      const options = _menuContent.options;
      const menuLoop = function(value, MainElement){
        var closeAllDropdowns = function(){
          var dropdowns = document.getElementsByClassName("c")[0].getElementsByClassName("option dropdown");
          for(var i = 0; i < dropdowns.length; i++){
            dropdowns[i].dropC.style.display = "none";
            dropdowns[i].classList.remove("opened");
          }
        }
        for(var i in value){
          var Element = document.createElement("div");
          Element.classList.add("option");
          Element.innerHTML = value[i].title;
          if(value[i].home == true){
            Element.addEventListener("click", function(){
              window_Cover.style.display = "block";
              content.loadURL(path.join(manifest.paths.currentApp, "content", manifest.start));
              closeAllDropdowns();
            });
            MainElement.insertAdjacentElement('beforeend', Element);
          }else if(value[i].link !== undefined){
            Element.url = ((value[i].link).substring(0, 4) == ("http" || "file")) ? (value[i].link) : path.join(manifest.paths.currentApp, "content", value[i].link);
            Element.addEventListener("click", function(){
              window_Cover.style.display = "block";
              content.loadURL(this.url);
              closeAllDropdowns();
            });
            MainElement.insertAdjacentElement('beforeend', Element);
          }else if(value[i].function !== undefined){
            Element.function = value[i].function;
            Element.addEventListener("click", function(){
              content.executeJavaScript(this.function + "();");
              closeAllDropdowns();
            });
            MainElement.insertAdjacentElement('beforeend', Element);
          }else if(value[i].dropdown !== undefined){
            Element.classList.add("dropdown");
            var dropCElm = document.createElement("div");
            dropCElm.classList.add("drop-c");
            dropCElm.style.display = "none";
            var dropDownLoop = function(values, mainC){
              for(var i in values){
                var Element = document.createElement("div");
                Element.classList.add("option");
                Element.innerHTML = values[i].title;
                if(values[i].home == true){
                  Element.addEventListener("click", function(){
                    window_Cover.style.display = "block";
                    content.loadURL(path.join(manifest.paths.currentApp, "content", manifest.start));
                    closeAllDropdowns();
                  });
                  mainC.insertAdjacentElement('beforeend', Element);
                }else if(values[i].link !== undefined){
                  Element.url = ((values[i].link).substring(0, 4) == ("http" || "file")) ? (values[i].link) : path.join(manifest.paths.currentApp, "content", values[i].link);
                  Element.addEventListener("click", function(){
                    window_Cover.style.display = "block";
                    content.loadURL(this.url);
                    closeAllDropdowns();
                  });
                  mainC.insertAdjacentElement('beforeend', Element);
                }else if(values[i].function !== undefined){
                  Element.function = values[i].function;
                  Element.addEventListener("click", function(){
                    content.executeJavaScript(this.function + "();");
                    closeAllDropdowns();
                  });
                  mainC.insertAdjacentElement('beforeend', Element);
                }else if(values[i].dropdown !== undefined){
                  var newDropC = document.createElement("div");
                  newDropC.classList.add("drop-c");
                  newDropC.style.display = "none";
                  Element.classList.add("dropdown");
                  Element.dropC = newDropC;
                  Element.addEventListener("click", function(){
                    if(this.classList.contains("opened")){
                      this.dropC.style.display = "none";
                      this.classList.remove("opened");
                    }else{
                      this.dropC.style.display = "block";
                      this.classList.add("opened");
                    }
                  });
                  dropDownLoop(values[i].dropdown, newDropC);
                  mainC.insertAdjacentElement('beforeend', Element);
                  mainC.insertAdjacentElement('beforeend', newDropC);
                }else{
                  console.error("Unknown type!");
                }
              }
            };
            dropDownLoop(value[i].dropdown, dropCElm);
            Element.dropC = dropCElm;
            Element.addEventListener("click", function(){
              if(this.classList.contains("opened")){
                this.dropC.style.display = "none";
                this.classList.remove("opened");
              }else{
                this.dropC.style.display = "block";
                this.classList.add("opened");
              }
            });
            MainElement.insertAdjacentElement('beforeend', Element);
            MainElement.insertAdjacentElement('beforeend', dropCElm);
          }else{
            console.error("Unknown type!");
          }
        }
      };
      menuLoop(options, _menu);
      if(_menuContent.withAccount){
        document.getElementById("_sideMenuAccount").style.display = "block";
      }
      document.getElementById("_sideMenu").style.display = "block";
      document.getElementById("__sideMenu").style.display = "block";
      document.getElementById("_sideMenuBorder").style.display = "block";
      document.getElementById("_topBar").classList.add("withSideMenu");
      document.getElementById("_contentView").classList.add("withSideMenu");
      document.getElementById("_sideMenuButton").isBeingClicked = false;
      document.getElementById("_sideMenuButton").addEventListener("mousedown", function(){
        this.isBeingClicked = true;
      });
      document.getElementById("_sideMenuButton").addEventListener("mouseup", function(){
        this.isBeingClicked = false;
      });
      document.getElementById("_sideMenuButton").addEventListener("click", function(){
        var menu = document.getElementById("_menu3");
        if(menu.style.display == "block"){
          menu.style.display = "none";
          document.getElementById("_sideMenuCover").style.display = "none";
        }else{
          menu.style.display = "block";
          document.getElementById("_sideMenuCover").style.display = "block";
        }
      });
      document.getElementById("_sideMenuCover").addEventListener("click", function(){
        document.getElementById("_menu3").style.display = "none";
        document.getElementById("_sideMenuCover").style.display = "none";
      });
      document.getElementById("__sideMenu").addEventListener("mousedown", function(){
        var menu = document.getElementById("_menu3");
        if(menu.style.display == "block" && !document.getElementById("_sideMenuButton").isBeingClicked){
          menu.style.display = "none";
          document.getElementById("_sideMenuCover").style.display = "none";
        }
      });
      var allOptions = document.getElementsByClassName("c")[0].getElementsByClassName("option");
      for(var i__ = 0; i__ < allOptions.length; i__++)
        if(!allOptions[i__].classList.contains("dropdown"))
          allOptions[i__].addEventListener("click", function(){
            document.getElementById("_menu3").style.display = "none";
            document.getElementById("_sideMenuCover").style.display = "none";
            document.getElementById("_sideTitle").innerHTML = this.innerHTML;
          });
    }else if(_menuContent.type == "top"){
      document.getElementById("_topMenu").style.display = "block";
      document.getElementById("_topMenuBorder").style.display = "block";
      document.getElementById("_topBar").classList.add("withTopMenu");
      document.getElementById("_contentView").classList.add("withTopMenu");
      const options = _menuContent.options;
      const menuLoop = function(value, MainElement){
        for(var i in value){
          var Element = document.createElement("div");
          Element.classList.add("option");
          Element.innerHTML = value[i].title;
          if(value[i].home == true){
            Element.addEventListener("click", function(){
              window_Cover.style.display = "block";
              content.loadURL(path.join(manifest.paths.currentApp, "content", manifest.start));
            });
            var _url = path.join(manifest.paths.currentApp, "content", manifest.start), url = _url.split("");
            Element.url = _url;
            var a = MainElement.insertAdjacentElement('beforeend', Element);
            var _selectorBar = document.getElementById("_selector");
            _selectorBar.setAttribute("style", "left: 12px; width: " + (a.offsetWidth - 15) + "px;");
            a.setAttribute("selected", "");
            mainBarOptions[mainBarOptions.length] = "home";
          }else if(value[i].link !== undefined){
            Element.url = ((value[i].link).substring(0, 4) == ("http" || "file")) ? (value[i].link) : path.join(manifest.paths.currentApp, "content", value[i].link);
            Element.addEventListener("click", function(){
              window_Cover.style.display = "block";
              content.loadURL(this.url);
            });
            var a = MainElement.insertAdjacentElement('beforeend', Element);
            mainBarOptions[mainBarOptions.length] = Element.url;
          }else if(value[i].function !== undefined){
            Element.function = value[i].function;
            Element.addEventListener("click", function(){
              content.executeJavaScript(this.function + "();");
            });
            MainElement.insertAdjacentElement('beforeend', Element);
          }else if(value[i].dropdown !== undefined){
            Element.classList.add("Dropdown");
            Element.contextMenu = value[i].dropdown;
            Element.addEventListener("click", function(){
              var rect = this.getBoundingClientRect();
              showContextMenu(this.contextMenu, {
                left: rect.left,
                top: rect.top + rect.height
              });
            });
            var a = MainElement.insertAdjacentElement('beforeend', Element);
          }else{
            console.error("Unknown type!");
          }
        }
      };
      menuLoop(options, document.getElementById("_topMenu_options"));
      if(_menuContent.withAccount)
        document.getElementsByClassName("profilePicture")[0].style.display = "block";
      mainBarOptions[mainBarOptions.indexOf("home")] = path.join(manifest.paths.currentApp, "content", manifest.start);
      var _mainBarOptions = mainBarOptions;
      for(var i = 0; i < mainBarOptions.length; i++){
        var newPath = mainBarOptions[i].split("");
        mainBarOptions[i] = "";
        for(var i2 = 0; i2 < newPath.length; i2++){
         mainBarOptions[i] += newPath[i2].replace("\\", "/");
        }
        mainBarOptions[i] = "file:///" + mainBarOptions[i];
      }
      var i = setInterval(function(){
        if(_content != null){
          _content.addEventListener("load-commit", function(e){
            if(e.isMainFrame){
              var isThereAMatch = false;
              var options = document.getElementById("_topMenu_options").getElementsByClassName("option");
              for(var i = 0; i < options.length; i++)
                options[i].removeAttribute("selected");
              for(var i = 0; i < mainBarOptions.length; i++)
                if(e.url == encodeURI(mainBarOptions[i])){
                  var newOptions = [];
                  for(var i2 = 0; i2 < options.length; i2++)
                    if(options[i2].url !== undefined)
                      newOptions[newOptions.length] = options[i2];
                  for(var i2 in newOptions){
                    if(typeof newOptions[i2] == "object"){
                      var _url = newOptions[i2].url, url = _url.split("");
                      _url = "";
                      for(var i2_ = 0; i2_ < url.length; i2_++){
                        _url += url[i2_].replace("\\", "/");
                      }
                      _url = "file:///" + _url;
                      if(mainBarOptions[i] == _url){
                        isThereAMatch = true;
                        var potition = newOptions[i2].getBoundingClientRect();
                        var _selectorBar = document.getElementById("_selector");
                        _selectorBar.setAttribute("style", "left: " + (potition.left + 8) + "px; width: " + (potition.width - 18) + "px;");
                        newOptions[i2].setAttribute("selected", "");
                      }
                    }
                  }
                }
              if(!isThereAMatch){
                var _selectorBar = document.getElementById("_selector");
                _selectorBar.setAttribute("style", "left: -5px; width: 0px;");
              }
            }
          });
          clearInterval(i);
        }
      }, 100);
    }else{
      console.warn("Your menu's type isn't valid!");
    }
  })();
});