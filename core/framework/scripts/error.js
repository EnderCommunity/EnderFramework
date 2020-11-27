window_ErrorScreen_ReloadButton.addEventListener("click", function () {
    _content.reload();
});
window_ErrorScreen_HomeButton.addEventListener("click", function () {
    _content.loadURL(path.join(manifest.paths.currentApp, "content", manifest.start));
});
if (manifest.content.redirectAnimations)
    window_ErrorScreen.classList.add("animated", "fadeInUp2", "fast-ish");