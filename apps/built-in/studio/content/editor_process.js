global.projectFileName = null;
global.projectPath = null;
/*
EnderFramework.contextMenu.create([{
          type: "function",
          functionName: "something",
          title: "option 1"
        }, {
          type: "divider"
        }, {
          type: "link",
          link: "the/path/to/your/file",
          title: "option 3"
        }, {
          type: "link",
          link: "the/path/to/your/file",
          title: "option 3"
        }, {
          type: "link",
          link: "the/path/to/your/file",
          title: "option 3"
        }, {
          type: "link",
          link: "the/path/to/your/file",
          title: "option 3"
        }, {
          type: "link",
          link: "the/path/to/your/file",
          title: "option 3"
        }, {
          type: "link",
          link: "the/path/to/your/file",
          title: "option 3"
        }, {
          type: "action",
          actionName: "[copy/paste/cut/delete]",
          title: "option 4"
        }, {
          type: "link",
          link: "the/path/to/your/file",
          disabled: true,
          title: "option 4"
        }, {
          type: "divider"
        }, {
          type: "dropdown",
          content: [
            {
              type: "link",
              link: "the/path/to/your/file",
              disabled: true,
              title: "option 4"
            }, {
              type: "dropdown",
              content: [{
                type: "link",
                link: "the/path/to/your/file",
                disabled: true,
                title: "option 4"
              },{
                type: "link",
                link: "the/path/to/your/file",
                disabled: true,
                title: "option 4"
              }],
              title: "An option"
            }, {
              type: "function",
              functionName: "something",
              title: "option 1"
            }
          ],
          title: "option 5"
        }], function(error, menu){
  console.log(error);
  console.log(menu.attachTo(document.documentElement, true));
});
*/
const startProcess = (path) => {
    projectPath = path;
    projectFileName = path.substring((__dirname + "\\projects\\").length);
    EnderFramework.window.menu.show();
    document.getElementById("_editorLayout").style.display = "block";
    document.getElementById("_Errors").innerHTML = "0";
    document.getElementById("_Warnings").innerHTML = "0";
    document.getElementById("_Position").innerHTML = "Ln -, Col -";
    document.getElementById("_Type").innerHTML = "-";
    startFileManager(path + "\\app", function(elements) {
        for (var element in elements) {
            if (element == "fF") {
                (function() {
                    const _element = elements[element];
                    setTimeout(function() {
                        _element.getElementsByTagName("text")[0].click();
                    }, 300);
                })();
            }
            if (element == "sF") {
                (function() {
                    const _element = elements[element];
                    setTimeout(function() {
                        _element.getElementsByTagName("text")[0].click();
                    }, 600);
                })();
            }
            if (element == "f") {
                (function() {
                    const _element = elements[element];
                    setTimeout(function() {
                        _element.click();
                    }, 900);
                })();
            }
        }
    });
    EnderFramework.window.topBar.setColor(null);
};