const nodeNotifier = require('node-notifier'), notify = (title, message) => {
    nodeNotifier.notify({
        title: title,
        message: message,
        icon: "0",
        id: undefined,
        appID: "EnderServices"
    }, function (err, response) {
        throw Error(`Title: ${title}\nMessage: ${message}`);
    });
};
module.exports = {
    notify: (title, message) => {
        notify(title, message);
    }
};