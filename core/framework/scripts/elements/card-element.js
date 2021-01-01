class CardElement extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'description', 'background-image', 'background-color'];
    }
    get title() {
        return this.getAttribute("title");
    }
    set title(text) {
        this.setAttribute("title", text);
    }
    get description() {
        return this.getAttribute("description");
    }
    set description(text) {
        this.setAttribute("description", text);
    }

    get backgroundImage() {
        return this.getAttribute("background-image");
    }
    set backgroundImage(src) {
        this.setAttribute("background-image", src);
    }
    get backgroundColor() {
        return this.getAttribute("background-color");
    }
    set backgroundColor(color) {
        this.setAttribute("background-color", color);
    }
    get bigger() {
        return this.hasAttribute("default") && this.hasAttribute("bigger");
    }
    set bigger(bool) {
        bool ? (() => {
            this.setAttribute("default", "");
            this.setAttribute("bigger", "");
        })() : (() => {
            this.removeAttribute("default")
            this.removeAttribute("bigger")
        })();
    }
    get default() {
        return this.hasAttribute("default");
    }
    set default(bool) {
        bool ? this.setAttribute("default", "") : this.removeAttribute("default");
    }
    get clickable() {
        return this.hasAttribute("clickable");
    }
    set clickable(bool) {
        bool ? this.setAttribute("clickable", "") : this.removeAttribute("clickable");
    }
    get blurred() {
        return this.hasAttribute("blurred");
    }
    set blurred(bool) {
        bool ? this.setAttribute("blurred", "") : this.removeAttribute("blurred");
    }
    constructor() {
        super();
        ENDERFRAMEWORK_ENVIRONMENT.elements.warn("<card-element> is an experimental element! If you don't need it, try not to use it.");
        this.attachShadow({ mode: 'open' });
        var style = document.createElement("style");
        var style2 = document.createElement("style");
        this.titleElement = document.createElement("title");
        this.backgroundElement = document.createElement("media-resource");
        this.descriptionElement = document.createElement("description");
        style.innerHTML = ENDERFRAMEWORK_ENVIRONMENT.resources.css.customElements["card-element"];
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(style2);
        this.shadowRoot.appendChild(this.titleElement);
        this.shadowRoot.appendChild(this.descriptionElement);
        this.shadowRoot.appendChild(this.backgroundElement);
        this.refresh = () => {
            style2.innerHTML = "";
            this.backgroundElement.src = null;
            this.backgroundElement.type = null;
            this.descriptionElement.style.display = "none";
            this.titleElement.style.display = "none";
            if (this.title != null) {
                this.titleElement.innerHTML = this.title;
                this.titleElement.style.display = "block";
            }
            if (this.description != null) {
                this.descriptionElement.innerHTML = this.description;
                this.descriptionElement.style.display = "block";
            }
            //style.innerText = "";
            if (this.backgroundColor != null) {
                style2.innerHTML = `:host { background-color: ${this.backgroundColor}; }`;
            }
            if (this.backgroundImage != null) {
                this.backgroundElement.src = this.backgroundImage.substring(this.backgroundImage.indexOf("src('") + 5, this.backgroundImage.indexOf("', "));
                this.backgroundElement.type = this.backgroundImage.substring(this.backgroundImage.indexOf("',") + 2, this.backgroundImage.indexOf(")"));
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
    ENDERFRAMEWORK_ENVIRONMENT.tell.fire("customelements--insertcss", `card-element[blurred]:before { opacity: 1; pointer-events: all; }`);
    //ENDERFRAMEWORK_ENVIRONMENT.tell.fire("customelements--insertcss", ENDERFRAMEWORK_ENVIRONMENT.resources.css.customElements["card-element"]);
    customElements.define('card-element', CardElement);
};