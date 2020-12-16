const AutoLaunch = require('auto-launch'),
    shortcutsCreator = require("./shortcut");
module.exports = {
    autoLaunch: function(name, shouldEnable, errorCallback) {
        var autoLauncher = new AutoLaunch({
            name: name
        });
        autoLauncher.isEnabled().then(function(isEnabled) {
            if (isEnabled) {
                if (!shouldEnable) {
                    autoLauncher.disable();
                }
            } else {
                if (shouldEnable) {
                    autoLauncher.enable();
                }
            }
        }).catch(function(error) {
            errorCallback(error);
        });
    },
    shortcuts: (mode) => {
        switch (mode) {
            case 'developer':
                shortcutsCreator.create({
                    name: "EnderStudio",
                    description: "",
                    icon: path.join(paths.apps, "built-in", "studio", "resources", "icons", "main.ico"),
                    arguments: "--studio",
                    outputDir: paths.currentUser.desktop
                });
            case 'normal':
                shortcutsCreator.create({
                    name: "EnderStore",
                    description: "",
                    icon: path.join(paths.apps, "built-in", "store", "resources", "icons", "main.ico"),
                    arguments: "--store",
                    outputDir: paths.currentUser.desktop
                });
                shortcutsCreator.create({
                    name: "EnderGaming",
                    description: "",
                    icon: path.join(paths.apps, "built-in", "gaming", "resources", "icons", "main.ico"),
                    arguments: "--gaming",
                    outputDir: paths.currentUser.desktop
                });
            case 'minimal':
                shortcutsCreator.create({
                    name: "EnderSettings",
                    description: "",
                    icon: path.join(paths.apps, "built-in", "settings", "resources", "icons", "main.ico"),
                    arguments: "--settings",
                    outputDir: paths.currentUser.desktop
                });
                shortcutsCreator.create({
                    name: "EnderInstaller",
                    description: "",
                    icon: path.join(paths.apps, "built-in", "installer", "resources", "icons", "main.ico"),
                    arguments: "--installer",
                    outputDir: paths.currentUser.desktop
                });
        }
    }
};