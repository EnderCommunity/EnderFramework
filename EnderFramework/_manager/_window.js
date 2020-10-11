document.addEventListener("DOMContentLoaded", function(event){
  (function(){
    const remote = electron.remote;
    var window = remote.getCurrentWindow();
    var blurs = document.querySelectorAll("[blur]");
    window.on('blur', function(){
      for(var i = 0; i < blurs.length; i++)
        blurs[i].setAttribute("uf", "");
    });
    window.on('focus', function(){
      for(var i = 0; i < blurs.length; i++)
        blurs[i].removeAttribute("uf");
    });
    window.on('session-end', function(){
      alert("action!");
    });
  })();
});