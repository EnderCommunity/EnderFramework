const showMessageBox_ = function (t, m, d, b){
  var box, title, message, details, buttonsC;
  document.body.classList.add("noScroll");
  const main = document.createElement("div");
  //main.classList.add("COfAlert", "animated", "fadeIn", "faster");
  main.classList.add("COfAlert");
  const removeF = function(){
    main.outerHTML = "";
    document.body.classList.remove("noScroll");
    _content.focus();
  };
  document.body.appendChild(main);
  box = document.createElement("div");
  box.classList.add("AlertBox", "animated", "fadeInUp", "faster");
  main.appendChild(box);
  title = document.createElement("text");
  title.classList.add("title");
  title.innerHTML = t;
  box.appendChild(title);
  message = document.createElement("text");
  message.classList.add("message");
  message.innerHTML = m;
  box.appendChild(message);
  buttonsC = document.createElement("div");
  buttonsC.classList.add("COfButton");
  box.appendChild(buttonsC);
  for(var i = 0; i < b.length; i++){
    const cb = b[i];
    var button = document.createElement("button");
    button.setAttribute(cb.type, "");
    button.innerHTML = cb.text;
    button.function = (cb.onclick != undefined) ? cb.onclick : "function(){}";
    button.addEventListener("click", function(){
      _content.executeJavaScript(`(${this.function})();`);
      removeF();
    });
    buttonsC.appendChild(button);
  }
  details = document.createElement("text");
  details.classList.add("details");
  details.innerHTML = d;
  box.appendChild(details);
};