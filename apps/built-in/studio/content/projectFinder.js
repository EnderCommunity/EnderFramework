const { pathToFileURL } = require('url');

/*startProcess(__dirname + "/projects/Test");*/
const COfProjects = document.getElementById("_projects"),
    { readdirSync } = require('fs'),
    path_ = require("path"),
    fs_ = require('fs');
const getDirectories = source => readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name),
    UpdateProjects = function() {
        var projects = getDirectories(path_.join(__dirname, "\\projects\\")),
            isThereAnyProjects = false;
        COfProjects.innerHTML = '<h5 class="loadingMessage">Loading...</h5>';
        for (var project in projects) {
            var projectDir = path_.join("projects\\", projects[project]);
            project = path_.join(__dirname, "\\projects\\", projects[project]);
            console.log(project);
            fs_.readFile(path_.join(project, "data.json"), 'utf8', function(error, data) {
                if (error) {
                    //Alert the user about this project!
                    EnderFramework.notification.snack(`We couldn't load the project in '${projectDir}'`);
                } else {
                    isThereAnyProjects = true;
                    var a = document.getElementsByClassName("loadingMessage")[0];
                    if (a != null) {
                        a.outerHTML = "";
                    }
                    var appInfo = JSON.parse(data),
                        projectC = document.createElement("div"),
                        projectImage = document.createElement("img"),
                        projectD = document.createElement("h5"),
                        projectTitle = document.createElement("h5"),
                        creationTime = document.createElement("text");
                    projectC.classList.add("project");
                    projectD.classList.add("dir");
                    projectTitle.classList.add("title");
                    projectD.innerHTML = projectDir;
                    projectTitle.innerHTML = appInfo.project_name;
                    creationTime.innerHTML = appInfo.creation_date;
                    projectC.appendChild(projectImage);
                    projectC.appendChild(projectTitle);
                    projectC.appendChild(projectD);
                    projectC.appendChild(creationTime);
                    projectC.projectPath = project;
                    projectC.addEventListener("click", function() {
                        startProcess(this.projectPath);
                    });
                    COfProjects.appendChild(projectC);
                }
            });
            //
        }
        if (!isThereAnyProjects) {
            COfProjects.innerHTML = "<h5>There is nothing in here!</h5>";
        }
        //
    };
UpdateProjects();