var Window_TopBar = document.getElementById("_topBar"),
    window_FullscreenButton = document.getElementById("_exitFullscreen"),
    window_CloseButton = document.getElementById("_closeWin"),
    window_MinButton = document.getElementById("_minWin"),
    window_MaxButton = document.getElementById("_maxWin"),
    Window_TransitionCover = document.getElementById("_transitionCover"),
    window_SplashScreen = document.getElementById("_splash"),
    window_Icon = document.getElementById("_icon"),
    window_Cover = document.getElementById("_cover"),
    window_LongCover = document.getElementById("_longLoading"),
    window_ErrorScreen = document.getElementById("_ErrorScreen"),
    window_Notification = document.getElementById("_notification"),
    window_Notification_Text = window_Notification.getElementsByTagName("h4")[0],
    window_CrashScreen = document.getElementById("_CrashScreen"),
    window_CrashScreen_CloseButton = document.getElementById("_crashCloseButton"),
    window_CrashScreen_RestartButton = document.getElementById("_crashRestartButton"),
    window_infoScreen = document.getElementById("_infoScreen"),
    topBar_Icon = document.getElementById("_icon"),
    window_ErrorScreen_ReloadButton = document.getElementById("_errorScreenReloadButton"),
    window_ErrorScreen_HomeButton = document.getElementById("_errorScreenHomeButton"),
    Cast_Container = document.getElementById("_COfCast"),
    Cast_UI = document.getElementById("_castUI").style.display = "block",
    HideInFullscreen = document.querySelectorAll("[hideInFullscreen]"),
    window_FullscreenButton = document.getElementById("_exitFullscreen");
;
document.hideSplashScreen = function () {
    if (manifest.window.type != "acrylic") {
        window_SplashScreen.style.opacity = "0";
        window_SplashScreen.style.pointerEvents = "none";
        setTimeout(function () {
            window_SplashScreen.style.display = "none";
            window_SplashScreen.style.opacity = "1";
        }, 200);
        window_Icon.style.display = "inline-block"
    } else {
        window_SplashScreen.style.display = "none";
        //
    }
};
document.showSplashScreen = function () {
    window_SplashScreen.style.pointerEvents = "all";
    window_SplashScreen.style.display = "block";
    window_Icon.style.display = "none"
};
window.cover = document.getElementById("_transitionCover");
window.cover.show = function () {
    this.setAttribute("show", "");
};
window.cover.hide = function () {
    this.removeAttribute("show");
};
window.cover.isHidden = function () {
    return !(this.hasAttribute("show"));
};
_content = document.getElementById("_contentView");