const newProjectLayout = document.getElementById("_newProjectLayout"), homePageElement = document.getElementById("_start"), templates = document.getElementsByClassName("template"), nextButton1 = document.getElementById("_newNextStep1"), firstScreen = document.getElementById("_projectType"), secondScreen = document.getElementById("_projectConfiguration"), projectType = document.getElementById("_currentPorjectType"), goBackToStep1 = document.getElementById("_goBack1"), createButton = document.getElementById("_createProject");
for(var i = 0; i < templates.length; i++){
  templates[i].addEventListener("click", function(){
    for(var i = 0; i < templates.length; i++){
      templates[i].removeAttribute("name");
    }
    this.setAttribute("name", "selectedTemplate");
    nextButton1.removeAttribute("disabled");
  });
}
createButton.addEventListener("click", function(){
  alert("No yet!", "EnderStudio still lacks the ability to create apps!");
});
goBackToStep1.addEventListener("click", function(){
  secondScreen.style.display = "none";
  firstScreen.style.display = "block";
});
nextButton1.addEventListener("click", function(){
  firstScreen.style.display = "none";
  secondScreen.style.display = "block";
  projectType.innerHTML = document.getElementsByName("selectedTemplate")[0].getAttribute("type");
});
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
      type: "primary",
      onclick: function(){
        newProjectLayout.style.display = "block";
        for(var i = 0; i < templates.length; i++){
          templates[i].removeAttribute("name");
        }
        nextButton1.setAttribute("disabled", "");
      }
    }],
    details: "Do you want something? You can request new features, visit https://github.com/EnderAdel/EnderFramework!"
  });
};