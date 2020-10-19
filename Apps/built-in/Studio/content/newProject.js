const newProjectLayout = document.getElementById("_newProjectLayout"), homePageElement = document.getElementById("_start");
document.getElementById("_goBackHome").addEventListener("click", function(){
  newProjectLayout.style.display = "none";
  homePageElement.style.display = "block";
});
const openNewProjectUI = function(){
  EnderFramework.dialog.messageBox({
    title: "Nothing is stable!",
    message: "This Framework is still in the very early development stages.",
    buttons: [{
      text: "Ok",
      onclick: function(){
        newProjectLayout.style.display = "block";
      }
    }],
    details: "Do you want something? You can request new features, visit https://github.com/EnderAdel/EnderFramework!"
  });
};