class CardView extends HTMLElement {
    get active() {
        return this.hasAttribute("active");
    }
    get disabled() {
        return this.hasAttribute("disabled");
    }
    constructor() {
        super();
        if (ENDERFRAMEWORK_ENVIRONMENT.elements.requestedCustomElements.includes("card-element")) {
            ENDERFRAMEWORK_ENVIRONMENT.elements.warn("<card-view> is an experimental element! If you don't need it, try not to use it.");
            this.refresh = () => {
                //
            };
        } else {
            ENDERFRAMEWORK_ENVIRONMENT.elements.error("You can't use the <card-view> element without requesting the <card-element> first!");
        }
    }
    connectedCallback() {
        if (this.refresh != undefined)
            this.refresh();
        else
            this.outerHTML = "";
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue != newValue)
            this.refresh();
    }
}
module.exports = function() {
    //ENDERFRAMEWORK_ENVIRONMENT.tell.fire("customelements--insertcss", ENDERFRAMEWORK_ENVIRONMENT.resources.css.customElements["toggle-switch"]);
    customElements.define('card-view', CardView);
};