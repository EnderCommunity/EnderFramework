(function(){
  Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
  });
  const video = document.querySelectorAll("video[controls]"), audio = document.querySelectorAll("audio[controls]");
  for(var i = 0; i < 1; i++){
    video[i].removeAttribute("controls");
    const cV = video[i], controls = document.createElement("div"), c = document.createElement("div"), playButton = document.createElement("icon"), volumeButton = document.createElement("icon"), bar = document.createElement("progress"), fullscreenButton = document.createElement("icon"), PiPButton = document.createElement("icon"), timer = document.createElement("text");
    var track;
    timer.innerHTML = "0:00/0:00";
    controls.classList.add("bar");
    c.classList.add("videoParent");
    playButton.classList.add("PAP");
    if(cV.hasAttribute("autoplay")){
      playButton.innerHTML = "pause";
      track = setInterval(function(){
        var v = cV.currentTime/cV.duration;
        if(v == 1){
          cV.pause();
          playButton.innerHTML = "play_arrow";
        }
        bar.setAttribute("value", v);
        timer.innerHTML = (function(){
          var t1 = cV.currentTime/60, t2 = cV.duration/60;
          t1 = Math.trunc(t1) + ":" + (function(){
            var v = Math.round((t1 - Math.trunc(t1))*60);
            return ((v + "").length == 1) ? "0" + v : v;
          })();
          t2 = Math.trunc(t2) + ":" + (function(){
            var v = Math.round((t2 - Math.trunc(t2))*60);
            return ((v + "").length == 1) ? "0" + v : v;
          })();
          return t1 + "/" + t2;
        })();
      }, 50);
    }else{
      playButton.innerHTML = "play_arrow";
    }
    volumeButton.classList.add("V");
    if(cV.volume > 0.5){
      volumeButton.innerHTML = "volume_up";
    }else if(cV.volume < 0.5 && cV.volume != 0){
      volumeButton.innerHTML = "volume_down";
    }else{
      volumeButton.innerHTML = "volume_mute";
    }
    document.body.insertBefore(c, cV);
    fullscreenButton.innerHTML = "fullscreen";
    fullscreenButton.classList.add("FS");
    PiPButton.classList.add("PIP");
    PiPButton.innerHTML = "picture_in_picture_alt";
    PiPButton.addEventListener("click", function(){
      cV.requestPictureInPicture();
      sTrack = setInterval(function(){
        var v = cV.currentTime/cV.duration;
        if(v == 1){
          cV.pause();
          playButton.innerHTML = "play_arrow";
        }
        bar.setAttribute("value", v);
        if(cV.playing)
          playButton.innerHTML = "pause";
        else
          playButton.innerHTML = "play_arrow";
        timer.innerHTML = (function(){
          var t1 = cV.currentTime/60, t2 = cV.duration/60;
          t1 = Math.trunc(t1) + ":" + (function(){
            var v = Math.round((t1 - Math.trunc(t1))*60);
            return ((v + "").length == 1) ? "0" + v : v;
          })();
          t2 = Math.trunc(t2) + ":" + (function(){
            var v = Math.round((t2 - Math.trunc(t2))*60);
            return ((v + "").length == 1) ? "0" + v : v;
          })();
          return t1 + "/" + t2;
        })();
      }, 50);
    });
    cV.addEventListener('enterpictureinpicture', (event)=> {
      controls.style.display = "none";
      bar.style.display = "none";
    });
    cV.addEventListener('leavepictureinpicture', (event) => {
      controls.style.display = "block";
      bar.style.display = "block";
      cV.pause();
      var v = cV.currentTime/cV.duration;
      if(v == 1)
        playButton.innerHTML = "play_arrow";
      bar.setAttribute("value", v);
      if(cV.playing)
        playButton.innerHTML = "pause";
      else
        playButton.innerHTML = "play_arrow";
    });
    c.appendChild(cV);
    c.appendChild(controls);
    c.appendChild(bar);
    controls.appendChild(playButton);
    controls.appendChild(volumeButton);
    controls.appendChild(fullscreenButton);
    controls.appendChild(PiPButton);
    controls.appendChild(timer);
    var sTrack;
    fullscreenButton.addEventListener("click", function(){
      cV.requestFullscreen();
      try{
        clearInterval(sTrack);
      }catch{ }
      sTrack = setInterval(function(){
        var v = cV.currentTime/cV.duration;
        if(v == 1){
          cV.pause();
          playButton.innerHTML = "play_arrow";
        }
        bar.setAttribute("value", v);
        if(cV.playing)
          playButton.innerHTML = "pause";
        else
          playButton.innerHTML = "play_arrow";
        timer.innerHTML = (function(){
          var t1 = cV.currentTime/60, t2 = cV.duration/60;
          t1 = Math.trunc(t1) + ":" + (function(){
            var v = Math.round((t1 - Math.trunc(t1))*60);
            return ((v + "").length == 1) ? "0" + v : v;
          })();
          t2 = Math.trunc(t2) + ":" + (function(){
            var v = Math.round((t2 - Math.trunc(t2))*60);
            return ((v + "").length == 1) ? "0" + v : v;
          })();
          return t1 + "/" + t2;
        })();
      }, 50);
    })
    cV.addEventListener("mouseup", function(){
      clearInterval(sTrack);
      if(cV.playing){
        cV.pause();
        playButton.innerHTML = "play_arrow";
        clearInterval(track);
      }else{
        cV.play();
        playButton.innerHTML = "pause";
        track = setInterval(function(){
          var v = cV.currentTime/cV.duration;
          if(v == 1){
            cV.pause();
            playButton.innerHTML = "play_arrow";
          }
          bar.setAttribute("value", v);
          timer.innerHTML = (function(){
            var t1 = cV.currentTime/60, t2 = cV.duration/60;
            t1 = Math.trunc(t1) + ":" + (function(){
              var v = Math.round((t1 - Math.trunc(t1))*60);
              return ((v + "").length == 1) ? "0" + v : v;
            })();
            t2 = Math.trunc(t2) + ":" + (function(){
              var v = Math.round((t2 - Math.trunc(t2))*60);
              return ((v + "").length == 1) ? "0" + v : v;
            })();
            return t1 + "/" + t2;
          })();
        }, 50);
      }
    });
    playButton.addEventListener("click", function(){
      if(cV.playing){
        cV.pause();
        playButton.innerHTML = "play_arrow";
        clearInterval(track);
      }else{
        cV.play();
        playButton.innerHTML = "pause";
        track = setInterval(function(){
          var v = cV.currentTime/cV.duration;
          if(v == 1){
            cV.pause();
            playButton.innerHTML = "play_arrow";
          }
          bar.setAttribute("value", v);
          timer.innerHTML = (function(){
            var t1 = cV.currentTime/60, t2 = cV.duration/60;
            t1 = Math.trunc(t1) + ":" + (function(){
              var v = Math.round((t1 - Math.trunc(t1))*60);
              return ((v + "").length == 1) ? "0" + v : v;
            })();
            t2 = Math.trunc(t2) + ":" + (function(){
              var v = Math.round((t2 - Math.trunc(t2))*60);
              return ((v + "").length == 1) ? "0" + v : v;
            })();
            return t1 + "/" + t2;
          })();
        }, 50);
      }
    });
    var f = function(e){
      cV.currentTime = ((e.clientX - 200)/bar.clientWidth)*cV.duration;
      bar.setAttribute("value", (e.clientX - 200)/bar.clientWidth);
    };
    bar.addEventListener("mousedown", function(){
      bar.addEventListener("mousemove", f);
    });
    bar.addEventListener("mouseup", function(){
      bar.removeEventListener("mousemove", f);
    });
    bar.addEventListener("mouseout", function(){
      bar.removeEventListener("mousemove", f);
    });
    bar.addEventListener("click", function(e){
      cV.currentTime = ((e.clientX - 200)/bar.clientWidth)*cV.duration;
      bar.setAttribute("value", (e.clientX - 200)/bar.clientWidth);
      //width: calc(100% - 120px);
      //right: 24px;
    });
    volumeButton.addEventListener("click", function(){
      if(cV.volume == 1){
        cV.volume = 0;
        volumeButton.innerHTML = "volume_mute";
      }else if(cV.volume == 0.5){
        cV.volume = 1;
        volumeButton.innerHTML = "volume_up";
      }else{
        cV.volume = 0.5;
        volumeButton.innerHTML = "volume_down";
      }
    });
    bar.setAttribute("value", "");
  }
  for(var i = 1; i < video.length; i++){
    video[i].removeAttribute("controls");
  }
  for(var i = 0; i < 1; i++){
    audio[i].removeAttribute("controls");
    //Start by creating the new audio element UI
    const cA = audio[i], c = document.createElement("div"), playButton = document.createElement("icon"), title = document.createElement("text"), bar = document.createElement("progress"), timer = document.createElement("h4");
    c.classList.add("audioPlayer");
    timer.innerHTML = "00:00/00:00";
    if(cA.hasAttribute("autoplay")){
      playButton.innerHTML = "pause";
    }else{
      playButton.innerHTML = "play_arrow";
    }
    title.innerHTML = cA.getAttribute("title");
    document.body.insertBefore(c, cA);
    c.appendChild(cA);
    c.appendChild(playButton);
    c.appendChild(title);
    c.appendChild(bar);
    c.appendChild(timer);
    playButton.addEventListener("click", function(){
      if(cA.playing)
        cA.pause();
      else
        cA.play();
    });
    cA.bar = bar;
    setInterval(function(){
      title.innerHTML = cA.getAttribute("title");
      if(cA.playing)
        playButton.innerHTML = "pause";
      else
        playButton.innerHTML = "play_arrow";
      cA.bar.setAttribute("value", cA.currentTime/cA.duration);
      timer.innerHTML = (function(){
        var t1 = cA.currentTime/60, t2 = cA.duration/60;
        t1 = Math.trunc(t1) + ":" + (function(){
          var v = Math.round((t1 - Math.trunc(t1))*60);
          return ((v + "").length == 1) ? "0" + v : v;
        })();
        t2 = Math.trunc(t2) + ":" + (function(){
          var v = Math.round((t2 - Math.trunc(t2))*60);
          return ((v + "").length == 1) ? "0" + v : v;
        })();
        return t1 + " / " + t2;
      })();
    }, 100);
    var f_ = function(e){
      cA.currentTime = ((e.clientX - c.clientWidth*0.1 - 14)/bar.clientWidth)*cA.duration;
    };
    bar.addEventListener("mousedown", function(e){
      f_(e);
      this.addEventListener("mousemove", f_);
    });
    bar.addEventListener("mouseup", function(){
      this.removeEventListener("mousemove", f_);
    });
    bar.addEventListener("mouseout", function(){
      this.removeEventListener("mousemove", f_);
    });
    bar.value = 0;
  }
  for(var i = 1; i < audio.length; i++){
    audio[i].removeAttribute("controls");
  }
})();



/*$('#our-video')[0].play(); // Play the video
$('#our-video')[0].pause(); // Pause the video
$('#our-video')[0].volume = 1; // Sets volume, volume ranges from 0 to 1
$('#our-video')[0].currentTime; // Current video time
$('#our-video')[0].duration; // Duration of video
$('#our-video')[0].buffered; // Amount of video buffered in seconds
if($('#our-video')[0].canPlayType('video/mp4')) { .. // If the video can play this type of format 
$('#our-video')[0].requestFullscreen; // (experimental) makes the video fullscreen*/