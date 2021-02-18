/*var CMU = process.memoryUsage().rss;
if (CMU > 6.4e+9) { //6400 MB (6.4 GB)
    //
} else if (CMU > 3.2e+9) { //3200 MB (3.2 GB)
    //
} else if (CMU > 1.6e+9) { //1600 MB (1.6 GB)
    //
} else if (CMU > 8e+8) { //800 MB (0.8 GB)
    //
} else if (CMU > 4e+8) { //400 MB (0.4 GB)
    //
} else if (CMU > 2e+8) { //200 MB (0.2 GB)
    //
} else if (CMU > 1e+8) { //100 MB (0.1 GB)
    //
} else {
    console.log("You're good to go!");
}*/
module.exports = {
    mainProcess: {
        optimize: function(app) {
            app.commandLine.appendSwitch("--disable-renderer-backgrounding", 'true');

            app.commandLine.appendSwitch('disable-software-rasterizer', 'true'); //EXP
            app.commandLine.appendSwitch('enable-gpu-rasterization', 'true'); //EXP
            app.commandLine.appendSwitch('enable-zero-copy', 'true'); //EXP
            app.commandLine.appendSwitch('enable-native-gpu-memory-buffers', 'true'); //EXP

            app.commandLine.appendSwitch('enable-oop-rasterization', 'true'); //EXP
            app.commandLine.appendSwitch('enable-accelerated-2d-canvas', 'true'); //EXP

            app.commandLine.appendSwitch("enable-fast-unload", 'true'); //EXP
            app.commandLine.appendSwitch("low-priority-iframes", 'true'); //EXP
            app.commandLine.appendSwitch("enable-quic", 'true'); //EXP
            app.commandLine.appendSwitch("enable-heavy-ad-intervention", 'true'); //EXP
            app.commandLine.appendSwitch("enable-parallel-downloading", 'true'); //EXP

            app.commandLine.appendSwitch("smooth-scrolling", 'true'); //EXP

            app.commandLine.appendSwitch("proactive-tab-freeze-and-discard", 'true'); //EXP

            app.commandLine.appendSwitch("ignore-gpu-blacklist", 'true'); //EXP
            app.commandLine.appendSwitch("disable-hyperlink-auditing", 'true'); //EXP

            app.commandLine.appendSwitch("disable-touch-adjustment", 'true'); //EXP
            app.commandLine.appendSwitch("disable-background-video-track", 'true'); //EXP
            app.commandLine.appendSwitch("enable-modern-media-controls", 'true'); //EXP

            app.commandLine.appendSwitch("enable-tcp-fast-open", 'true'); //EXP
        }
    }
};