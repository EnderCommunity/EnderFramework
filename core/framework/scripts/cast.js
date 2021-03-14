const showCastScreen = function(text) {
        topBarBlur(false);
        currentShareValue = text;
        Cast_Container.style.display = "block";
        Cast_UI.style.display = "block";
    },
    hideCastScreen = function() {
        topBarBlur(true);
        Cast_Container.style.display = 'none';
        Cast_UI.style.display = 'none';
    };
/*const client = new ChromecastAPI();
client.on('device', function(device){
  console.log(client.devices);
  var mediaURL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';
  device.play(mediaURL, function(err){
    if(!err)
      console.log('Playing in your chromecast')
  })
  device.on('status', function(data){
    console.log(data);
  });
  global.cast = device;
});*/