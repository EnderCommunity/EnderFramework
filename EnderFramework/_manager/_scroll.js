(function(){
  var Elements = document.querySelectorAll("[scroll-animation]"), aF = function(){
    for(var i = 0; i < Elements.length; i++)
      if(Elements[i].offsetTop < window.scrollY + window.outerHeight - Elements[i].clientHeight*1.36 && !Elements[i].animated){
        Elements[i].animated = true;
        Elements[i].removeAttribute("hidden-keep");
        Elements[i].style.animationDelay = Elements[i].aDelay;
        Elements[i].style.animationDuration = Elements[i].aDuration;
        Elements[i].classList.add("animated", Elements[i].aName);
        tAE++;
        if(tAE == Elements.length)
          window.removeEventListener('scroll', aF);
      }
  }, tAE = 0;
  for(var i = 0; i < Elements.length; i++){
    Elements[i].setAttribute("hidden-keep", "");
    Elements[i].aDelay = "0s";
    Elements[i].aDuration = ".2s";
    if(Elements[i].getAttribute("scroll-animation-delay") !== undefined)
      Elements[i].aDelay = Elements[i].getAttribute("scroll-animation-delay");
    else
      Elements[i].aDelay = "0.2s";
    if(Elements[i].getAttribute("scroll-animation-duration") !== undefined)
      Elements[i].aDuration = Elements[i].getAttribute("scroll-animation-duration");
    else
      Elements[i].aDuration = "0.4s";
    if(Elements[i].getAttribute("scroll-animation-name") !== undefined)
      Elements[i].aName = Elements[i].getAttribute("scroll-animation-name");
    else
      console.error("You must set the attribute 'scroll-animation-name' and give it a value.");
  }
  var timer = setInterval(function(){
    if(document.readyState === "complete"){
      clearInterval(timer);
      aF();
      window.addEventListener('scroll', aF);
    }
  }, 600);
})();