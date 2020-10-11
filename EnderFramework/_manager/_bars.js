"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addTheVerticalBar = (element) => {
  var mainC = document.createElement("div"), button_1 = document.createElement("div"), button_2 = document.createElement("div"), subMain = document.createElement("div"), bar = document.createElement("div");
  mainC.classList.add("EnderFramework---scrollBar--main");
  button_1.classList.add("EnderFramework---scrollBar--main-button1");
  button_2.classList.add("EnderFramework---scrollBar--main-button2");
  subMain.classList.add("EnderFramework---scrollBar--main-submain");
  bar.classList.add("EnderFramework---scrollBar--main-submainbar");
  element.appendChild(mainC);
  mainC.appendChild(button_1);
  mainC.appendChild(button_2);
  mainC.appendChild(subMain);
  bar.style.height = element.clientHeight/element.scrollHeight*100 + "%";
  //bar.setAttribute("style", element.clientHeight/element.scrollHeight + "%");
  subMain.appendChild(bar);
  //
  //mainC.classList.add("data");
  var d = (element == document.body) ? document.documentElement : element;
  bar.style.top = ((d.scrollTop)/(d.scrollHeight - d.clientHeight))*(subMain.clientHeight - bar.clientHeight) + "px";
  element.onscroll = function(e){
    bar.style.top = ((d.scrollTop)/(d.scrollHeight - d.clientHeight))*(subMain.clientHeight - bar.clientHeight) + "px";
    console.log(bar.style.top);
  };
  //
  var mousePosition, offset = [0,0], isDown = false;
  bar.addEventListener('mousedown', function(e){
    isDown = true;
    offset = [
      bar.offsetLeft - e.clientX,
      bar.offsetTop - e.clientY
    ];
  }, true);
  document.addEventListener('mouseup', function(){
    isDown = false;
  }, true);
  document.addEventListener('mousemove', function(event){
    event.preventDefault();
    if(isDown){
      /*mousePosition = {
        x : event.clientX,
        y : event.clientY
      };
      //bar.style.left = (mousePosition.x + offset[0]) + 'px';*/
      d.scrollTo(0, ((event.clientY + offset[1])*(d.scrollHeight - d.clientHeight))/(subMain.clientHeight - bar.clientHeight));
    }
  });
  const myObserver = new ResizeObserver(entries => {
    bar.style.height = d.clientHeight/d.scrollHeight*100 + "%";
  });
  myObserver.observe(d);
  //
}, addTheHorizontalBar = (element) => {
  //
}, parseScrollBarsData = (data) => {
  return {
    v: data.indexOf("vertical") > -1,
    h: data.indexOf("horizontal") > -1
  };
};
function ScrollBar(element, vertical, horizontal){
  this.element = element;
  this.vertical = vertical;
  this.horizontal = horizontal;
  if(vertical)
    addTheVerticalBar(element);
  if(horizontal)
    addTheHorizontalBar(element);
}
exports.page = function(){
  new ScrollBar(document.body, true, false);
}
/*var scroll = document.querySelectorAll("[scroll]");
for(var i = 0; i < scroll.length; i++){
  var v = parseScrollBarsData(scroll[i].getAttribute("scroll"));
  new ScrollBar(scroll[i], v.v, v.h);
}*/
