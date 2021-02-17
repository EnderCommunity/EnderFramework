const osInfo = {
    platform: os.platform(),
    isWindows10: os.platform() == "win32" && os.release() > "10",
    isWindows8: os.platform() == "win32" && os.release() > "8",
    isWindows7: os.platform() == "win32" && os.release() > "7",
    isWindows: os.platform() == "win32",
    isMacOS: os.platform() == "darwin",
    isLinux: os.platform() == "linux",
    nodeModule: os
        /*'aix', 'freebsd', 'openbsd', 'sunos'*/
};