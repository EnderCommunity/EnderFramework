/*if(process.platform == "win32"){
  //
}*/
var currentShareValue = null,
    showShareScreen = function(text) {
        topBarBlur(false);
        currentShareValue = text;
        document.getElementById("_COfShare").style.display = "block";
        document.getElementById("_shareUI").style.display = "block";
        document.getElementById('_shareContent').textContent = text;
    },
    hideShareScreen = function() {
        topBarBlur(true);
        document.getElementById('_COfShare').style.display = 'none';
        document.getElementById('_shareUI').style.display = 'none';
        document.getElementById('_shareContent').textContent = "[the_content]";
    };
document.getElementById("_twitterShareButton").addEventListener("click", function() {
    openInBrowser("https://twitter.com/intent/tweet?text=" + encodeURI(currentShareValue));
});
document.getElementById("_shareViaEmail").addEventListener("click", function() {
    openInBrowser("mailto:?body=" + encodeURI(currentShareValue));
});
document.getElementById("_redditShareButton").addEventListener("click", function() {
    openInBrowser("https://reddit.com/submit?text=" + encodeURI(currentShareValue));
});
/*const fetchApps = require("fetch-installed-software");
fetchApps.getAllInstalledSoftware().then(function(apps){
  console.log(apps);
  for(var i = 0; i < apps.length; i++){
    try{
      if(apps[i].DisplayName.toLowerCase() == "twitter" || apps[i].DisplayName.toLowerCase() == "spotify"){
        console.log(apps[i]);
      }else{
        console.log(i);
      }
    }catch{
      //
    }
  }
}).catch(function(error){
  console.log(error);
});*/