const alertN = function(m){
  var notif = document.getElementById("_notification");
  notif.removeAttribute("show");
  setTimeout(function(){
    notif.getElementsByTagName("h4")[0].innerHTML = m;
    notif.removeAttribute("style");
    setTimeout(function(){
      if(notif.offsetWidth + 36 > window.innerWidth)
        notif.setAttribute("style", "margin: 0px 18px;");
      notif.setAttribute("show", "");
    }, 60);
  }, 100);
  if(global.currentCountdown_notify != null)
    clearTimeout(currentCountdown_notify);
  global.currentCountdown_notify = setTimeout(function(){
    notif.removeAttribute("show");
  }, 8000);
}, ReportError = function(Error){
  var E_ = Error || "A critical error without alert text!", EA_ = navigator.userAgent, AV_ = manifest.version;
  var HTTP = new XMLHttpRequest(), URL = manifest.server.bugTracking, Params = URL.substring(URL.indexOf("?") + 1);
  URL = URL.substring(0, URL.indexOf("?"));
  Params = Params.replace(/\[0\]/gi, EA_ + "");
  Params = Params.replace(/\[1\]/gi, AV_ + "");
  Params = Params.replace(/\[2\]/gi, E_ + "");
  HTTP.open("POST", URL, true);
  HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  HTTP.onreadystatechange = function () {
    if(HTTP.readyState === XMLHttpRequest.DONE){
      var s = HTTP.status;
      if(s === 0 || (s >= 200 && s < 400))
        alertN("The bug has been reported!");
      else
        alertN("A problem occurred while trying to connect to the server!");
    }
  };
  HTTP.send(Params);
}, SendFeedback = function(Feedback){
  if(Feedback != "" && Feedback !== null && Feedback !== undefined){
    var HTTP = new XMLHttpRequest(), URL = manifest.server.feedback, Params = URL.substring(URL.indexOf("?") + 1);
    URL = URL.substring(0, URL.indexOf("?"));
    Params = Params.replace(/\[0\]/gi, Feedback);
    HTTP.open("POST", URL, true);
    HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    HTTP.onreadystatechange = function (){
      if(HTTP.readyState === XMLHttpRequest.DONE){
        var s = HTTP.status;
        if(s === 0 || (s >= 200 && s < 400))
          alertN("The feedback has been sent!");
        else
          alertN("A problem occurred while trying to connect to the server!");
      }
    };
    HTTP.send(Params);
  }else{
    alertN("Your feedback is empty!");
  }
}, SendBugReport = function(Feedback){
  if(Feedback != "" && Feedback !== null && Feedback !== undefined){
    var HTTP = new XMLHttpRequest(), URL = manifest.server.bugReporting, Params = URL.substring(URL.indexOf("?") + 1);
    URL = URL.substring(0, URL.indexOf("?"));
    Params = Params.replace(/\[0\]/gi, Feedback);
    HTTP.open("POST", URL, true);
    HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    HTTP.onreadystatechange = function (){
      if(HTTP.readyState === XMLHttpRequest.DONE){
        var s = HTTP.status;
        if(s === 0 || (s >= 200 && s < 400))
          alertN("The bug report has been sent!");
        else
          alertN("A problem occurred while trying to connect to the server!");
      }
    };
    HTTP.send(Params);
  }else{
    alertN("Your report is empty!");
  }
};
const __reportErrorWindow = function(message, source, lineno, colno, error){
  ReportError("Message: " + message + "\nSource: " + source + "/\nLine Number: " + lineno + "\nColumn Number: " + colno + "\nType: window");
  console.log(0);
  //console.log("Error object:");
  //console.log(error);
}, __reportErrorProcess = function(message, source, lineno, colno, error){
  ReportError("Message: " + message + "\nSource: " + source + "/\nLine Number: " + lineno + "\nColumn Number: " + colno + "\nType: Process");
  console.log(1);
  //console.log("Error object:");
  //console.log(error);
}, __reportErrorAPI = function(message, source, lineno, colno, error){
  ReportError("Message: " + message + "\nSource: " + source + "/\nLine Number: " + lineno + "\nColumn Number: " + colno + "\nType: API");
  console.log(2);
  //console.log("Error object:");
  //console.log(error);
};
/*window.onerror = function(message, source, lineno, colno, error) {
  ReportError("Message: " + message + "\nSource: " + source + "/\nLine Number: " + lineno + "\nColumn Number: " + colno + "\nType: window");
  console.log("Error object:");
  console.log(error);
  //new Notification(error);
};
process.on('uncaughtException', function(message, source, lineno, colno, error){
  ReportError("Message: " + message + "\nSource: " + source + "/\nLine Number: " + lineno + "\nColumn Number: " + colno + "\nType: Process");
  console.log("Error object:");
  console.log(error);
});*/