_content.addEventListener('dom-ready', function() {
    try {
        if (manifest.content.customStyle && (firstLoad || loadAfterError) && !isThereError) {
            _content.insertCSS(resources.css.main, { cssOrigin: 'author' });
            _content.insertCSS(resources.css.font, { cssOrigin: 'author' });
            _content.insertCSS(resources.css.icons, { cssOrigin: 'author' });
            _content.insertCSS(resources.css.animations, { cssOrigin: 'author' });
            /*if (manifest.menu.type == "top" || manifest.menu.type == "side") {
                _content.executeJavaScript(`{ENDERFRAMEWORK_ENVIRONMENT.isThereNoTop();}`);
            }*/
        }
        _content.executeJavaScript(`{ENDERFRAMEWORK_ENVIRONMENT.tell.done();}`);
    } catch {
        notify("Something went wrong!");
        //showSrrorScreen();
    }
});