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
  var E_ = Error || "A critical error without alert text!", EA_ = navigator.userAgent, AV_ = appDFTIS[1];
  var HTTP = new XMLHttpRequest(), URL = connection_[0], Params = URL.substring(URL.indexOf("?") + 1);
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
    var HTTP = new XMLHttpRequest(), URL = connection_[1], Params = URL.substring(URL.indexOf("?") + 1);
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
    var HTTP = new XMLHttpRequest(), URL = connection_[1], Params = URL.substring(URL.indexOf("?") + 1);
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
}, showFeedbackScreen = function(){
  document.getElementById("_COfFeedback").style.display = "block";
  document.getElementById("_FeedbackUI").style.display = "block";
}, hideFeedbackScreen = function(){
  document.getElementById('_COfFeedback').style.display = 'none';
  document.getElementById('_FeedbackUI').style.display = 'none';
  document.getElementById('_feedbackTextarea').value = '';
}, showShareScreen = function(text){
  currentShareValue = text;
  document.getElementById("_COfShare").style.display = "block";
  document.getElementById("_shareUI").style.display = "block";
  document.getElementById('_shareContent').textContent = text;
}, hideShareScreen = function(){
  document.getElementById('_COfShare').style.display = 'none';
  document.getElementById('_shareUI').style.display = 'none';
  document.getElementById('_shareContent').textContent = "[the_content]";
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