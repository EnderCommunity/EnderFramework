(function(){
  var Elms = document.querySelectorAll("[tooltip-content]"), createTooltip = function(tElement, position, content){
    var tooltip = document.createElement("div");
    tooltip.classList.add("tooltip--box", "animated", "faster", "fadeIn" + (function(){
      if(position == "top")
        return "Up";
      else if(position == "bottom")
        return "Down";
      else if(position == "left")
        return "Right";
      else if(position == "right")
        return "Left";
    })());
    tooltip.innerHTML = content;
    var marginT = tElement.getBoundingClientRect().top, marginL = tElement.getBoundingClientRect().left, margin = "";
    if(position == "top"){
      margin = "top: " + (function(){
        var v = (marginT - tElement.clientHeight - 6);
        if(v < 0)
          v = 0;
        return v;
      })() + "px; left: " + marginL + "px;";
    }else if(position == "bottom"){
      margin = "top: " + (function(){
        var v = (marginT + tElement.clientHeight + 9);
        if(v > window.innerHeight)
          v = window.iinnerHeight;
        return v;
      })() + "px; left: " + marginL + "px;";
    }else if(position == "left"){
      margin = "top: " + marginT + "px; left: " + (function(){
        var v = (marginL - tElement.clientWidth - 1);
        if(v < 0)
          v = 0;
        return v;
      })() + "px;";
    }else if(position == "right"){
      margin = "top: " + marginT + "px; left: " + (function(){
        var v = (marginL + tElement.clientWidth + 9);
        if(v > window.innerWidth)
          v = window.innerWidth;
        return v;
      })() + "px;";
    }
    tooltip.setAttribute("style", margin);
    return tooltip;
  };
  for(var i = 0; i < Elms.length; i++){
    const position = Elms[i].getAttribute("tooltip-position").toLocaleLowerCase();
    if(position === undefined)
      position = "top";
    Elms[i].currentTooltip = null;
    Elms[i].addEventListener("mouseover", function(){
      this.currentTooltip = createTooltip(this, position, this.getAttribute("tooltip-content"));
      document.body.appendChild(this.currentTooltip);
    });
    Elms[i].addEventListener("mouseout", function(){
      const cT = this.currentTooltip;
      cT.classList.remove("fadeInUp", "fadeInDown", "fadeInRight", "fadeInLeft");
      cT.classList.add("fadeOut");
      setTimeout(function(){
        cT.outerHTML = "";
      }, 100);
    });
  }
})();