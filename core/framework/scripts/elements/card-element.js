class CardView extends HTMLElement {
    get active() {
        return this.hasAttribute("active");
    }
    get disabled() {
        return this.hasAttribute("disabled");
    }
    constructor() {
        super();
        ENDERFRAMEWORK_ENVIRONMENT.elements.warn("<card-element> is an experimental element! If you don't need it, try not to use it.");
        this.refresh = () => {
            //
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
    //ENDERFRAMEWORK_ENVIRONMENT.tell.fire("customelements--insertcss", ENDERFRAMEWORK_ENVIRONMENT.resources.css.customElements["toggle-switch"]);
    customElements.define('card-element', CardView);
};