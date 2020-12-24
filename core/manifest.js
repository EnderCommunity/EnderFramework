module.exports = function(data) {
    if (data.name == undefined || data.start == undefined || data.version == undefined) {
        return false;
    }
    if (data.publisher == undefined) {
        data.publisher = "Unknown";
    }
    if (data.splashScreen == undefined) {
        data.splashScreen = true;
    }
    if (data.splashCooldown == undefined) {
        data.splashCooldown = 0;
    }
    if (data.splashText == undefined) {
        data.splashText = "";
    }
    if (data.server == undefined) {
        server = false;
    } else {
        if (data.server.feedback == undefined || data.server.bugTracking == undefined || data.server.bugReporting == undefined) {
            return false;
        }
    }
    if (data.window == undefined) {
        data.window = {};
    }
    if (data.window.type == undefined) {
        data.window.type = "normal";
    }
    if (data.window.width == undefined) {
        data.window.width = 940;
    }
    if (data.window.height == undefined) {
        data.window.height = 560;
    }
    if (data.window.minWidth == undefined) {
        data.window.minWidth = 940;
    }
    if (data.window.minHeight == undefined) {
        data.window.minHeight = 560;
    }
    if (data.window.maxWidth == undefined) {
        data.window.maxWidth = null;
    }
    if (data.window.maxHeight == undefined) {
        data.window.maxHeight = null;
    }
    if (data.window.isFullscreenable == undefined) {
        data.window.isFullscreenable = true;
    }
    if (data.window.isClosable == undefined) {
        data.window.isClosable = true;
    }
    if (data.window.isMinimizable == undefined) {
        data.window.isMinimizable = true;
    }
    if (data.window.isMaximizable == undefined) {
        data.window.isMaximizable = true;
    }
    if (data.window.maximizeOnStart == undefined) {
        data.window.maximizeOnStart = true;
    }
    if (data.window.resizable == undefined) {
        data.window.resizable = true;
    }
    if (data.content == undefined) {
        data.content = {};
    }
    if (data.content.theme == undefined) {
        data.content.theme = "default";
    }
    if (data.content.colorScheme == undefined) {
        data.content.colorScheme = "system";
    }
    if (data.content.redirectAnimations == undefined) {
        data.content.redirectAnimations = true;
    }
    if (data.content.contextMenu == undefined) {
        data.content.contextMenu = true;
    }
    if (data.content.infoScreen == undefined) {
        data.content.infoScreen = true;
    }
    if (data.content.coverOnMaximize == undefined) {
        data.content.coverOnMaximize = false;
    }
    if (data.content.customStyle == undefined) {
        data.content.customStyle = true;
    }
    if (data.content.protocol == undefined) {
        data.content.protocol = null;
    }
    if (data.hardware == undefined) {
        data.hardware = {};
    }
    if (data.hardware.highGPUPerformance == undefined) {
        data.hardware.highGPUPerformance = true;
    }
    if (data.enable == undefined) {
        data.enable = ["JavaScript", "WebGL", "spellcheck"];
    }
    if (typeof data.enable == "object") {
        var t = data.enable,
            shared = function(d) {
                if (d.JavaScript == undefined) {
                    d.JavaScript = false;
                }
                if (d.WebGL == undefined) {
                    d.WebGL = false;
                }
                if (d.devTools == undefined) {
                    d.devTools = false;
                }
                if (d.spellcheck == undefined) {
                    d.spellcheck = false;
                }
                return d;
            };
        data.enable = {};
        try {
            t.forEach(v => {
                data.enable[v] = true
            });
        } catch {
            data.enable = t;
        }
        delete t;
        data.enable = shared(data.enable);
    } else {
        return false;
    }
    if (data.menu == undefined) {
        data.menu = {};
    }
    if (data.menu.type == undefined) {
        data.menu.type = "none";
    }
    if (data.menu.withAccount == undefined) {
        data.menu.withAccount = false;
    }
    if (data.menu.type != "none" && data.menu.options == undefined) {
        return false;
    }
    return data;
};