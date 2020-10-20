//var windowNum = 0;
const path = require("path");
var windowsArray = {};
document.addEventListener("DOMContentLoaded", function(){
  var sInt = setInterval(() => {
    document.getElementById("_cover").style.display = "block";
    if(doneLoadingInfo(-1) == (tN - 1)){
      content = document.getElementById("_contentView");
      if(!isSub){
        content.setAttribute("src", appPath + "content\\_main.html");
      }else{
        content.setAttribute("src", path.join(appPath, "content\\", subInfo.url));
      }
      content.addEventListener("dom-ready", function(){
        content.focus()
      });
      content.addEventListener("DOM", function(){ });
      _content = content;
      content.setAttribute("preload", startPath_ + "EnderFramework\\_manager\\_contentPreload.js");
      document.getElementById("_cover").style.display = "none";
      var enableDevTools = "no", enableSpellcheck = "no", enableJavaScript = "yes";
      if(devTools_){
        enableDevTools = "yes";
      }
      if(spellcheck_){
        enableSpellcheck = "yes";
      }
      if(!JavaScript_){
        enableJavaScript = "no";
      }
      content.setAttribute("webpreferences", "devTools=" + enableDevTools + ", nodeIntegration=yes, nodeIntegrationInWorker=yes, nodeIntegrationInSubFrames=yes, sandbox=no, webviewTag=yes, enableRemoteModule=yes, javascript=" + enableJavaScript + ", webSecurity=yes, images=yes, textAreasAreResizable=no, webgl=yes, experimentalFeatures=no, scrollBounce=no, defaultFontFamily=\"standard\", defaultFontSiz=16, defaultMonospaceFontSize=13, minimumFontSize=0, defaultEncoding=\"ISO-8859-1\", offscreen=no, contextIsolation=no, nativeWindowOpen=no, safeDialogs=no, navigateOnDragDrop=no, autoplayPolicy=\"no-user-gesture-required\" disableHtmlFullscreenWindowResize=no, spellcheck=" + enableSpellcheck);
      content.setAttribute("enableremotemodule", "true");
      //content.setAttribute("partition", "");
      var first = true, isMainLoad = true;
      content.addEventListener('did-frame-finish-load', (e) => {
        if(e.isMainFrame && first){
          first = false;
          doneLoadingInfo();
        }else if(e.isMainFrame){
          isMainLoad = false;
        }
      });
      /*content.addEventListener('blur', () => {
        //console.log(Math.round());
        document.removeContextMenus();
      });*/
      content.addEventListener('will-navigate', function(){
        isMainLoad = true;
      });
      content.addEventListener('did-start-loading', function(){
        if(isMainLoad == true && redirectAnimations_){
          document.getElementById("_cover").style.display = "block";
        }
      });
      content.addEventListener('did-finish-loading', function(){
        isMainLoad = false;
      });
      var showSrrorScreen = function(){
        document.getElementById("_cover").style.display = "block";
        document.getElementById("_ErrorScreen").style.display = "block";
      }, hideErrorScreen = function(){
        document.getElementById("_cover").style.display = "block";
        document.getElementById("_ErrorScreen").style.display = "none";
      };
      content.addEventListener('did-fail-load', function(e){
        if(e.isMainFrame){
          showSrrorScreen();
        }else{
          var notif = document.getElementById("_notification");
          notif.removeAttribute("show");
          setTimeout(function(){
            notif.getElementsByTagName("h4")[0].innerHTML = "Some resources failed to load!";
            notif.removeAttribute("style");
            setTimeout(function(){
              if(notif.offsetWidth + 36 > window.innerWidth)
                notif.setAttribute("style", "margin: 0px 18px;");
              notif.setAttribute("show", "");
            }, 60);
          }, 100);
          if(global.currentCountdown_notify != null)
            clearTimeout(currentCountdown_notify);
          global.currentCountdown_notify = setTimeout(function(){
            notif.removeAttribute("show");
          }, 5000);
        }
      });
      content.addEventListener('crashed', function(e){
        document.getElementById("_CrashScreen").style.display = "block";
      });
      content.addEventListener('dom-ready', function (){
        try{
          document.getElementById("_cover").style.display = "block";
          content.insertCSS(style);
          content.insertCSS(icons);
          content.insertCSS(font);
          content.insertCSS(aniamtions);
          content.executeJavaScript("global.path_ = \"" + appPath.replace(/\\/g, "\\\\") + "\";");
          if(_menuContent.type == "top" || _menuContent.type == "side"){
            setTimeout(function(){
              content.executeJavaScript("setTimeout(function(){ if(_checkFunction1()){ document.body.insertBefore(document.createElement('space'), document.body.firstChild); } }, 100);");
            }, 100);
          }
        }catch{
          alert("Something went wrong!");
          showSrrorScreen();
        }
      });
      content.addEventListener('ipc-message', event => {
        var isLocked = false;
        if(event.channel == "event--startLoading"){
          var elem = document.getElementById("_longLoading");
          elem.style.display = "block";
        }else if(event.channel == "event--doneLoading"){
          var elem = document.getElementById("_longLoading");
          content.classList.remove("animated", "fadeInUp2", "fast-ish");
          setTimeout(function(){
            //content.classList.remove("animated", "fadeInUp2", "fast-ish");
            elem.style.display = "none";
            content.classList.add("animated", "fadeInUp2", "fast-ish");
            setTimeout(function(){
              content.classList.remove("animated", "fadeInUp2", "fast-ish");
            }, 250);
          }, 400);
        }else if(event.channel == "get--codebox"){
          content.executeJavaScript(CodeMirror_CodeBox_code);
          content.executeJavaScript(CodeMirror_AddOn_CloseTag);
          content.executeJavaScript(CodeMirror_AddOn_MatchBrackets);

          content.executeJavaScript(CodeMirror_Mode_Xml);
          content.executeJavaScript(CodeMirror_Mode_JavaScript);
          content.executeJavaScript(CodeMirror_Mode_CSS);
          content.executeJavaScript(CodeMirror_Mode_HTMLMixed);
          content.executeJavaScript(CodeMirror_Mode_APL);
          content.executeJavaScript(CodeMirror_Mode_ASN1);
          content.executeJavaScript(CodeMirror_Mode_Asterisk);
          content.executeJavaScript(CodeMirror_Mode_Brainfuck);
          content.executeJavaScript(CodeMirror_Mode_CLike);
          content.executeJavaScript(CodeMirror_Mode_Clojure);
          content.executeJavaScript(CodeMirror_Mode_CSS);
          content.executeJavaScript(CodeMirror_Mode_CMake);
          content.executeJavaScript(CodeMirror_Mode_COBOL);
          content.executeJavaScript(CodeMirror_Mode_CoffeeScript);
          content.executeJavaScript(CodeMirror_Mode_CommonLisp);
          content.executeJavaScript(CodeMirror_Mode_Crystal);
          content.executeJavaScript(CodeMirror_Mode_Cypher);
          content.executeJavaScript(CodeMirror_Mode_Python);
          content.executeJavaScript(CodeMirror_Mode_D);
          content.executeJavaScript(CodeMirror_Mode_Dart);
          content.executeJavaScript(CodeMirror_Mode_Django);
          content.executeJavaScript(CodeMirror_Mode_Diff);
          content.executeJavaScript(CodeMirror_Mode_DTD);
          content.executeJavaScript(CodeMirror_Mode_Dylan);
          content.executeJavaScript(CodeMirror_Mode_EBNF);
          content.executeJavaScript(CodeMirror_Mode_ECL);
          content.executeJavaScript(CodeMirror_Mode_Eiffel);
          content.executeJavaScript(CodeMirror_Mode_Elm);
          content.executeJavaScript(CodeMirror_Mode_FCL);
          content.executeJavaScript(CodeMirror_Mode_Erlang);
          content.executeJavaScript(CodeMirror_Mode_Forth);
          content.executeJavaScript(CodeMirror_Mode_Fortran);
          content.executeJavaScript(CodeMirror_Mode_MLLike);
          content.executeJavaScript(CodeMirror_Mode_Gas);
          content.executeJavaScript(CodeMirror_Mode_Gherkin);
          content.executeJavaScript(CodeMirror_Mode_Go);
          content.executeJavaScript(CodeMirror_Mode_Groovy);
          content.executeJavaScript(CodeMirror_Mode_HAML);
          content.executeJavaScript(CodeMirror_Mode_Haskell);
          content.executeJavaScript(CodeMirror_Mode_Haxe);
          content.executeJavaScript(CodeMirror_Mode_HTMLEmbedded);
          content.executeJavaScript(CodeMirror_Mode_HTTP);
          content.executeJavaScript(CodeMirror_Mode_HaskellLiterate);
          content.executeJavaScript(CodeMirror_Mode_IDL);
          content.executeJavaScript(CodeMirror_Mode_Julia);
          content.executeJavaScript(CodeMirror_Mode_LiveScript);
          content.executeJavaScript(CodeMirror_Mode_Lua);
          content.executeJavaScript(CodeMirror_Mode_Markdown);
          content.executeJavaScript(CodeMirror_Mode_Mathematica);
          content.executeJavaScript(CodeMirror_Mode_JSX);
          content.executeJavaScript(CodeMirror_Mode_GFM);
          content.executeJavaScript(CodeMirror_Mode_MBox);
          content.executeJavaScript(CodeMirror_Mode_MIRC);
          content.executeJavaScript(CodeMirror_Mode_Modelica);
          content.executeJavaScript(CodeMirror_Mode_MUMPS);
          content.executeJavaScript(CodeMirror_Mode_MscGen);
          content.executeJavaScript(CodeMirror_Mode_NGINX);
          content.executeJavaScript(CodeMirror_Mode_NTriples);
          content.executeJavaScript(CodeMirror_Mode_Octave);
          content.executeJavaScript(CodeMirror_Mode_Oz);
          content.executeJavaScript(CodeMirror_Mode_Pascal);
          content.executeJavaScript(CodeMirror_Mode_PEGJS);
          content.executeJavaScript(CodeMirror_Mode_Perl);
          content.executeJavaScript(CodeMirror_Mode_ASCIIArmor);
          content.executeJavaScript(CodeMirror_Mode_PHP);
          content.executeJavaScript(CodeMirror_Mode_Pig);
          content.executeJavaScript(CodeMirror_Mode_Properties);
          content.executeJavaScript(CodeMirror_Mode_ProtoBuf);
          content.executeJavaScript(CodeMirror_Mode_Pug);
          content.executeJavaScript(CodeMirror_Mode_Puppet);
          content.executeJavaScript(CodeMirror_Mode_Q);
          content.executeJavaScript(CodeMirror_Mode_R);
          content.executeJavaScript(CodeMirror_Mode_RPM);
          content.executeJavaScript(CodeMirror_Mode_ReStructuredText);
          content.executeJavaScript(CodeMirror_Mode_Ruby);
          content.executeJavaScript(CodeMirror_Mode_SAS);
          content.executeJavaScript(CodeMirror_Mode_Sass);
          content.executeJavaScript(CodeMirror_Mode_Spreadsheet);
          content.executeJavaScript(CodeMirror_Mode_Scheme);
          content.executeJavaScript(CodeMirror_Mode_Shell);
          content.executeJavaScript(CodeMirror_Mode_Sieve);
          content.executeJavaScript(CodeMirror_Mode_SmallTalk);
          content.executeJavaScript(CodeMirror_Mode_SLIM);
          content.executeJavaScript(CodeMirror_Mode_Smarty);
          content.executeJavaScript(CodeMirror_Mode_Solr);
          content.executeJavaScript(CodeMirror_Mode_Soy);
          content.executeJavaScript(CodeMirror_Mode_SQL);
          content.executeJavaScript(CodeMirror_Mode_Stylus);
          content.executeJavaScript(CodeMirror_Mode_SPARQL);
          content.executeJavaScript(CodeMirror_Mode_Swift);
          content.executeJavaScript(CodeMirror_Mode_STeX);
          content.executeJavaScript(CodeMirror_Mode_Tcl);
          content.executeJavaScript(CodeMirror_Mode_Textile);
          content.executeJavaScript(CodeMirror_Mode_TiddlyWiki);
          content.executeJavaScript(CodeMirror_Mode_TikiWiki);
          content.executeJavaScript(CodeMirror_Mode_TOML);
          content.executeJavaScript(CodeMirror_Mode_Tornado);
          content.executeJavaScript(CodeMirror_Mode_Troff);
          content.executeJavaScript(CodeMirror_Mode_TTCN);
          content.executeJavaScript(CodeMirror_Mode_TTCN_CFG);
          content.executeJavaScript(CodeMirror_Mode_Turtle);
          content.executeJavaScript(CodeMirror_Mode_Twig);
          content.executeJavaScript(CodeMirror_Mode_VBNET);
          content.executeJavaScript(CodeMirror_Mode_VBScript);
          content.executeJavaScript(CodeMirror_Mode_Velocity);
          content.executeJavaScript(CodeMirror_Mode_SystemVerilog);
          content.executeJavaScript(CodeMirror_Mode_VHDL);
          content.executeJavaScript(CodeMirror_Mode_VueJS);
          content.executeJavaScript(CodeMirror_Mode_WebIDL);
          content.executeJavaScript(CodeMirror_Mode_XML);
          content.executeJavaScript(CodeMirror_Mode_XQuery);
          content.executeJavaScript(CodeMirror_Mode_Yacas);
          content.executeJavaScript(CodeMirror_Mode_YAML);
          content.executeJavaScript(CodeMirror_Mode_YAMLFrontMatter);
          content.executeJavaScript(CodeMirror_Mode_Z80);
          content.executeJavaScript(CodeMirror_CodeBox_Hint);
          content.executeJavaScript(CodeMirror_CodeBox_Hint_AnyWord);
          content.executeJavaScript(CodeMirror_CodeBox_Hint_CSS);
          content.executeJavaScript(CodeMirror_CodeBox_Hint_HTML);
          content.executeJavaScript(CodeMirror_CodeBox_Hint_JavaScript);
          content.executeJavaScript(CodeMirror_CodeBox_Hint_SQL);
          content.executeJavaScript(CodeMirror_CodeBox_Hint_XML);
          content.insertCSS(CodeMirror_CodeBox);
          content.insertCSS(CodeMirror_CodeBox_style);
          content.insertCSS(CodeMirror_CodeBox_Hints);
          content.executeJavaScript(CodeMirror_CodeBox_INSERT);
        }else if(event.channel == "get--customelements"){
          content.executeJavaScript(CustomElementsScript);
        }else if(event.channel == "get--scrollAnimation"){
          content.executeJavaScript(OnScrollAnimation);
        }else if(event.channel == "get--tooltip"){
          content.executeJavaScript(ToolTip);
        }else if(event.channel == "get--media"){
          content.executeJavaScript(Media);
        }else if(event.channel == "enderframework--theme-changetolight"){
          stopThemeAutoChange = true;
          document.documentElement.setAttribute("prefers-color-scheme", "light");
        }else if(event.channel == "enderframework--theme-changetodark"){
          stopThemeAutoChange = true;
          document.documentElement.setAttribute("prefers-color-scheme", "dark");
        }else if(event.channel == "enderframework--theme-changeunlock"){
          stopThemeAutoChange = false;
        }else if(event.channel == "enderframework--share-show"){
          showShareScreen(event.args[0][0]);
        }else if(event.channel == "enderframework--notification-show"){
          var id = event.args[0][0], title = event.args[0][1], message = event.args[0][2], icon = event.args[0][3];
          notify_1(title, message, icon, function(error, action){
            if(error){
              content.send("enderframework--notification-e" + id);
            }else{
              if(action == "dismissed"){
                content.send("enderframework--notification-d" + id);
              }else if(action == "click"){
                content.send("enderframework--notification-c" + id);
              }else if(action == "timeout"){
                content.send("enderframework--notification-t" + id);
              }else{
                content.send("enderframework--notification-u" + id);
              }
            }
          });
        }else if(event.channel == "enderframework--contextmenu-create"){
          var id = event.args[0][0], c = event.args[0][1];
          if(!checkContextMenuID(id)){
            saveContextMenu(id, c);
            content.send("enderframework--contextmenu-createdone");
          }else{
            content.send("enderframework--contextmenu-createfailed");
          }
        }else if(event.channel == "enderframework--contextmenu-show"){
          //console.log(event.args[0][0]);
          //console.log(event.args[0][1]);
          //event.args[0][1].top += content.offsetTop;
          var c = event.args[0][1];
          c.top += content.offsetTop;
          showAContextMenu(event.args[0][0], c);
        }else if(event.channel == "enderframework--theme-coverpage"){
          document.getElementById("_cover").style.display = "block";
        }else if(event.channel == "enderframework--dialog-infoscreen"){
          document.getElementById("_icon").click();
        }else if(event.channel == "enderframework--contextmenu-remove"){
          //
        }else if(event.channel == "enderframework--contextmenu-hideall"){
          document.removeContextMenus();
        }else if(event.channel == "enderframework--waitbeforeclosing"){
          _shouldWait = true;
        }else if(event.channel == "enderframework--waitbeforeclosing-done"){
          if(!isLocked){
            _shouldWait = false;
          }
          isLocked = true;
        }else if(event.channel == "enderframework--waitbeforeclosing-done2"){
          if(!isLocked){
            if(loop____ !== null){
              clearInterval(loop____);
            }
            _shouldWait = false;
          }
          isLocked = false;
        }else if(event.channel == "enderframework--close"){
          window.close();
        }else if(event.channel == "enderframework--new"){
          window.open("_window.html");
        }else if(event.channel == "enderframework--new2"){
          try{
            //var _window = window.open("_subwindow.html");
            //windowNum++;
            //console.log(event);
            event.args = event.args[0];
            var url = window.location + "?subwindow=" + event.args.id, _window = window.open(url);
            windowsArray[event.args.id] = _window;
            //console.log(url);
            //console.log(event.args.id);
            //window.location.search.indexOf("?subwindow") == 0
            //console.log(event.args.data[0]);
            var loop_ = 0, loop = setInterval(function(){
              _window.postMessage({
                url: event.args.data[0],
                width: event.args.data[1],
                height: event.args.data[2],
                title: event.args.data[3],
                minWidth: event.args.data[4],
                minHeight: event.args.data[5],
                maxWidth: event.args.data[6],
                maxHeight: event.args.data[7],
                menu: event.args.data[8]
              }, url);
              if(loop_ == 6){
                clearInterval(loop);
              }
              loop_++;
            }, 100);
          }catch{
            //
          }
        }else if(event.channel == "enderframework--subwindow-sendmessage"){
          event.args = event.args[0];
          windowsArray[event.args.id].postMessage({
            channel: event.args.channel,
            data: event.args.data
          });
        }else if(event.channel == "enderframework--menu-color"){
          document.getElementById("_topBar").style.background = event.args;
        }else if(event.channel == "enderframework--title-show"){
          document.getElementById("_title").style.display = "inline-block";
        }else if(event.channel == "enderframework--title-hide"){
          if(!isSub)
            document.getElementById("_title").style.display = "none";
        }else if(event.channel == "enderframework--title-set"){
          if(!isSub)
            document.getElementById("_title").innerHTML = event.args;
        }else if(event.channel == "enderframework--menu-hide"){
          if(_menuContent.type == "menu"){
            document.getElementById("_menu2").style.display = "none";
            document.getElementById("_title").style.display = "inline-block";
          }else if(_menuContent.type == "side"){
            document.getElementById("_sideMenu").style.display = "none";
            document.getElementById("__sideMenu").style.display = "none";
            document.getElementById("_sideMenuBorder").style.display = "none";
            document.getElementById("_topBar").classList.remove("withSideMenu");
            document.getElementById("_contentView").classList.remove("withSideMenu");
          }else if(_menuContent.type == "top"){
            document.getElementById("_topMenu").style.display = "none";
            document.getElementById("_topMenuBorder").style.display = "none";
            document.getElementById("_topBar").classList.remove("withTopMenu");
            document.getElementById("_contentView").classList.remove("withTopMenu");
          }
        }else if(event.channel == "enderframework--menu-show"){
          if(_menuContent.type == "menu"){
            document.getElementById("_menu2").style.display = "inline-block";
            if(!isSub)
              document.getElementById("_title").style.display = "none";
          }else if(_menuContent.type == "side"){
            document.getElementById("_sideMenu").style.display = "block";
            document.getElementById("__sideMenu").style.display = "block";
            document.getElementById("_sideMenuBorder").style.display = "block";
            document.getElementById("_topBar").classList.add("withSideMenu");
            document.getElementById("_contentView").classList.add("withSideMenu");
          }else if(_menuContent.type == "top"){
            document.getElementById("_topMenu").style.display = "block";
            document.getElementById("_topMenuBorder").style.display = "block";
            document.getElementById("_topBar").classList.add("withTopMenu");
            document.getElementById("_contentView").classList.add("withTopMenu");
          }
        }else if(event.channel == "enderframework--openinbrowser"){
          var opn_ = require('opn');
          event.args = event.args[0];
          if(event.args.browser == "default")
            opn_(event.args.url);
          else
            opn_(event.args.url, {app: event.args.browser});
        }else if(event.channel == "enderframework--relaunch"){
          electron.remote.app.relaunch();
          electron.remote.app.exit();
        }else if(event.channel == "ContentContextMenu"){
          if(contextMenu_){
            event.args = event.args[0];
            var Top_ = event.args.Y, Left_ = event.args.X;
            if(_menuContent.type == "none"){
              Top_ += document.getElementById("_topBar").offsetHeight;
            }
            if(event.args.type == "input"){
              showContextMenu({
                0: {
                  title: "Cut",
                  function: "ENDERFRAMEWORK_ENVIRONMENT.actions.Cut"
                },
                1: {
                  title: "Copy",
                  function: "ENDERFRAMEWORK_ENVIRONMENT.actions.Copy"
                },
                2: {
                  title: "Paste",
                  function: "ENDERFRAMEWORK_ENVIRONMENT.actions.Paste"
                },
                3: {
                  title: "Delete",
                  function: "ENDERFRAMEWORK_ENVIRONMENT.actions.Delete"
                }
              }, {
                left: Left_,
                top: Top_
              });
            }else if(event.args.type == "password"){
              showContextMenu({
                2: {
                  title: "Paste",
                  function: "ENDERFRAMEWORK_ENVIRONMENT.actions.Paste"
                },
                3: {
                  title: "Delete",
                  function: "ENDERFRAMEWORK_ENVIRONMENT.actions.Delete"
                }
              }, {
                left: Left_,
                top: Top_
              });
            }
          }
        }else if(event.channel == "do--notify"){
          var notif = document.getElementById("_notification");
          notif.removeAttribute("show");
          setTimeout(function(){
            notif.getElementsByTagName("h4")[0].innerHTML = event.args;
            notif.removeAttribute("style");
            setTimeout(function(){
              if(notif.offsetWidth + 36 > window.innerWidth)
                notif.setAttribute("style", "margin: 0px 18px;");
              notif.setAttribute("show", "");
            }, 60);
          }, 100);
          if(global.currentCountdown_notify != null)
            clearTimeout(currentCountdown_notify);
          global.currentCountdown_notify = setTimeout(function(){
            notif.removeAttribute("show");
          }, 5000);
        }else if(event.channel == "enderframework--feedback"){
          if(event.args[0]){
            document.getElementById("_FeedbackBar").style.display = "block";
          }else{
            showFeedbackScreen();
          }
        }else if(event.channel == "enderframework--record-audio"){
          //event.target.send('enderframework--record-audioR', "content");
          //content.send('enderframework--record-audioR', "content");
        }else if(event.channel == "do--openawebpage"){
          var webview = document.getElementById("_webBrowserWebview");
          webview.setAttribute("src", event.args);
          document.getElementById("_webBrowserC").style.display = "block";
        }
      });
      global.currentCountdown_notify = null;
      content.addEventListener("did-stop-loading", function(){
        document.getElementById("_cover").style.display = "block";
        if(redirectAnimations_){
          setTimeout(function(){
            document.getElementById("_cover").style.display = "none";
            content.classList.add("animated", "fadeInUp2", "fast-ish");
            setTimeout(function(){
              content.classList.remove("animated", "fadeInUp2", "fast-ish");
            }, 250);
          }, redirectCooldown_ + 360);
        }else{
          setTimeout(function(){
            document.getElementById("_cover").style.display = "none";
          }, 360);
        }
        isLoading = false;
      });
      content.addEventListener('new-window', function(e){
        const opn_ = require("opn");
        opn_(e.url);
      });
      content.addEventListener('enter-html-full-screen', function(){
        document.getElementById("_maxWin").style.display = "none";
        document.getElementById("_exitFullscreen").style.display = "inline-block";
        var ETH = document.querySelectorAll("[hideInFullscreen]");
        for(var i = 0; i < ETH.length; i++)
          ETH[i].classList.add("FSH");
      });
      content.addEventListener('leave-html-full-screen', function(){
        document.getElementById("_maxWin").style.display = "inline-block";
        document.getElementById("_exitFullscreen").style.display = "none";
        var ETH = document.querySelectorAll("[hideInFullscreen]");
        for(var i = 0; i < ETH.length; i++)
          ETH[i].classList.remove("FSH");
      });
      setTimeout(function(){
        if(devTools_){
          content.openDevTools();
        }
      }, 1000);
      clearInterval(sInt);
      //webContents.fromId(id);
      /*content.webContents.on('crashed', (event, killed) => {
        console.log(event, killed);
      });*/
    }
  }, 10);
});