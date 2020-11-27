const __os = require('os');
module.exports = {
    platform: __os.platform(),
    isWindows10: __os.platform() == "win32" && __os.release() > "10",
    isWindows8: __os.platform() == "win32" && __os.release() > "8",
    isWindows7: __os.platform() == "win32" && __os.release() > "7",
    isWindows: __os.platform() == "win32",
    isMacOS: __os.platform() == "darwin",
    isLinux: __os.platform() == "linux",
    nodeModule: __os
    /*'aix', 'freebsd', 'openbsd', 'sunos'*/
};