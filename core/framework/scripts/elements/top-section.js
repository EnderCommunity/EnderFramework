class TopElement extends HTMLElement {
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
        console.warn("<top-section> is an experimental element! If you don't need it, try not to use it.");
        this.attachShadow({ mode: 'open' });
        var style = document.createElement("style");
        style.innerHTML = ENDERFRAMEWORK_ENVIRONMENT.resources.css.customElements["x-view"];
        //this.shadowRoot;
        this.iframe = document.createElement("iframe");
        this.iframe.setAttribute("seamless", "");
        this.iframe.setAttribute("sandbox", "allow-forms allow-pointer-lock allow-presentation allow-same-origin allow-scripts");
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(this.iframe);
        this.refresh = function() {
            if (this.type == "web") {
                this.iframe.onload = () => {
                    //console.log(this.iframe.contentWindow); //This is not working
                    //this.src = this.iframe.src;
                    //this.setAttribute("src", this.iframe.src);
                };
                this.iframe.src = this.src;
            } else if (this.type == "command") {
                //
            } else if (this.type == "process") {
                //
            } else if (this.type == "window") {
                //
            } else {
                console.error("Invalid <x-view> type!");
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
    customElements.define('top-section', TopElement);
};