const startProcess = (path) => {
  EnderFramework.menu.show();
  document.getElementById("_editorLayout").style.display = "block";
  document.getElementById("_Errors").innerHTML = "0";
  document.getElementById("_Warnings").innerHTML = "0";
  document.getElementById("_Position").innerHTML = "Ln -, Col -";
  document.getElementById("_Type").innerHTML = "-";
  startFileManager(path + "\\app");
  EnderFramework.topBar.setColor(null);
  loadAFile(path + "\\app\\content\\content\\_main.html", "HTML");
  /*fs.watch('somedir', function (event, filename){
    console.log('event is: ' + event);
    if (filename) {
        console.log('filename provided: ' + filename);
    } else {
        console.log('filename not provided');
    }
  });
  fs.watchFile();*/
};