var filesToLoad__ = null;
var tLotF = setInterval(function(){
  if(filesToLoad != null){
    clearInterval(tLotF);
    filesToLoad__ = [];
    const filesToLoad_ = filesToLoad.split("\n");
    for(var i = 0; i < filesToLoad_.length; i++){
      console.log(filesToLoad_[i]);
      if(filesToLoad_[i].replace(" ", "") != "" && filesToLoad_[i] != undefined && filesToLoad_[i].substring(0, 2) != "##"){
        fs.readFile(path.join(startPath_, "\\_content" + filesToLoad_[i]), 'utf-8', (err, data) => {
          if(err){
            console.error(err.message);
          }else{
            filesToLoad__[filesToLoad.length] = data;
          }
        });
      }
    }
    console.log(filesToLoad__);
  }
}, 100);


var links = document.getElementsByClassName("_themeSrc");
for(var i = 0; i < links.length; i++)
  links[i].setAttribute("href", links[i].getAttribute("src").replace("_default", theme_));