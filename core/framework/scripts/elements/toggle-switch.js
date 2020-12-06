class Switch extends HTMLElement {
    get active() {
        return this.hasAttribute("active");
    }
    get disabled() {
        return this.hasAttribute("disabled");
    }
    constructor() {
        super();
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
    customElements.define('toggle-switch', Switch);
};