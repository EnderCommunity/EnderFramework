_content.addEventListener('dom-ready', function (){
  try{
    //document.getElementById("_cover").style.display = "block";
    if(manifest.content.customStyle){
      _content.insertCSS(resources.css.main, {cssOrigin: 'author'});
      _content.insertCSS(resources.css.font, {cssOrigin: 'author'});
      _content.insertCSS(resources.css.icons, {cssOrigin: 'author'});
      _content.insertCSS(resources.css.animations, {cssOrigin: 'author'});
      if(manifest.menu.type == "top" || manifest.menu.type == "side"){
        _content.executeJavaScript(`{ENDERFRAMEWORK_ENVIRONMENT.isThereNoTop();}`);
      }
    }
    _content.executeJavaScript(`{${resources.js.modifications}}`);
    if(manifest.content.customElements){
      _content.executeJavaScript(`{${resources.js.customElements}}`);
    }
    //content.insertCSS(aniamtions);
    //
    //setTimeout(function(){
    _content.executeJavaScript(`{ENDERFRAMEWORK_ENVIRONMENT.tell.done();}`);
    //}, 200);
  }catch{
    notify("Something went wrong!");
    //showSrrorScreen();
  }
});