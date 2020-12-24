class ItemElement extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'description', 'sub', 'background-image'];
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
    get sub() {
        return this.getAttribute("sub");
    }
    set sub(text) {
        this.setAttribute("sub", text);
    }
    constructor() {
        super();
        ENDERFRAMEWORK_ENVIRONMENT.elements.warn("<item-element> is an experimental element! If you don't need it, try not to use it.");
        this.attachShadow({ mode: 'open' });
        var style = document.createElement("style");
        style.innerHTML = ENDERFRAMEWORK_ENVIRONMENT.resources.css.customElements["item-element"];
        this.titleElement = document.createElement("title");
        this.descElement = document.createElement("desc");
        this.subTextElement = document.createElement("price");
        this.backgroundImageElement = document.createElement("media-resource");
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(this.backgroundImageElement);
        this.shadowRoot.appendChild(this.titleElement);
        this.shadowRoot.appendChild(this.descElement);
        this.shadowRoot.appendChild(this.subTextElement);
        this.refresh = () => {
            this.style.backgroundColor = this.backgroundColor;
            this.titleElement.textContent = this.title;
            this.descElement.textContent = this.description;
            this.subTextElement.textContent = this.sub;
            if (this.backgroundImage != "" && this.backgroundImage != null) {
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
    customElements.define('item-element', ItemElement);
};