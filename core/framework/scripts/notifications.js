const nodeNotifier = require('node-notifier'), notify_1 = (title, message, icon = undefined, onclick_callback) => {
    if (icon != undefined)
        icon = path.join(manifest.paths.currentApp, "resources\\", icon);
    else
        icon = path.join(manifest.paths.core, "resources", "notification.png");
    nodeNotifier.notify({
        title: title,
        message: message,
        icon: icon,
        id: undefined,
        appID: manifest.name
    }, function (err, response) {
        onclick_callback(err, (response != undefined) ? response : "click");
    });
};