var path = require("path");
class RequestMedia extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        var style = document.createElement("style");
        style.innerHTML = ENDERFRAMEWORK_ENVIRONMENT.resources.css.customElements["request.media"];
        this.shadowRoot.appendChild(style);
        this.errorElement = document.createElement("div");
        this.imageC = document.createElement("div");
        this.imageElement = document.createElement("img");
        this.loadImageElement = document.createElement("img");
        this.loadImageElementC = document.createElement("div");
        this.errorElement.classList.add("error");
        this.loadImageElementC.classList.add("plpc");
        this.loadImageElement.classList.add("pre-load");
        this.videoC = document.createElement("div");
        this.videoElement = document.createElement("video");
        this.audioElement = document.createElement("audio");
        this.audioElement.setAttribute("controls", "");
        this.imageC.classList.add("imageC");
        this.videoC.classList.add("videoC");
        this.errorElement.display = "none";
        this.imageC.style.display = "none";
        this.videoC.style.display = "none";
        //this.videoElement.style.display = "none";
        this.audioElement.style.display = "none";
        this.errorElement.innerHTML = "Failed to load!";
        this.imageC.appendChild(this.imageElement);
        this.loadImageElementC.appendChild(this.loadImageElement);
        this.imageC.appendChild(this.loadImageElementC);
        this.shadowRoot.appendChild(this.errorElement);
        this.shadowRoot.appendChild(this.imageC);
        this.videoC.appendChild(this.videoElement);
        this.shadowRoot.appendChild(this.videoC);
        this.shadowRoot.appendChild(this.audioElement);
        this.reset = () => {
            this.errorElement.style.display = "none";
            this.imageC.style.display = "none";
            this.videoC.style.display = "none";
            this.audioElement.style.display = "none";
            this.loadImageElementC.classList.remove("load");
            this.imageElement.removeAttribute("src");
            this.loadImageElement.removeAttribute("src");
        };
        this.error = () => {
            this.reset();
            this.errorElement.style.display = null;
        };

        this.refresh = function() {
            var sharedCode = () => {
                this.reset();
                var type = this.type.substring(0, this.type.indexOf("/")),
                    ext = this.type.substring(this.type.indexOf("/") + 1),
                    path_ = path.join(paths.currentApp, "resources", "media");
                if (type == "image") {
                    if (ext == "jpeg" || ext == "jpg" || ext == "webp" || ext == "gif" || ext == "png" || ext == "apng" || ext == "tiff" || ext == "svg" || ext == "bmp" || ext == "ico") {
                        path_ = path.join(path_, "image");
                        //alert("image", path_);
                        path_ = [ENDERFRAMEWORK_ENVIRONMENT.parse.src(path_, this.src, `load.${ext}`), ENDERFRAMEWORK_ENVIRONMENT.parse.src(path_, this.src, ext)];
                        //
                        this.imageC.style.display = null;
                        this.videoC.style.display = "none";
                        this.audioElement.style.display = "none";
                        this.loadImageElementC.classList.remove("load");
                        this.imageElement.classList.remove("loaded");
                        this.loadImageElement.src = path_[0];
                        //pre-load
                        this.loadImageElement.onerror = () => {
                            //this.errorElement.style.display = null;
                            this.error();
                        };
                        this.loadImageElement.onload = () => {
                            var loop = setInterval(() => {
                                if (document.readyState == "complete") {
                                    clearInterval(loop);
                                    var intersectionObserver = new IntersectionObserver((entries) => {
                                        let [entry] = entries;
                                        if (entry.isIntersecting) {
                                            this.imageElement.src = path_[1];
                                            intersectionObserver.disconnect();
                                        }
                                    });
                                    intersectionObserver.observe(this);
                                }
                            }, 500);
                        };
                        //this.imageC
                        this.imageElement.onload = () => {
                            this.imageElement.classList.add("loaded");
                            this.loadImageElementC.classList.add("load");
                        };
                        //console.log(path_);
                    } else {
                        ENDERFRAMEWORK_ENVIRONMENT.elements.error("This file format is not supported!");
                    }
                } else if (type == "video") {
                    if (ext == "mp4" || ext == "vp8" || ext == "vp9" || ext == "av1") {
                        path_ = path.join(path_, "video");
                        //alert("video", path_);
                        path_ = ENDERFRAMEWORK_ENVIRONMENT.parse.src(path_, this.src, ext);
                        //
                        this.imageC.style.display = "none";
                        this.videoC.style.display = null;
                        this.audioElement.style.display = "none";
                        //
                        this.videoElement.src = path_;
                        //this.auto;
                        //this.controls;
                        //Require all videos to have a preview file (in a nativeImage format, if possible)
                        //require("electron").nativeImage.createFromPath("[Path]").toDataURL();
                        //
                        //console.log(path_);
                    } else {
                        ENDERFRAMEWORK_ENVIRONMENT.elements.error("This file format is not supported!");
                    }
                } else if (type == "audio") {
                    if (ext == "mp3" || ext == "mp4" || ext == "ogg" || ext == "flac" || ext == "webm" || ext == "wav" || ext == "hls") {
                        path_ = path.join(path_, "audio");
                        //alert("audio", path_);
                        path_ = ENDERFRAMEWORK_ENVIRONMENT.parse.src(path_, this.src, ext);
                        //
                        this.imageC.style.display = "none";
                        this.videoC.style.display = "none";
                        this.audioElement.style.display = null;
                        //
                        //console.log(path_);
                    } else {
                        ENDERFRAMEWORK_ENVIRONMENT.elements.error("This file format is not supported!");
                    }
                }
            };
            if (this.type != null && this.src != null) {
                if (this.instantLoading)
                    sharedCode();
                else
                    document.addEventListener("DOMContentLoaded", function() {
                        sharedCode();
                    });
            }
        };
    }
    get type() {
        return (this.hasAttribute('type')) ? this.getAttribute('type').replace(/\s/g, "") : null;
    }
    set type(type) {
        this.setAttribute('type', type);
    }
    get src() {
        return (this.hasAttribute('src')) ? this.getAttribute('src').replace(/\s/g, "") : null;
    }
    set src(src) {
        this.setAttribute('src', src);
    }
    get instantLoading() {
        return !this.hasAttribute("wait")
    }
    set instantLoading(bool) {
        if (bool)
            this.removeAttribute('wait');
        else
            this.setAttribute('wait', '');
    }
    get auto() {
        return this.hasAttribute('auto');
    }
    set auto(bool) {
        if (bool)
            this.setAttribute('auto', '');
        else
            this.removeAttribute('auto');
    }
    get controls() {
        return this.hasAttribute('controls');
    }
    set controls(bool) {
        if (bool)
            this.setAttribute('controls', '');
        else
            this.removeAttribute('controls');
    }
    connectedCallback() {
        this.refresh();
    }
    static get observedAttributes() {
        return ['type', 'src'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.refresh();
    }
}
module.exports = function() {
    customElements.define('media-resource', RequestMedia);
};