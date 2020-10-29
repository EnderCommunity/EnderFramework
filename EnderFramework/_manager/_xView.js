module.exports = function(){
  //
  //const currentWindow = require("electron").remote.getCurrentWindow(), { ipcRenderer } = require('electron');
  //require("javascript-detect-element-resize");
  const xViewElements = document.getElementsByTagName("x-view");/*, reportChanges = (ID) => {
    var cData = xViewElements[ID].getBoundingClientRect();
    ipcRenderer.sendToHost('enderframework--xview-update', [ID, {
      bottom: cData.bottom,
      height: cData.height,
      left: cData.left,
      right: cData.right,
      top: cData.top,
      width: cData.width,
      x: cData.x,
      y: cData.y
    }]);
  };*/
  const observer = new MutationObserver(function(mutationsList, observer){
    for(let mutation of mutationsList){
      if(mutation.type === 'attributes'){
        if(mutation.attributeName == "type"){
          mutation.target.typeChanged();
        }else if(mutation.attributeName == "src"){
          mutation.target.srcChanged();
        }else{
          //
        }
      }
    }
  });
  class xView extends HTMLElement{
    constructor(){
      super();
      this.attachShadow({mode: 'open'});
      this.type = this.getAttribute("type");
      this.getChild = function(tagName, callback){
        Array.from(this.shadowRoot.childNodes).forEach(childNode => {
          if(childNode.nodeName == tagName){
            callback(childNode);
          }
        });
      };
      if(this.type == "web"){
        var iframe = document.createElement("iframe"), style = document.createElement("style");
        style.innerHTML = ":host { display: flex; }";
        iframe.setAttribute("style", "flex: 1 1 auto; width: 100%; border: 0px;");
        iframe.setAttribute("sandbox", "allow-forms allow-popups allow-scripts allow-same-origin");//allow-pointer-lock allow-top-navigation
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(iframe);
        if(this.hasAttribute("src")){
          iframe.src = this.getAttribute("src");
        }
      }else{
        console.error("There is no such type!");
      }
      this.typeChanged = function(){
        this.type = this.getAttribute("type");
        this.shadowRoot.innerHTML = "";
        if(this.type == "web"){
          var iframe = document.createElement("iframe"), style = document.createElement("style");
          style.innerHTML = ":host { display: flex; }";
          iframe.setAttribute("style", "flex: 1 1 auto; width: 100%; border: 0px;");
          iframe.setAttribute("sandbox", "allow-forms allow-popups allow-scripts allow-same-origin");//allow-pointer-lock allow-top-navigation
          this.shadowRoot.appendChild(style);
          this.shadowRoot.appendChild(iframe);
        }else{
          console.error("There is no such type!");
        }
      };
      this.srcChanged = function(){
        if(this.type == "web"){
          this.getChild("IFRAME", (iframe) => {
            iframe.src = this.getAttribute("src");
          });
        }else{
          //
        }
        //
      };
      observer.observe(this, { attributes: true });
    }
  }
  //
  customElements.define('x-view', xView);
  for(var i = 0; i < xViewElements.length; i++){
    xViewElements[i].inPageID = i;
    //let shadow = xViewElements[i].attachShadow({mode: 'open'});
    const type = xViewElements[i].getAttribute("type");
    if(type == "web"){
      //
    }else if(type == "window"){
      //
    }else if(type == "screen"){
      //
    }else{
      console.error("There is no such type!");
    }
    //frame.setHTML({ body: "bye" })
    /*var cData = xViewElements[i].getBoundingClientRect();
    ipcRenderer.sendToHost('enderframework--xview-create', [i, {
      bottom: cData.bottom,
      height: cData.height,
      left: cData.left,
      right: cData.right,
      top: cData.top,
      width: cData.width,
      x: cData.x,
      y: cData.y
    }]);
    const cID = i;
    addResizeListener(xViewElements[i], function(){
      reportChanges(this.inPageID);
    });
    currentWindow.on("enter-fullscreen-mode", function(){
      reportChanges(cID);
    });
    currentWindow.on("leave-fullscreen-mode", function(){
      reportChanges(cID);
    });
    currentWindow.on("maximize", function(){
      reportChanges(cID);
    });
    currentWindow.on("unmaximize", function(){
      reportChanges(cID);
    });
    currentWindow.on("minimize", function(){
      reportChanges(cID);
    });
    currentWindow.on("restore", function(){
      reportChanges(cID);
    });
    currentWindow.on("resize", function(){
      reportChanges(cID);
    });
    window.onscroll = function(){
      reportChanges(cID);
    }*/
  }
};