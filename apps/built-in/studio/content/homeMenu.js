/*startProcess(__dirname + "/projects/Test");*/
/*
<div class="project">
  <img>
  <h5 class="title">[title]</h5>
  <h5 class="dir">[dir]</h5>
  <text>MM/DD/YYYY HH:MM TT</text>
</div>
*/
document.getElementById("_openAFolder").addEventListener("click", function() {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(function(result) {
        //Add a way to check if the project folder is valid!
        try {
            if (fs.existsSync(path_.join(result.filePaths[0], "data.json")) && fs.existsSync(path_.join(result.filePaths[0], "app\\"))) {
                //file exists
                startProcess(result.filePaths[0]);
            } else {
                alert("Invalid project!", "This project might be corrupted or old.");
            }
        } catch (err) {
            //console.error(err)
        }
    });
});
document.getElementById("_newProject").addEventListener("click", function() {
    openNewProjectUI();
});