function installTheModules(tPath, id, modules, _callback_ = function() {}, installationProgress, installationMessage, appPaths) {
    installationProgress.value = 0;
    installationMessage.innerHTML = "Checking the modules...";
    /*var fileContent = "cd " + appPaths[0] + "\n";
    for(var i = 1; i < appPaths.length; i++){
      fileContent += "mkdir " +appPaths[i] + "\n";
      fileContent += "cd ./" + appPaths[i] + "\n";
    }
    console.log(appPaths);
    console.log(fileContent);
    for(var i = 0; i < modules.length; i++){
      fileContent += "npm install " + modules[i] + "\n";
    }
    console.log(fileContent);*/
    /*installationProgress.value = 0.5;
    fs.writeFile(path + "\\executable.bat", fileContent, function(error){
      if(error){
        //
      }else{
        installationProgress.value = 1;
        callback();
      }
    });*/
    var modules = EnderFramework.parse(modules),
        newModules = [];
    for (var i = 0; i < modules.length; i++) {
        if (modules[i].action != null && modules[i].value != "") {
            newModules[newModules.length] = modules[i];
        }
    }
    modules = newModules;
    //console.log("modules: ");
    //console.log(modules);
    delete newModules;
    const https = require('https');
    var downloadLinks = [],
        Stop = false,
        Done_ = 0;
    const Done = () => {
        Done_++;
        installationProgress.value = Done_ / modules.length;
        //console.log(Done_);
        //console.log(modules.length);
        if (Done_ == modules.length) {
            //console.log(modules);
            //console.log(downloadLinks);
            if (Stop) {
                //if(true){
                //Stop the installation process
            } else {
                setTimeout(function() {
                    var length = id.replace(/[^.]/g, "").length,
                        newPath = path_.replace("built-in\\Installer\\", "") + "installed",
                        done = 0,
                        done_ = function() {
                            done++;
                            if (done == length) {
                                const waitForTheFolder = function(path_) {
                                    installationProgress.removeAttribute("value");
                                    installationMessage.innerHTML = "Preparing the modules directory...";
                                    const unzipper = require("unzipper");
                                    fs.createReadStream(__dirname + "\\node_modules.zip").pipe(unzipper.Extract({ path: path_ })).promise().then(function() {
                                        //(function(){
                                        //Done!
                                        installationMessage.innerHTML = "Downloading the modules...";
                                        var num = 0;
                                        (function() {
                                            num++;
                                            const rimraf = require("rimraf");
                                            var done = 0,
                                                _done = function() {
                                                    done++;
                                                    if (done == downloadLinks.length) {
                                                        installationProgress.value = 0;
                                                        installationMessage.innerHTML = "Installing the modules...";

                                                        function moveModuleFiles(fileName, callback = function() {}) {
                                                            var exPath = tPath + "\\executable_" + num + ".bat",
                                                                fileContent = "cd \"" + tPath + "\"\n";
                                                            num++;
                                                            //console.log(fileContent);
                                                            fileContent += "tar -xvzf " + fileName + ".tgz\n";
                                                            //console.log(fileContent);
                                                            fileContent += "Rename package \"" + fileName + "\"\n";
                                                            //console.log(fileContent);
                                                            fileContent += "move \"" + fileName + "\" \"" + newPath + "\\node_modules\\\"";
                                                            //console.log(fileContent);
                                                            fs.writeFile(exPath, fileContent, function(error) {
                                                                if (error) {
                                                                    //Error!
                                                                } else {
                                                                    //
                                                                    //var child_process = require('child_process');
                                                                    /*child_process.exec(tPath + "\\executable.bat", function(error, stdout, stderr) {
                                                                      if(error){
                                                                        //Error!
                                                                        console.log(error);
                                                                      }else{
                                                                        callback();
                                                                      }
                                                                      //console.log(stdout);
                                                                    });*/
                                                                    var spawn = require('child_process').spawn,
                                                                        ls = spawn('cmd.exe', ['/c', exPath]);
                                                                    /*ls.stdout.on('data', function (data) {
                                                                      console.log('stdout: ' + data);
                                                                    });
                                                                    ls.stderr.on('data', function (data) {
                                                                      console.log('stderr: ' + data);
                                                                    });*/
                                                                    ls.on('exit', function(code) {
                                                                        if (code === 0) {
                                                                            callback();
                                                                        } else {
                                                                            rimraf(newPath + "\\node_modules\\" + fileName + "\\", function() {
                                                                                ls = spawn('cmd.exe', ['/c', exPath]);
                                                                                ls.on('exit', function(code) {
                                                                                    if (code === 0) {
                                                                                        callback();
                                                                                    } else {
                                                                                        //Error!
                                                                                        //console.log(code);
                                                                                        installationMessage.innerHTML = "The installation process has failed!";
                                                                                    }
                                                                                });
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                        var loop = function(n_) {
                                                            if (n_ < downloadLinks.length) {
                                                                var i = n_;
                                                                n_++;
                                                                (function() {
                                                                    const n = i;
                                                                    downloadLinks[n].link;
                                                                    downloadLinks[n].name;
                                                                    //console.log(downloadLinks[n]);
                                                                    (function() {
                                                                        const done = function() {
                                                                            const tar = require("tar");
                                                                            //console.log(tPath + "\\" + downloadLinks[n].name + ".tgz");
                                                                            //console.log(newPath + "\\node_modules\\" + downloadLinks[n].name);
                                                                            moveModuleFiles(downloadLinks[n].name, function() {
                                                                                installationProgress.value = (n + 1) / downloadLinks.length;
                                                                                loop(n_);
                                                                                if (n + 1 == downloadLinks.length) {
                                                                                    //Done!
                                                                                    _callback_();
                                                                                }
                                                                            });
                                                                        };
                                                                        done();
                                                                    })();
                                                                })();
                                                            }
                                                        };
                                                        loop(0);
                                                        //
                                                    }
                                                };
                                            //const https = require('https');
                                            const download = require('download-file');
                                            var loop___ = function(i_) {
                                                const next = function() {
                                                        installationProgress.value = i_ / downloadLinks.length;
                                                        if (i_ + 1 < downloadLinks.length) {
                                                            loop___(i_ + 1);
                                                        }
                                                    }
                                                    //console.log(downloadLinks[i_]);
                                                download(downloadLinks[i_].link, {
                                                    directory: tPath + "\\",
                                                    filename: downloadLinks[i_].name + ".tgz"
                                                }, function(err) {
                                                    if (err) {
                                                        //Error!
                                                    } else {
                                                        next();
                                                        _done();
                                                    }
                                                });
                                            };
                                            loop___(0);
                                        })();
                                        //tPath;
                                    });
                                };
                                setTimeout(function() {
                                    fs.mkdir(newPath + "\\node_modules", function(err) {
                                        if (err) {
                                            if (fs.existsSync(newPath + "\\node_modules"))
                                                waitForTheFolder(newPath + "\\node_modules");
                                            else {
                                                //Error!
                                                console.log(err);
                                            }
                                        } else {
                                            waitForTheFolder(newPath + "\\node_modules");
                                        }
                                    });
                                }, 1000);
                            }
                        };
                    for (var i2 = 0; i2 <= length; i2++) {
                        newPath += "\\" + id.substring(0, (id.indexOf(".") > -1) ? id.indexOf(".") : id.length);
                        id = id.substring(id.indexOf(".") + 1);
                        (function() {
                            const path = newPath;
                            fs.mkdir(path, function(err) {
                                if (err) {
                                    if (fs.existsSync(path)) {
                                        done_();
                                    } else {
                                        //Failed!
                                    }
                                } else {
                                    done_();
                                }
                            });
                        })();
                    }
                }, 0);
            }
        }
    };
    //while(i < modules.length){
    var loop_ = function(i) {
        var next__ = function() {
            //console.log(modules.length);
            //console.log(i + 1);
            if (i + 1 < modules.length) {
                loop_(i + 1);
            }
        };
        //for(var i = 0; i < modules.length; i++){
        /*console.log("-");
        console.log("-----------------------------------");
        console.log("-----------------------------------");
        console.log(modules);
        console.log("-----------------------------------");
        console.log("-----------------------------------");
        console.log("-");
        console.log("-----------------------------------");
        console.log(modules.length);
        console.log(i);
        console.log("-----------------------------------");*/
        //console.log(modules[i]);
        //console.log(modules[i].action);
        //console.log(modules[i].value);
        //console.log(modules[i].attribute);
        //console.log(modules[i].comment);
        //https://registry.npmjs.org/unzip
        if (modules[i].action == "install") {
            /*const request = https.get("https://registry.npmjs.org/" + modules[i].value, function(response){
              console.log(response);
              console.log(request);
            });*/
            (function() {
                const n = i;
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var data = JSON.parse(this.responseText);
                        //console.log(data);
                        const praseVersion = function(version, versions = null) {
                            if (!modules[i].strict) {
                                //Fix this code!
                                console.log("Before: " + version);
                                //var l = version.replace(/[^\s]/g, '').length;
                                /*for(var _i = 0; _i < l; _i++){
                                  if(_i == 0)
                                    version = version.substring((version.indexOf(" ") > -1) ? version.indexOf(" ") + 1 : 0);
                                  else if(_i == 1)
                                    version = (version.indexOf(" ") > -1) ? version.substring(0, version.indexOf(" ")) : version;
                                }*/
                                const clear = function(v) {
                                    v = v.replace(/\s/g, "").replace(/=/g, "").replace(/>/g, "").replace(/</g, "").replace(/~/g, "");
                                    return v;
                                };
                                if (version.indexOf("=") > -1) {
                                    if (version.indexOf(">") > -1) {
                                        if (version.indexOf(">") < version.length / 2) {
                                            version = version.substring(version.indexOf(">"));
                                        } else {
                                            version = version.substring(0, version.indexOf(">"));
                                        }
                                    }
                                    if (version.indexOf("<") > -1) {
                                        if (version.indexOf("<") < version.length / 2) {
                                            version = version.substring(version.indexOf("<"));
                                        } else {
                                            version = version.substring(0, version.indexOf("<"));
                                        }
                                    }
                                    version = clear(version);
                                } else if (version.indexOf("~") > -1) {
                                    version = clear(version);
                                    if (versions != null) {
                                        for (var vName in versions) {
                                            if (vName < version) {
                                                version = vName;
                                            }
                                        }
                                    }
                                } else if (version.indexOf("x") > -1) {
                                    version = "null_0";
                                } else if (version.indexOf(">") > -1) {
                                    var other = "999999999999999999999999999";
                                    console.log(000000000000000);
                                    if (version.indexOf("<") > -1) {
                                        other = clear(version.substring(version.indexOf("<")));
                                        version = version.substring(0, version.indexOf("<"));
                                        console.log(000000000000001);
                                    }
                                    if (versions !== null) {
                                        var closest = clear(version),
                                            done = false;
                                        for (var vName in versions) {
                                            if (vName > closest && vName < other) {
                                                version = vName;
                                                done = true;
                                            }
                                        }
                                        if (!done) {
                                            version = "null_1";
                                        }
                                    } else {
                                        version = "null_2";
                                    }
                                }
                                /*if(versions !== null){
                                  //version = version.replace(/x/g, "").replace(/~/g, "").replace(/\^/g, "");
                                  var don_ = false, lName = null, skip = false;
                                  if((version.indexOf("~") > -1 || version.indexOf("^") > -1) && version.indexOf("x") == -1){
                                    skip = true;
                                    don_ = true;
                                    version = version.replace(/\^/g, "").replace(/~/g, "");
                                  }else{
                                    version = version.replace(/x/g, "");
                                  }
                                  //version;
                                  if(!skip)
                                    for(var vName in versions){
                                      //console.log(vName);
                                      if(vName.indexOf(version) > -1){
                                        don_ = true;
                                        version = vName;
                                      }
                                      lName = vName;
                                    }
                                  if(!don_){
                                    version = lName;
                                  }
                                }*/
                                //version = version.replace(/[^0-9.-betalph]/g, '');
                                //version = version.replace(/\^]/g, '');
                                console.log("After: " + version);
                            }
                            return version;
                        };
                        if (data.versions != undefined) {
                            var attribute_ = modules[n].attribute;
                            //console.log(data.versions);
                            //console.log(data.versions["0.1.11"]);
                            var downloadLink = null;
                            if (data["dist-tags"][attribute_] != undefined) {
                                downloadLink = data.versions[data["dist-tags"][attribute_]].dist.tarball;
                                if (!modules[i].strict) {
                                    var dependencies = data.versions[data["dist-tags"][attribute_]].dependencies;
                                    for (var iy in dependencies) {
                                        modules[modules.length] = {
                                            action: "install",
                                            value: iy,
                                            attribute: praseVersion(dependencies[iy]),
                                            comment: null
                                        };
                                        //console.log(modules);
                                    }
                                }
                            } else if (data.versions[attribute_] != undefined) {
                                downloadLink = data.versions[attribute_].dist.tarball;
                                if (!modules[i].strict) {
                                    var dependencies = data.versions[attribute_].dependencies;
                                    for (var iy in dependencies) {
                                        modules[modules.length] = {
                                            action: "install",
                                            value: iy,
                                            attribute: praseVersion(dependencies[iy], data.versions),
                                            comment: null
                                        };
                                        //console.log(modules);
                                    }
                                }
                            }
                            if (downloadLink == null) {
                                //
                                var first = true,
                                    n___;
                                for (var name in data.versions) {
                                    if (first) {
                                        first = false;
                                        downloadLink = data.versions[name].dist.tarball;
                                        n___ = name;
                                    }
                                }
                                if (!modules[i].strict) {
                                    var dependencies = data.versions[n___].dependencies;
                                    for (var iy in dependencies) {
                                        modules[modules.length] = {
                                            action: "install",
                                            value: iy,
                                            attribute: praseVersion(dependencies[iy], data.versions),
                                            comment: null
                                        };
                                        //console.log(modules);
                                    }
                                }
                            }
                            downloadLinks[downloadLinks.length] = { name: modules[n].value, link: downloadLink };
                        } else {
                            //This module doesn't exist;
                            Stop = true;
                        }
                        Done();
                        next__();
                    }
                };
                xhttp.onerror = function(error) {
                    //Error!
                    Done();
                    Stop = true;
                    next__();
                };
                xhttp.open("GET", "https://registry.npmjs.org/" + modules[i].value, true);
                xhttp.send();
            })();
        } else if (modules[i].action == "uninstall") {
            Done();
            next__();
        } else {
            Done();
            next__();
        }
    };
    loop_(0);
    //const file = fs.createWriteStream("file.jpg");
    //const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response){
    //  response.pipe(file);
    //});
}