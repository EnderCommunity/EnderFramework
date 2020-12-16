class TopElement extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'description', 'background-image', 'background-color'];
    }
    get title() {
        return this.getAttribute("title");
    }
    set title(title) {
        this.setAttribute("title", title);
    }
    get description() {
        return this.getAttribute("description");
    }
    set description(description) {
        this.setAttribute("description", description);
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
    constructor() {
        super();
        console.warn("<top-section> is an experimental element! If you don't need it, try not to use it.");
        this.attachShadow({ mode: 'open' });
        var style = document.createElement("style");
        style.innerHTML = ENDERFRAMEWORK_ENVIRONMENT.resources.css.customElements["top-section"];
        this.titleElement = document.createElement("title");
        this.descElement = document.createElement("desc");
        this.backgroundImageElement = document.createElement("media-resource");
        this.backgroundImageElement.style.display = "none";
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(this.backgroundImageElement);
        this.shadowRoot.appendChild(this.titleElement);
        this.shadowRoot.appendChild(this.descElement);
        this.refresh = () => {
            this.backgroundImageElement.style.display = "none";
            this.style.backgroundColor = this.backgroundColor;
            this.titleElement.textContent = this.title;
            this.descElement.textContent = this.description;
            if (this.backgroundImage != "" && this.backgroundImage != null) {
                this.backgroundImageElement.style.display = "flex";
                this.backgroundImageElement.src = this.backgroundImage.substring(this.backgroundImage.indexOf("src('") + 5, this.backgroundImage.indexOf("', "));
                this.backgroundImageElement.type = this.backgroundImage.substring(this.backgroundImage.indexOf("',") + 2, this.backgroundImage.indexOf(")"));
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