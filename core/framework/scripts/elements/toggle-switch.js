class Switch extends HTMLElement {
    get active() {
        return this.hasAttribute("active");
    }
    get disabled() {
        return this.hasAttribute("disabled");
    }
    set active(bool) {
        if (bool)
            this.setAttribute("active", "");
        else
            this.removeAttribute("active");
    }
    set disabled(bool) {
        if (bool)
            this.setAttribute("disabled", "");
        else
            this.removeAttribute("disabled");
    }
    constructor() {
        super();
        ENDERFRAMEWORK_ENVIRONMENT.elements.warn("<toggle-switch> is an experimental element! If you don't need it, try not to use it.");
        this.onToggle = function() {};
    }
    connectedCallback() {
        this.addEventListener("click", () => {
            if (!this.disabled) {
                (this.active) ? this.removeAttribute("active"): this.setAttribute("active", "");
                this.onToggle(this.active);
            }
        });
    }
}
module.exports = function() {
    ENDERFRAMEWORK_ENVIRONMENT.tell.fire("customelements--insertcss", ENDERFRAMEWORK_ENVIRONMENT.resources.css.customElements["toggle-switch"]);
    customElements.define('toggle-switch', Switch);
};