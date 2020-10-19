const openNewProjectUI = function(){
  document.getElementById("_newProjectLayout").style.display = "block";
  EnderFramework.dialog.messageBox({
    title: "Nothing is stable!",
    message: "This Framework is still in the eary development stages.",
    buttons: [{ text: "Ok" }],
    details: "Do you want something? You can request new features, visit https://github.com/EnderAdel/EnderFramework!"
  });
};