const showCastScreen = function(text){
  currentShareValue = text;
  document.getElementById("_COfCast").style.display = "block";
  document.getElementById("_castUI").style.display = "block";
}, hideCastScreen = function(){
  document.getElementById('_COfCast').style.display = 'none';
  document.getElementById('_castUI').style.display = 'none';
}, ChromecastAPI = require('chromecast-api');
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