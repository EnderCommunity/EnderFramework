const { powerMonitor } = require("electron");
exports.start = () => {
  //
  powerMonitor.on('suspend', function(){//macOS & Windows
    //
    console.log(0);
  }).on('resume', function(){//macOS & Windows
    //
    console.log(1);
  }).on('on-ac', function(){//macOS & Windows
    //
    console.log(2);
    //charging/pluged-in
  }).on('on-battery', function(){//macOS & Windows
    //
    console.log(3);
    //Not charging
  }).on('shutdown', function(){//Linux & macOS
    //
    console.log(4);
    process.kill(0);//This is a bad idea!
  }).on('lock-screen', function(){//macOS & Windows
    //
    console.log(5);
    //Locked
  }).on('unlock-screen', function(){//macOS & Windows
    //
    //Unlocked
    console.log(6);
  });
  //
};