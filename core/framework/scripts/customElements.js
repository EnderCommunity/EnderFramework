const ShowFloatingActionContent = function(inDocumentAction, content){
  var FABElm1 = document.createElement("div"), FABElm2 = document.createElement("floatingactionbutton"), FABElm3 = document.createElement("icon");
  FABElm1.classList.add("FloatingButtonDiv");
  FABElm3.innerHTML = "close";
  FABElm2.addEventListener("click", function(){
    FABElm1.outerHTML = "";
    inDocumentAction(`document.body.classList.remove("noScroll");`);
    inDocumentAction(`{currentFloatingAction}.setAttribute("style", "-webkit-transition-duration: 0s; transition-duration: 0s;");`);
    FABElm2.classList.add("animated", "rotateIn", "faster");
    setTimeout(function(){
      inDocumentAction(`{currentFloatingAction}.setAttribute("style", "");`);
      inDocumentAction(`{currentFloatingAction}.classList.add("animated", "rotateIn2", "faster");`);
      setTimeout(function(){
        inDocumentAction(`{currentFloatingAction}.classList.remove("animated", "rotateIn2", "faster");`);
    }, 200);
    }, 10);
  });
  FABElm2.classList.add("animated", "rotateIn", "faster");
  FABElm2.setAttribute("style", "right: 42px;");
  inDocumentAction(`{currentFloatingAction}.setAttribute("style", "right: 42px; -webkit-transition-duration: 0s; transition-duration: 0s;");`);
  FABElm2.appendChild(FABElm3);
  FABElm1.appendChild(FABElm2);
  const FABContent = JSON.parse(content);
  var FABPosition = 28 + 64, FABNumber = 35;
  for(var v in FABContent){
    var el = document.createElement("floatingactionbutton"), el2 = document.createElement("icon");
    el.setAttribute("style", "right: 42px; bottom: " + FABPosition +"px; animation-delay: " + FABNumber + "ms;");
    FABPosition += 64;
    FABNumber += 35;
    el.classList.add("animated", "bounceInUp", "faster");
    el2.innerHTML = FABContent[v].icon;
    el.appendChild(el2);
    el._function = `(${FABContent[v].onclick})();`;
    el.addEventListener("click", function(){
      _content.executeJavaScript(this._function);
      FABElm1.outerHTML = "";
      inDocumentAction(`document.body.classList.remove("noScroll");`);
      inDocumentAction(`{currentFloatingAction}.setAttribute("style", "-webkit-transition-duration: 0s; transition-duration: 0s;");`);
      FABElm2.classList.add("animated", "rotateIn", "faster");
      setTimeout(function(){
        inDocumentAction(`{currentFloatingAction}.setAttribute("style", "");`);
      }, 10);
    });
    FABElm1.appendChild(el);
  }
  document.body.insertBefore(FABElm1, document.body.lastChild);
  inDocumentAction(`document.body.classList.add("noScroll");`);
};