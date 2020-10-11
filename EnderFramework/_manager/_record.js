/*navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
  mediaRecorder = new mediaRecorder();
  mediaRecorder.start();
  //mediaRecorder.addEventListener("start", function(e){
    //
  //});
  mediaRecorder.addEventListener("stop", function(e){
    result.push(e.data);
  });
  mediaRecorder.addEventListener("dataavailable", function(e){
    var blob = new Blob(result);
    if(isText){
      //
    }else{
      callback(URL.createObjectURL(blob));
    }
  });
});*/