(function(){
var topElement = document.getElementsByTagName("top");
if(topElement.length > 0){
  global._checkFunction1 = function(){
    return false;
  };
  if(topElement.length > 1)
    for(var i_ = 1; i_ < topElement.length; i_++)
      topElement[i_].outerHTML = "";
  topElement = topElement[0];
  //topElement.classList.add("animated", "fadeIn");
  topElement.setAttribute("style", "background-image: url(" + topElement.getAttribute("background") + ");");
  setTimeout(function(){
    var slowDiv = topElement.getElementsByTagName("card")[0];
    var styleElm = document.createElement("style");
    document.body.insertBefore(styleElm, document.body.lastChild);
    if(slowDiv === undefined){
      styleElm.innerHTML = "top:before{ opacity: 0; }";
    }else{
      styleElm.innerHTML = "top:before{ opacity: 0.9; }";
      var _loop = setInterval(function(){
        var v = ((window.outerHeight*0.4) - 64);
        if(v > 0){
          slowDiv.style.top = v + 'px';
          clearInterval(_loop);
        }
      }, 200);
      var added_ = false, scrollY = 0;
      setTimeout(function(){
        window.onscroll = function WindowScroll(){
          if(!added_){
            added_ = true;
            slowDiv.setAttribute("style", "-webkit-transition-duration: 0ms; transition-duration: 0ms; " + slowDiv.getAttribute("style"));
          }
          scrollY = this.scrollY;
          var topVal = ((window.outerHeight*0.4) - 64) - scrollY*1.001;
          slowDiv.style.top = topVal + 'px';
          var v_ = (0.9 - window.scrollY*4/window.outerHeight + "").substring(0, 6);
          var hidden_ = false;
          if(scrollY >= window.outerHeight*0.8 || v_ <= 0){
            if(!hidden_){
              hidden_ = true;
              styleElm.innerHTML = "top:before{ opacity: 0; }";
            }
          }else{
            if(hidden_)
              hidden_ = false;
            styleElm.innerHTML = "top:before{ opacity: " + v_ + "; }";
          }
        };
        window.onresize = function(){
          var topVal = ((window.outerHeight*0.4) - 64) - scrollY*1.001;
          slowDiv.style.top = topVal + 'px';
        };
      }, 0);
    }
  }, 0);
}
Elms = document.getElementsByTagName("floatingactionbutton");
for(var i = 0; i < Elms.length; i++){
  Elms[i].fABEID = ENDERFRAMEWORK_ENVIRONMENT.elements.floatingActionButton.length;
  ENDERFRAMEWORK_ENVIRONMENT.elements.floatingActionButton[ENDERFRAMEWORK_ENVIRONMENT.elements.floatingActionButton.length] = Elms[i];
  Elms[i].addEventListener("click", function(){
    ENDERFRAMEWORK_ENVIRONMENT.elementActions.floatingButtonClicked(this.fABEID, this.getAttribute("content"));
    //ENDERFRAMEWORK_ENVIRONMENT.elementActions.floating
    /*var FABElm1 = document.createElement("div"), FABElm2 = document.createElement("floatingactionbutton"), FABElm3 = document.createElement("icon"), This = this;
    FABElm1.classList.add("FloatingButtonDiv");
    FABElm3.innerHTML = "close";
    FABElm2.addEventListener("click", function(){
      FABElm1.outerHTML = "";
      document.body.classList.remove("noScroll");
      This.setAttribute("style", "-webkit-transition-duration: 0s; transition-duration: 0s;");
      FABElm2.classList.add("animated", "rotateIn", "faster");
      setTimeout(function(){
        This.setAttribute("style", "");
        This.classList.add("animated", "rotateIn2", "faster");
        setTimeout(function(){
          This.classList.remove("animated", "rotateIn2", "faster");
        }, 200);
      }, 10);
    });
    FABElm2.classList.add("animated", "rotateIn", "faster");
    FABElm2.setAttribute("style", "right: 42px;");
    This.setAttribute("style", "right: 42px; -webkit-transition-duration: 0s; transition-duration: 0s;");
    FABElm2.appendChild(FABElm3);
    FABElm1.appendChild(FABElm2);
    var FABContent = JSON.parse(this.getAttribute("content")), FABPosition = 28 + 64, FABNumber = 35;
    for(var v in FABContent){
      var el = document.createElement("floatingactionbutton"), el2 = document.createElement("icon");
      el.setAttribute("style", "right: 42px; bottom: " + FABPosition +"px; animation-delay: " + FABNumber + "ms;");
      FABPosition += 64;
      FABNumber += 35;
      el.classList.add("animated", "bounceInUp", "faster");
      el2.innerHTML = FABContent[v].icon;
      el.appendChild(el2);
      el.addEventListener("click", function(){
        FABElm1.outerHTML = "";
        document.body.classList.remove("noScroll");
        This.setAttribute("style", "-webkit-transition-duration: 0s; transition-duration: 0s;");
        FABElm2.classList.add("animated", "rotateIn", "faster");
        setTimeout(function(){
          This.setAttribute("style", "");
        }, 10);
      });
      el.setAttribute("onclick", FABContent[v].onclick + "");
      FABElm1.appendChild(el);
    }
    document.body.insertBefore(FABElm1, document.body.lastChild);
    document.body.classList.add("noScroll");*/
  });
}
Elms = document.getElementsByTagName("cardView");
for(var i = 0; i < Elms.length; i++){
  var cards = Elms[i].getElementsByTagName("card");
  for(var i2 = 0; i2 < cards.length; i2++){
    if(i2 == 1){
      cards[i2].setAttribute("style", "background: " + cards[i2].getAttribute("background") + " no-repeat; background-size: cover;");
      cards[i2].classList.add("cards_right");
      cards[i2].setAttribute("side2", "");
    }else if(i2 != 0){
      cards[i2].setAttribute("style", "background: " + cards[i2].getAttribute("background") + " no-repeat; background-size: cover;");
      cards[i2].classList.add("cards_right_");
    }else{
      cards[i2].setAttribute("style", "background: " + cards[i2].getAttribute("background") + " no-repeat; background-size: cover;");
      cards[i2].classList.add("cards_center");
    }
    if(i2 > 0 && !cards[i2].hasAttribute("side2"))
      cards[i2].setAttribute("side", "");
  }
  var ElmsAuto = Elms[i].hasAttribute("auto");
  if(ElmsAuto == true){
    ElmsAuto = Elms[i].getAttribute("time");
    if(ElmsAuto === undefined || ElmsAuto == null)
      ElmsAuto = 5000;
    if(cards.length > 1){
      setInterval(function(){
        var TempCards = [], selectedIndex = -1;
        for(var i_ = 0; i_ < cards.length; i_++){
          if(cards[i_].hasAttribute("side") && selectedIndex == -1)
            TempCards[i_] = "hidden-left";
          else if(cards[i_].hasAttribute("side") && selectedIndex > -1)
            TempCards[i_] = "hidden-right";
          else if(cards[i_].hasAttribute("side2")){
            if(selectedIndex == -1)
              TempCards[i_] = "left";
            else
              TempCards[i_] = "right";
          }else if(!cards[i_].hasAttribute("side")){
            TempCards[i_] = "center";
            selectedIndex = i_;
          }
        }
        selectedIndex++;
        var hasCenter = false;
        for(var i_ = 0; i_ < TempCards.length; i_++)
          if(i_ == selectedIndex){
            TempCards[i_] = "center";
            hasCenter = true;
          }else if(i_ == selectedIndex - 1)
            TempCards[i_] = "left";
          else if(i_ == selectedIndex + 1)
            TempCards[i_] = "right";
          else if(i_ < selectedIndex - 1)
            TempCards[i_] = "hidden-left";
          else if(i_ > selectedIndex + 1)
            TempCards[i_] = "hidden-right";
        if(!hasCenter){
          TempCards[0] = "center";
          TempCards[1] = "right";
          if(cards.length > 2)
            for(var i__ = 2; i__ < TempCards.length; i__++)
              TempCards[i__] = "hidden-right";
        }
        for(var i_ = 0; i_ < cards.length; i_++)
          if(TempCards[i_] == "center"){
            cards[i_].removeAttribute("side");
            cards[i_].removeAttribute("side2");
            cards[i_].classList.remove("cards_left", "cards_right", "cards_left_", "cards_right_", "cards_center");
            cards[i_].classList.add("cards_center");
          }else if(TempCards[i_] == "left"){
            cards[i_].removeAttribute("side");
            cards[i_].setAttribute("side2", "");
            cards[i_].classList.remove("cards_left", "cards_right", "cards_left_", "cards_right_", "cards_center");
            cards[i_].classList.add("cards_left");
          }else if(TempCards[i_] == "right"){
            cards[i_].removeAttribute("side");
            cards[i_].setAttribute("side2", "");
            cards[i_].classList.remove("cards_left", "cards_right", "cards_left_", "cards_right_", "cards_center");
            cards[i_].classList.add("cards_right");
          }else if(TempCards[i_] == "hidden-left"){
            cards[i_].setAttribute("side", "");
            cards[i_].removeAttribute("side2");
            cards[i_].classList.remove("cards_left", "cards_right", "cards_left_", "cards_right_", "cards_center");
            cards[i_].classList.add("cards_left_");
          }else if(TempCards[i_] == "hidden-right"){
            cards[i_].setAttribute("side", "");
            cards[i_].removeAttribute("side2");
            cards[i_].classList.remove("cards_left", "cards_right", "cards_left_", "cards_right_", "cards_center");
            cards[i_].classList.add("cards_right_");
          }
      }, ElmsAuto);
    }
  }else if(ElmsAuto == "false"){
    //Controls NOTE: add it later!
  }
}
Elms = document.getElementsByTagName("imageView");
for(var i = 0; i < Elms.length; i++){
  var pButton = document.createElement("control"), nButton = document.createElement("control"), pIcon = document.createElement("icon"), nIcon = document.createElement("icon");
  pButton.setAttribute("p", "");
  pButton.setAttribute("disabled", "");
  nButton.setAttribute("n", "");
  pIcon.innerHTML = "navigate_before";
  nIcon.innerHTML = "navigate_next";
  pButton.parentElement = Elms[i];
  nButton.parentElement = Elms[i];
  nButton.brotherButton = pButton;
  pButton.brotherButton = nButton;
  pButton.appendChild(pIcon);
  Elms[i].insertBefore(pButton, Elms[i].lastChild);
  nButton.appendChild(nIcon);
  Elms[i].insertBefore(nButton, Elms[i].lastChild);
  var imgs = Elms[i].getElementsByTagName("img");
  for(var i2 = 0; i2 < imgs.length; i2++){
    imgs[i2].classList.add("animated", "fadeIn", "fast");
    if(i2 > 0)
      imgs[i2].setAttribute("hidden", "");
  }
  if(imgs.length == 1){
    nButton.setAttribute("disabled", "");
  }
  if(Elms[i].hasAttribute("auto")){
    nButton.outerHTML = "";
    pButton.outerHTML = "";
    (function(){
      const Element = Elms[i], images = imgs;
      var time = Element.getAttribute("auto") || 6000, loop = setInterval(function(){
        var done = false;
        for(var i_ = 0; i_ < images.length; i_++){
          if(!images[i_].hasAttribute("hidden") && !done){
            done = true;
            images[i_].setAttribute("hidden", "");
            if(i_ == images.length - 1){
              images[0].removeAttribute("hidden");
            }else{
              images[i_ + 1].removeAttribute("hidden");
            }
          }
        }
      }, time);
    })();
  }else{
    pButton.addEventListener("click", function(){
      var parent = this.parentElement, images = parent.getElementsByTagName("img"), brotherButton = this.brotherButton, done = false;
      for(var i_ = 0; i_ < images.length; i_++){
        if(!images[i_].hasAttribute("hidden") && !done){
          done = true;
          images[i_].setAttribute("hidden", "");
          images[i_ - 1].removeAttribute("hidden");
          if(i_ - 1 == 0){
            this.setAttribute("disabled", "");
          }
          brotherButton.removeAttribute("disabled");
        }
      }
    });
    nButton.addEventListener("click", function(){
      var parent = this.parentElement, images = parent.getElementsByTagName("img"), brotherButton = this.brotherButton, done = false;
      for(var i_ = 0; i_ < images.length; i_++){
        if(!images[i_].hasAttribute("hidden") && !done){
          done = true;
          images[i_].setAttribute("hidden", "");
          images[i_ + 1].removeAttribute("hidden");
          if(i_ + 1 == images.length - 1){
            this.setAttribute("disabled", "");
          }
          brotherButton.removeAttribute("disabled");
        }
      }
    });
  }
}
Elms = document.getElementsByTagName("selector");
for(var i = 0; i < Elms.length; i++){
  const cElms = Elms[i], indicator = document.createElement("indicator"), options = cElms.getElementsByTagName("option");
  setTimeout(function(){
    indicator.style.width = "calc(" + (1/options.length)*100 + "% - 96px)";
    indicator.style.left = "0px";
  }, 100);
  cElms.insertBefore(indicator, cElms.firstChild);
  const n = i;
  cElms.setOption = (name) => {
    var theTarget = cElms.querySelector("option[value=" + name + "]"), aO = cElms.getElementsByTagName("option"), tN = null;
    if(name == null){
      indicator.style.width = "0px";
      indicator.style.left = "0px";
    }else if(theTarget !== null && !theTarget.hasAttribute("disabled")){
      for(var i2 = 0 ; i2 < aO.length; i2++)
        if(theTarget === aO[i2])
          tN = i2;
      indicator.style.width = "calc(" + (1/options.length)*100 + "% - 96px)";
      indicator.style.left = (n/options.length)*100 + "%";
    }else{
      console.error("No such value was found! (`" + name + "`)");
    }
  };
  for(var i2 = 0; i2 < options.length; i2++){
    options[i2].number = i2;
    options[i2].oLenght = options.length;
    options[i2].indicator = indicator;
    options[i2].style.width = (1/options.length)*100 + "%";
    options[i2].addEventListener("click", function(){
      var n = this.number, w = this.clientWidth, oL = this.oLenght;
      this.indicator.style.width = "calc(" + (1/options.length)*100 + "% - 96px)";
      this.indicator.style.left = (n/options.length)*100 + "%";
    });
  }
}
Elms = document.getElementsByTagName("view");
for(var i = 0; i < Elms.length; i++){
  Elms[i].layout = null;
  const n = i;
  Elms[i].setLayout = (name) => {
    var mE = document.getElementsByTagName("view")[n], aL = mE.getElementsByTagName("layout");
    for(var i2 = 0; i2 < aL.length; i2++)
      aL[i2].setAttribute("hidden", "");
    mE.querySelector("layout[name=" + name + "]").removeAttribute("hidden");
    mE.layout = name;
  };
  var layouts = Elms[i].getElementsByTagName("layout");
  for(var i2 = 0; i2 < layouts.length; i2++){
    if(i2 == 0){
      Elms[i].layout = layouts[i2].getAttribute("name");
      layouts[i2].removeAttribute("hidden");
    }else{
      layouts[i2].setAttribute("hidden", "");
    }
  }
}
Elms = document.getElementsByTagName("collapse");
for(var i = 0; i < Elms.length; i++){
  const Arrow = document.createElement("icon"), Content = Elms[i].getElementsByTagName("content")[0], Header = Elms[i].getElementsByTagName("header")[0];
  Arrow.innerHTML = "keyboard_arrow_down";
  Header.insertBefore(Arrow, Header.firstChild);
  Content.setAttribute("hidden", "");
  Content.classList.add("animated", "slideInDown", "faster");
  Header.addEventListener("click", function(){
    if(Content.hasAttribute("hidden")){
      Content.removeAttribute("hidden");
      Arrow.style.transform = 'rotate(-180deg)';
    }else{
      Content.setAttribute("hidden", "");
      Arrow.style.transform = 'rotate(0deg)';
    }
  });
}
Elms = document.getElementsByTagName("pagination");
for(var i = 0; i < Elms.length; i++){
  const Elm = Elms[i], options = Elm.getElementsByTagName("option"), backButton = Elm.getElementsByTagName("back")[0], forwardButton = Elm.getElementsByTagName("forward")[0], check = function(This){
    if(This.FoL == 0){
      backButton.setAttribute("disabled", "");
      forwardButton.removeAttribute("disabled");
    }else if(This.FoL == 1){
      backButton.removeAttribute("disabled");
      forwardButton.setAttribute("disabled", "");
    }else if(This.FoL == 2){
      backButton.setAttribute("disabled", "");
      forwardButton.setAttribute("disabled", "");
    }else{
      backButton.removeAttribute("disabled");
      forwardButton.removeAttribute("disabled");
    }
  };
  backButton.innerHTML = "keyboard_arrow_left";
  forwardButton.innerHTML = "keyboard_arrow_right";
  options[0].FoL = 0;
  options[options.length - 1].FoL = 1;
  if(options.length == 1)
    options[0].FoL = 2;
  for(var i2 = 0; i2 < options.length; i2++){
    options[i2].number = i2;
    options[i2].addEventListener("click", function(){
      const This = this;
      for(var i3 = 0; i3 < options.length; i3++)
        options[i3].removeAttribute("selected");
      This.setAttribute("selected", "");
      check(This);
    });
  }
  var selectedOption = Elm.querySelector("option[selected]");
  if(selectedOption !== undefined){
    check(selectedOption);
  }else{
    backButton.removeAttribute("disabled");
    forwardButton.removeAttribute("disabled");
  }
  backButton.addEventListener("click", function(){
    var sE = Elm.querySelector("option[selected]");
    sE.removeAttribute("selected");
    options[sE.number - 1].setAttribute("selected", "");
    check(options[sE.number - 1]);
  });
  forwardButton.addEventListener("click", function(){
    var sE = Elm.querySelector("option[selected]");
    sE.removeAttribute("selected");
    options[sE.number + 1].setAttribute("selected", "");
    check(options[sE.number + 1]);
  });
}
Elms = document.getElementsByTagName("gallery");
for(var i = 0; i < Elms.length; i++){
  (function(){
    const mainElm = Elms[i], content = mainElm.querySelectorAll("*"), section1 = document.createElement("section"), section2 = document.createElement("section"), section3 = document.createElement("section");
    mainElm.section = 3;
    for(var i2 = 0; i2 < content.length; i2++){
      content[i2].classList.add("animated", "fadeInUp", "fast");
      if(mainElm.section == 1){
        section1.appendChild(content[i2]);
        mainElm.section = 3;
      }else if(mainElm.section == 2){
        section2.appendChild(content[i2]);
        mainElm.section = 1;
      }else if(mainElm.section == 3){
        section3.appendChild(content[i2]);
        mainElm.section = 2;
      }
      if(content[i2].tagName == "VIDEO"){
        var CoV = document.createElement("div");
        CoV.classList.add("video");
        if(mainElm.section == 1)
          section2.appendChild(CoV);
        else if(mainElm.section == 2)
          section1.appendChild(CoV);
        else if(mainElm.section == 3)
          section1.appendChild(CoV);
        CoV.appendChild(content[i2]);
        content[i2].volume = 0;
        content[i2].addEventListener("mouseover", function(){
          this.play();
        });
        content[i2].addEventListener("mouseout", function(){
          this.currentTime = 0;
          this.pause();
        });
      }
    }
    mainElm.sections = [section1, section2, section3];
    mainElm.appendChild(section1);
    mainElm.appendChild(section2);
    mainElm.appendChild(section3);
    mainElm.appendMediaElement = function(Element){
      Element.classList.add("animated", "fadeInUp", "fast");
      if(mainElm.section == 1){
        mainElm.sections[0].appendChild(Element);
        mainElm.section = 3;
      }else if(mainElm.section == 2){
        mainElm.sections[1].appendChild(Element);
        mainElm.section = 1;
      }else if(mainElm.section == 3){
        mainElm.sections[2].appendChild(Element);
        mainElm.section = 2;
      }
    };
  })();
}
Elms = document.getElementsByTagName("carousel");
for(var i = 0; i < Elms.length; i++){
  const element = Elms[i], images = element.getElementsByTagName("img"), onClick = function(E){
    E.addEventListener("click", function(){
      var image = this, allImages = image.mainElement.getElementsByTagName("img");
      const removeAll = function(Element){
        Element.removeAttribute("center");
        Element.removeAttribute("right-1");
        Element.removeAttribute("left-1");
        Element.removeAttribute("right-2");
        Element.removeAttribute("left-2");
        Element.removeAttribute("right-hidden");
        Element.removeAttribute("left-hidden");
      };
      for(var i_ = 0; i_ < allImages.length; i_++){
        removeAll(allImages[i_]);
        if(i_ > image.number + 2)
          allImages[i_].setAttribute("right-hidden", "");
        else if(i_ < image.number - 2)
          allImages[i_].setAttribute("left-hidden", "");
      }
      image.setAttribute("center", "");
      if(image.number - 1 >= 0){
        allImages[image.number - 1].setAttribute("left-1", "");
      }
      if(image.number - 2 >= 0){
        allImages[image.number - 2].setAttribute("left-2", "");
      }
      if(image.number + 1 <= allImages.length - 1){
        allImages[image.number + 1].setAttribute("right-1", "");
      }
      if(image.number + 2 <= allImages.length - 1){
        allImages[image.number + 2].setAttribute("right-2", "");
      }
    });
  };
  (function(){
    element.appendMediaElement = function(elm){
      var allImages = element.getElementsByTagName("img");
      if(allImages[allImages.length - 1].hasAttribute("right-hidden") || allImages[allImages.length - 1].hasAttribute("right-2")){
        elm.setAttribute("right-hidden", "");
      }else if(allImages[allImages.length - 1].hasAttribute("right-1")){
        elm.setAttribute("right-2", "");
      }else if(allImages[allImages.length - 1].hasAttribute("center")){
        elm.setAttribute("right-1", "");
      }
      elm.number = allImages.length;
      elm.mainElement = element;
      onClick(elm);
      element.appendChild(elm);
    };
  })();
  for(var i2 = 0; i2 < images.length; i2++){
    if(i2 == 0)
      images[0].setAttribute("center", "");
    else if(i2 == 1)
      images[1].setAttribute("right-1", "");
    else if(i2 == 2)
      images[2].setAttribute("right-2", "");
    else
      images[i2].setAttribute("right-hidden", "");
    images[i2].mainElement = element;
    images[i2].number = i2;
    onClick(images[i2]);
  }
}
delete Elms;
})();
setTimeout(function(){
  areCustomElementsLoaded = true;
}, 100);