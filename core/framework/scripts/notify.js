const notify = function name(text) {
    window_Notification.removeAttribute("show");
    setTimeout(function () {
        window_Notification_Text.innerHTML = text;
        window_Notification.removeAttribute("style");
        if (window_Notification.offsetWidth + 36 > window.innerWidth)
            window_Notification.setAttribute("style", "margin: 0px 18px;");
        window_Notification.setAttribute("show", "");
    }, 10);
    if (currentCountdown_notify != null)
        clearTimeout(currentCountdown_notify);
    currentCountdown_notify = setTimeout(function () {
        window_Notification.removeAttribute("show");
    }, 5000);
}