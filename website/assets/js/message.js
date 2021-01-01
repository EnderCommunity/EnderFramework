var followCursor = document.getElementById('followCursor'),
    followCursor_Width = 0.98 * window.innerWidth,
    tr = function(e) {
        followCursor.margLeft = (e.clientX - 0.5 * followCursor_Width) + 'px';
        followCursor.margTop = (e.clientY - 0.5 * followCursor_Width) + 'px';
    };

document.addEventListener('mousemove', tr);

function showMessage() {
    document.removeEventListener('mousemove', tr);
    document.getElementById("hidden").style.display = "block";
    document.getElementsByClassName("content")[0].classList.add("flash");
    followCursor_Width = window.innerWidth * 1.5;
    followCursor.style.width = "150vw";
    followCursor.style.height = "150vw";
    document.addEventListener('mousemove', function(e) {
        followCursor.style.marginLeft = (e.clientX - 0.5 * followCursor_Width) + 'px';
        followCursor.style.marginTop = (e.clientY - 0.5 * followCursor_Width) + 'px';
    });
    setTimeout(function() {
        document.getElementsByTagName("h1")[0].style.display = "none";
        document.getElementsByTagName("h2")[0].style.display = "none";
        document.getElementById("hidden").classList.add("show");
    }, 50);
    setTimeout(function() {
        followCursor.style.width = null;
        followCursor.style.height = null;
        followCursor.style.marginLeft = followCursor.margLeft;
        followCursor.style.marginTop = followCursor.margTop;
        followCursor_Width = 0.98 * window.innerWidth
    }, 400);
}

var n = 0,
    lDate = new Date(),
    f = function() {
        var cDate = new Date();
        if (cDate - lDate < 500) {
            n++;
            if (n == 14) {
                showMessage();
                document.removeEventListener("mouseup", f);
            }
        } else {
            n = 0;
        }
        lDate = cDate;
    };
document.addEventListener("mouseup", f);