if (osInfo.isWindows) {
    //
} else if (osInfo.isLinux) {
    //
} else if (osInfo.isMacOS) {
    window_CloseButton.setAttribute("macOS", "");
    window_CloseButton.classList.remove("click", "click_");
    window_CloseButton.innerHTML = "";
    window_MaxButton.setAttribute("macOS", "");
    window_MaxButton.classList.remove("click");
    window_MaxButton.innerHTML = "";
    window_MinButton.setAttribute("macOS", "");
    window_MinButton.classList.remove("click");
    window_MinButton.innerHTML = "";
} else {
    //
}