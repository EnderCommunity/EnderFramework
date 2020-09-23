const nodeNotifier = require('node-notifier'), notify_1 = (title, message, icon = undefined, onclick_callback) => {
  if(icon != undefined)
    icon = path.join(appPath, "resources\\" , icon);
  else
    icon = path.join(startPath_, "Resources\\t_noti.png");
  nodeNotifier.notify({
    title: title,
    message: message,
    icon: icon,
    id: undefined,
    appID: appDFTIS[0]
  }, function(err, response){
    onclick_callback(err, (response != undefined) ? response : "click");
  });
};