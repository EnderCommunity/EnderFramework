class XView extends HTMLElement {
    get type() {
        return this.getAttribute("type");
    }
    constructor() {
        super();
    }
    connectedCallback() {
        //
    }
}
module.exports = function() {
    customElements.define('x-view', XView);
};