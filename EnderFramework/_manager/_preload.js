global._shouldWait = false;
global.loop____ = null;
const win__ = require('electron').remote.getCurrentWindow();
global.isSub = false;
global.subInfo = {
  url: null,
  width: null,
  height: null,
  title: null
};
var _messageDone = false;
window.addEventListener("message", function(e){
  if(!_messageDone){
    _messageDone = true;
    //alert(message);
    isSub = true;
    //win.webContents.openDevTools();
    console.log(e);
    subInfo.url = e.data.url[0];
    subInfo.width = e.data.url[1];
    subInfo.height = e.data.url[2];
    subInfo.title = e.data.url[3];
    subInfo.minWidth = e.data.url[4];
    subInfo.minHeight = e.data.url[5];
    subInfo.maxWidth = e.data.url[6];
    subInfo.maxHeight = e.data.url[7];
    (function(){
      win__.setResizable(true);
      win__.setMaximizable(false);
      win__.setMinimizable(false);
      if(subInfo.minWidth !== null && subInfo.minHeight !== null)
        win__.setMinimumSize(subInfo.minWidth, subInfo.minHeight);
      if(subInfo.maxWidth !== null && subInfo.maxHeight !== null)
        win__.setMaximumSize(subInfo.maxWidth, subInfo.maxHeight);
      win__.setSize(subInfo.width, subInfo.height);
    })();
  }
}, false);
global._content = null;
global.system = require('os');
global.content = null;
global.loaded = 0;
global.tN = 4;
var cooldownP = 0;
global.doneLoadingInfo = function(cooldown = 0){
  if(cooldown > 0){
    cooldownP = cooldown;
  }
  if(cooldown == -1){
    return loaded;
  }else{
    loaded++;
    if(loaded == tN){
      setTimeout(function(){
        document.getElementById("_splash").outerHTML = "";
        document.getElementById("_contentView").setAttribute("style", "");
      }, cooldownP);
    }
  }
};
global.TopFramework = {
  setTitle: function(t){
    document.title = t;
    document.getElementById("_title").innerHTML = t;
  },
  setIcon: function(path){
    if(path.substring(path.length - 3) == "png"){
      document.getElementById("_icon").setAttribute("src", appPath + "resources\\" + path);
      document.getElementById("_icon").style.display = "inline-block";
      try{
        document.getElementById("_pageIcon").setAttribute("href", appPath + "resources\\" + path);
        win.setIcon(appPath + "resources\\" + path);
      }catch{
        console.error("The icon isn't valid!");
      }
    }else{
      console.warn("The icon format must be PNG!");
    }
  },
  splashText: function(t){
    document.getElementById("_splashText").innerHTML = t;
  }
};
global.electron = require("electron");
const { ipcRenderer } = require('electron');
global.devTools_ = false;
global.spellcheck_ = false;
global.JavaScript_ = true;
global.redirectAnimations_ = true;
global.redirectCooldown_ = 0;
global.theme_ = "_default";
global.startPath_ = null;
global.startPath__ = null;
global.fs = require('fs');
global.splashScreen_ = true;
global._menuContent = null;
global.infoScreen_ = true;
global.appDFTIS = ["Unknown", "Unknown", "Unknown"];
global.contextMenu_ = true;
global.connection_ = [null, null, null];
global.appPath = null;
global.maximizeOnStart__ = null;

var appInfoS = ipcRenderer.sendSync('data', "");
devTools_ = appInfoS[0];
spellcheck_ = appInfoS[1];
JavaScript_ = appInfoS[2];
redirectAnimations_ = appInfoS[3];
redirectCooldown_ = appInfoS[4];
theme_ = appInfoS[5];
startPath_ = appInfoS[6];
startPath__ =   startPath_.replace(/(\\)/g, "/");
splashScreen_ = appInfoS[7];
_menuContent = appInfoS[8];
infoScreen_ = appInfoS[9];
appDFTIS = appInfoS[10];
contextMenu_ = appInfoS[11];
connection_ = appInfoS[12];
appPath = appInfoS[13];
maximizeOnStart__ = appInfoS[14];
doneLoadingInfo();

global.path = require('path');
const { remote, desktopCapturer } = require('electron');
global.win = remote.getCurrentWindow();
win.hide();

