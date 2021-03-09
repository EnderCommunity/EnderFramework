var os = require('os');
module.exports = {
    platform: os.platform(),
    isWindows10: os.platform() == "win32" && os.release() > "10",
    isWindows8: os.platform() == "win32" && os.release() > "8",
    isWindows7: os.platform() == "win32" && os.release() > "7",
    isWindows: os.platform() == "win32",
    isMacOS: os.platform() == "darwin",
    isLinux: os.platform() == "linux",
    nodeModule: os,
    getNameCode() {
        if (this.isWindows10)
            return "win10";
        else if (this.isWindows8)
            return "win8";
        else if (this.isWindows7)
            return "win7";
        else if (this.isWindows)
            return "win";
        else if (this.isMacOS)
            return "mac";
        else if (this.isLinux)
            return "linux";
        else
            return "undefi";
    }
    /*'aix', 'freebsd', 'openbsd', 'sunos'*/
};