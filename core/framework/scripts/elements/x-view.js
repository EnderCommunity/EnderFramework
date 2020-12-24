class XView extends HTMLElement {
    static get observedAttributes() {
        return ['type', 'src'];
    }
    get type() {
        return this.getAttribute("type");
    }
    get src() {
        return this.getAttribute("src");
    }
    set type(type) {
        this.setAttribute("type", type);
    }
    set src(src) {
        this.setAttribute("src", src);
    }
    constructor() {
        super();
        ENDERFRAMEWORK_ENVIRONMENT.elements.warn("<x-view> is an experimental element! If you don't need it, try not to use it.");
        this.attachShadow({ mode: 'open' });
        var style = document.createElement("style");
        style.innerHTML = ENDERFRAMEWORK_ENVIRONMENT.resources.css.customElements["x-view"];
        //this.shadowRoot;
        this.iframe = document.createElement("iframe");
        this.iframe.setAttribute("seamless", "");
        this.iframe.setAttribute("sandbox", "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-same-origin allow-scripts");
        /* allow-top-navigation allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox allow-popups*/
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(this.iframe);
        this.xViewAPI = null;
        this.refresh = () => {
            if (this.type == "web") {
                this.xViewAPI = require("./x-view/web-view");
                this.xViewAPI.start(this);
                this.xViewAPI.initiate();
            } else if (this.type == "command") {
                //
                this.xViewAPI = require("./x-view/command-view");
                this.xViewAPI.start(this);
            } else if (this.type == "game") {
                //
                this.xViewAPI = require("./x-view/game-view");
                this.xViewAPI.start(this);
            } else if (this.type == "process") { //This may be hard to implement
                //This should view other processes
                this.xViewAPI = require("./x-view/process-view");
                this.xViewAPI.start(this);
            } else if (this.type == "window") { //This is probably a bad idea
                //This should view a window
                this.xViewAPI = require("./x-view/window-view");
                this.xViewAPI.start(this);
            } else {
                ENDERFRAMEWORK_ENVIRONMENT.elements.error("Invalid <x-view> type!");
                this.iframe.style.display = "none";
            }
        };
    }
    connectedCallback() {
        this.refresh();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue != newValue)
            this.refresh();
    }
}
module.exports = function() {
    customElements.define('x-view', XView);
};