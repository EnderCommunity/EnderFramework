class ExtraA extends HTMLElement {
    get href() {
        return this.getAttribute("href");
    }
    constructor() {
        super();
        console.warn("<inapp-a> is an experimental element! If you don't need it, try not to use it.");
    }
    connectedCallback() {
        this.addEventListener("click", function() {
            ipcRenderer.sendToHost('do--openawebpage', this.href);
        });
    }
}
module.exports = function() {
    ENDERFRAMEWORK_ENVIRONMENT.tell.fire("customelements--insertcss", ENDERFRAMEWORK_ENVIRONMENT.resources.css.customElements["inapp-a"]);
    customElements.define('inapp-a', ExtraA);
};