class ExtraA extends HTMLElement {
    get href() {
        return this.getAttribute("href");
    }
    constructor() {
        super();
    }
    connectedCallback() {
        this.addEventListener("click", function() {
            ipcRenderer.sendToHost('do--openawebpage', this.href);
        });
    }
}
module.exports = function() {
    customElements.define('inapp-a', ExtraA);
};