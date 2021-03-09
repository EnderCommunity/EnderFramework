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

//this.app.commandLine.appendSwitch("--disable-renderer-backgrounding", 'true');

//this.app.commandLine.appendSwitch('disable-software-rasterizer', 'true'); //EXP
//this.app.commandLine.appendSwitch('enable-gpu-rasterization', 'true'); //EXP
//this.app.commandLine.appendSwitch('enable-zero-copy', 'true'); //EXP
//this.app.commandLine.appendSwitch('enable-native-gpu-memory-buffers', 'true'); //EXP

//this.app.commandLine.appendSwitch('enable-oop-rasterization', 'true'); //EXP
//this.app.commandLine.appendSwitch('enable-accelerated-2d-canvas', 'true'); //EXP

//this.app.commandLine.appendSwitch("enable-fast-unload", 'true'); //EXP
//this.app.commandLine.appendSwitch("low-priority-iframes", 'true'); //EXP
//this.app.commandLine.appendSwitch("enable-quic", 'true'); //EXP
//this.app.commandLine.appendSwitch("enable-heavy-ad-intervention", 'true'); //EXP
//this.app.commandLine.appendSwitch("enable-parallel-downloading", 'true'); //EXP

//this.app.commandLine.appendSwitch("smooth-scrolling", 'true'); //EXP

//this.app.commandLine.appendSwitch("proactive-tab-freeze-and-discard", 'true'); //EXP

//this.app.commandLine.appendSwitch("ignore-gpu-blacklist", 'true'); //EXP
//this.app.commandLine.appendSwitch("disable-hyperlink-auditing", 'true'); //EXP

//this.app.commandLine.appendSwitch("disable-touch-adjustment", 'true'); //EXP
//this.app.commandLine.appendSwitch("disable-background-video-track", 'true'); //EXP
//this.app.commandLine.appendSwitch("enable-modern-media-controls", 'true'); //EXP

//this.app.commandLine.appendSwitch("enable-tcp-fast-open", 'true'); //EXP

//this.app.commandLine.appendSwitch("--disable-frame-rate-limit", 'true'); //EXP
//this.app.commandLine.appendSwitch("--disable-gpu-vsync", 'true'); //EXP
//this.app.commandLine.appendSwitch("--max-gum-fps", '9999'); //EXP

module.exports = {
    mainProcess: {
        app: null,
        optimize(app, callback) {
            this.app = app;
            if (true) {
                this.bestPerformance();
            } else if (true) {
                this.performance();
            } else {
                this.battery();
            }

            this.shared();

            callback();
        },
        bestPerformance() {
            this.app.commandLine.appendSwitch("--disable-frame-rate-limit", 'true');
            this.app.commandLine.appendSwitch("--disable-gpu-vsync", 'true');
            this.app.commandLine.appendSwitch("--max-gum-fps", '9999');

            this.app.commandLine.appendSwitch("enable-tcp-fast-open", 'true');

            this.app.commandLine.appendSwitch("ignore-gpu-blacklist", 'true');
            this.app.commandLine.appendSwitch("disable-hyperlink-auditing", 'true');

            this.app.commandLine.appendSwitch("smooth-scrolling", 'true');

            this.app.commandLine.appendSwitch('enable-oop-rasterization', 'true');
            this.app.commandLine.appendSwitch('enable-accelerated-2d-canvas', 'true');
        },
        performance() {
            this.app.commandLine.appendSwitch("--disable-frame-rate-limit", 'true');
            this.app.commandLine.appendSwitch("--disable-gpu-vsync", 'true');
            this.app.commandLine.appendSwitch("--max-gum-fps", '90');

            this.app.commandLine.appendSwitch("enable-tcp-fast-open", 'true');

            this.app.commandLine.appendSwitch("smooth-scrolling", 'true');

            this.app.commandLine.appendSwitch("--disable-renderer-backgrounding", 'true');
        },
        battery() {
            this.app.commandLine.appendSwitch("--disable-frame-rate-limit", 'true');
            this.app.commandLine.appendSwitch("--disable-gpu-vsync", 'true');
            this.app.commandLine.appendSwitch("--max-gum-fps", '40');

            this.app.commandLine.appendSwitch("--disable-renderer-backgrounding", 'true');
        },
        shared() {
            this.app.commandLine.appendSwitch('disable-software-rasterizer', 'true');
            this.app.commandLine.appendSwitch('enable-gpu-rasterization', 'true');
            this.app.commandLine.appendSwitch('enable-zero-copy', 'true');
            this.app.commandLine.appendSwitch('enable-native-gpu-memory-buffers', 'true');

            this.app.commandLine.appendSwitch("proactive-tab-freeze-and-discard", 'true');

            this.app.commandLine.appendSwitch("disable-touch-adjustment", 'true');
            this.app.commandLine.appendSwitch("disable-background-video-track", 'true');
            this.app.commandLine.appendSwitch("enable-modern-media-controls", 'true');

            this.app.commandLine.appendSwitch("enable-fast-unload", 'true');
            this.app.commandLine.appendSwitch("low-priority-iframes", 'true');
            this.app.commandLine.appendSwitch("enable-quic", 'true');
            this.app.commandLine.appendSwitch("enable-heavy-ad-intervention", 'true');
            this.app.commandLine.appendSwitch("enable-parallel-downloading", 'true');
        }
    }
};