document.addEventListener("DOMContentLoaded", function(event){
  //document.getElementById("_contentView").openDevTools();
  var loop = setInterval(function(){
    if(maximizeOnStart__ != null){
      clearInterval(loop);
      if(maximizeOnStart__ && !isSub)
        win.maximize();
      if(isSub){
        setTimeout(function(){
          var title = document.getElementById("_title");
          title.innerHTML = title.innerHTML + " | " + subInfo.title;
          document.getElementById("__longLoading").style.display = "none";
        }, 0);
        //require('electron').remote.getCurrentWindow().setSize("260px", "180px");
      }
      win.show();
      win.focus();
    }
  }, 10);
  doneLoadingInfo();
  if(!splashScreen_){
    document.getElementById("_splash").style.display = "none";
  }
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches, isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches, isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches, hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;
  if(isDarkMode){
    document.documentElement.setAttribute('prefers-color-scheme', 'dark');
    document.getElementById("_splash_image").setAttribute("src", appPath + "resources\\_splash_dark.png");
    TopFramework.setIcon("_icon_dark.png");
  }else{
    document.documentElement.setAttribute('prefers-color-scheme', 'light');
    document.getElementById("_splash_image").setAttribute("src", appPath + "resources\\_splash_light.png");
    TopFramework.setIcon("_icon_light.png");
  }
});
global.style = null;
global.aniamtions = null;
global.icons = null;
global.font = null;
global.CodeMirror_Mode_Xml = null;
global.CodeMirror_Mode_JavaScript = null;
global.CodeMirror_Mode_CSS = null;
global.CodeMirror_Mode_HTMLMixed = null;
global.CodeMirror_AddOn_MatchBrackets = null;
global.CodeMirror_AddOn_CloseTag = null;
global.CodeMirror_CodeBox = null;
global.CodeMirror_CodeBox_style = null;
global.CodeMirror_CodeBox_INSERT = null;
global.CodeMirror_CodeBox_code = null;
global.CodeMirror_CodeBox_Hints = null;
global.CodeMirror_CodeBox_Hint = null;
global.CodeMirror_CodeBox_Hint_AnyWord = null;
global.CodeMirror_CodeBox_Hint_CSS = null;
global.CodeMirror_CodeBox_Hint_HTML = null;
global.CodeMirror_CodeBox_Hint_JavaScript = null;
global.CodeMirror_CodeBox_Hint_SQL = null;
global.CodeMirror_CodeBox_Hint_XML = null;
global.CodeMirror_Mode_APL = null;
global.CodeMirror_Mode_ASN1 = null;
global.CodeMirror_Mode_Asterisk = null;
global.CodeMirror_Mode_Brainfuck = null;
global.CodeMirror_Mode_CLike = null;
global.CodeMirror_Mode_Clojure = null;
global.CodeMirror_Mode_CSS = null;
global.CodeMirror_Mode_CMake = null;
global.CodeMirror_Mode_COBOL = null;
global.CodeMirror_Mode_CoffeeScript = null;
global.CodeMirror_Mode_CommonLisp = null;
global.CodeMirror_Mode_Crystal = null;
global.CodeMirror_Mode_Cypher = null;
global.CodeMirror_Mode_Python = null;
global.CodeMirror_Mode_D = null;
global.CodeMirror_Mode_Dart = null;
global.CodeMirror_Mode_Django = null;
global.CodeMirror_Mode_Dockerfile = null;
global.CodeMirror_Mode_Diff = null;
global.CodeMirror_Mode_DTD = null;
global.CodeMirror_Mode_Dylan = null;
global.CodeMirror_Mode_EBNF = null;
global.CodeMirror_Mode_ECL = null;
global.CodeMirror_Mode_Eiffel = null;
global.CodeMirror_Mode_Elm = null;
global.CodeMirror_Mode_Factor = null;
global.CodeMirror_Mode_FCL = null;
global.CodeMirror_Mode_Erlang = null;
global.CodeMirror_Mode_Forth = null;
global.CodeMirror_Mode_Fortran = null;
global.CodeMirror_Mode_MLLike = null;
global.CodeMirror_Mode_Gas = null;
global.CodeMirror_Mode_Gherkin = null;
global.CodeMirror_Mode_Go = null;
global.CodeMirror_Mode_Groovy = null;
global.CodeMirror_Mode_HAML = null;
global.CodeMirror_Mode_Handlebars = null;
global.CodeMirror_Mode_Haskell = null;
global.CodeMirror_Mode_Haxe = null;
global.CodeMirror_Mode_HTMLEmbedded = null;
global.CodeMirror_Mode_HTTP = null;
global.CodeMirror_Mode_HaskellLiterate = null;
global.CodeMirror_Mode_IDL = null;
global.CodeMirror_Mode_Julia = null;
global.CodeMirror_Mode_LiveScript = null;
global.CodeMirror_Mode_Lua = null;
global.CodeMirror_Mode_Markdown = null;
global.CodeMirror_Mode_Mathematica = null;
global.CodeMirror_Mode_JSX = null;
global.CodeMirror_Mode_GFM = null;
global.CodeMirror_Mode_MBox = null;
global.CodeMirror_Mode_MIRC = null;
global.CodeMirror_Mode_Modelica = null;
global.CodeMirror_Mode_MUMPS = null;
global.CodeMirror_Mode_MscGen = null;
global.CodeMirror_Mode_NGINX = null;
global.CodeMirror_Mode_NSIS = null;
global.CodeMirror_Mode_NTriples = null;
global.CodeMirror_Mode_Octave = null;
global.CodeMirror_Mode_Oz = null;
global.CodeMirror_Mode_Pascal = null;
global.CodeMirror_Mode_PEGJS = null;
global.CodeMirror_Mode_Perl = null;
global.CodeMirror_Mode_ASCIIArmor = null;
global.CodeMirror_Mode_PHP = null;
global.CodeMirror_Mode_Pig = null;
global.CodeMirror_Mode_PowerShell = null;
global.CodeMirror_Mode_Properties = null;
global.CodeMirror_Mode_ProtoBuf = null;
global.CodeMirror_Mode_Pug = null;
global.CodeMirror_Mode_Puppet = null;
global.CodeMirror_Mode_Q = null;
global.CodeMirror_Mode_R = null;
global.CodeMirror_Mode_RPM = null;
global.CodeMirror_Mode_ReStructuredText = null;
global.CodeMirror_Mode_Ruby = null;
global.CodeMirror_Mode_Rust = null;
global.CodeMirror_Mode_SAS = null;
global.CodeMirror_Mode_Sass = null;
global.CodeMirror_Mode_Spreadsheet = null;
global.CodeMirror_Mode_Scheme = null;
global.CodeMirror_Mode_Shell = null;
global.CodeMirror_Mode_Sieve = null;
global.CodeMirror_Mode_SmallTalk = null;
global.CodeMirror_Mode_SLIM = null;
global.CodeMirror_Mode_Smarty = null;
global.CodeMirror_Mode_Solr = null;
global.CodeMirror_Mode_Soy = null;
global.CodeMirror_Mode_SQL = null;
global.CodeMirror_Mode_Stylus = null;
global.CodeMirror_Mode_SPARQL = null;
global.CodeMirror_Mode_Swift = null;
global.CodeMirror_Mode_STeX = null;
global.CodeMirror_Mode_Tcl = null;
global.CodeMirror_Mode_Textile = null;
global.CodeMirror_Mode_TiddlyWiki = null;
global.CodeMirror_Mode_TikiWiki = null;
global.CodeMirror_Mode_TOML = null;
global.CodeMirror_Mode_Tornado = null;
global.CodeMirror_Mode_Troff = null;
global.CodeMirror_Mode_TTCN = null;
global.CodeMirror_Mode_TTCN_CFG = null;
global.CodeMirror_Mode_Turtle = null;
global.CodeMirror_Mode_Twig = null;
global.CodeMirror_Mode_VBNET = null;
global.CodeMirror_Mode_VBScript = null;
global.CodeMirror_Mode_Velocity = null;
global.CodeMirror_Mode_SystemVerilog = null;
global.CodeMirror_Mode_VHDL = null;
global.CodeMirror_Mode_VueJS = null;
global.CodeMirror_Mode_WebIDL = null;
global.CodeMirror_Mode_XML = null;
global.CodeMirror_Mode_XQuery = null;
global.CodeMirror_Mode_Yacas = null;
global.CodeMirror_Mode_YAML = null;
global.CodeMirror_Mode_YAMLFrontMatter = null;
global.CodeMirror_Mode_Z80 = null;
global.CustomElementsScript = null;
global.CustomFunctionsScript = null;
global.OnScrollAnimation = null;
global.ToolTip = null;
global.Media = null;
global.filesToLoad = null;