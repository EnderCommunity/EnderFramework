class WarnButton extends HTMLElement {
    get message() {
        return this.getAttribute("message");
    }
    get onagree() {
        return this.getAttribute("onagree"); //Use a built-in JavaScript function
    }
    get ondisagree() {
        return this.getAttribute("ondisagree"); //Use a built-in JavaScript function
    }
    constructor() {
        super();
        ENDERFRAMEWORK_ENVIRONMENT.elements.warn("<warn-button> is an experimental element! If you don't need it, try not to use it.");
    }
    connectedCallback() {
        this.addEventListener("click", function() {
            //
            EnderFramework.dialog.messageBox({
                title: "Warning",
                message: this.message,
                buttons: [{
                    text: "cancel",
                    onclick: this.ondisagree
                }, {
                    text: "ok",
                    type: "warn",
                    onclick: this.onagree
                }],
                details: ""
            });
        });
    }
}
module.exports = function() {
    ENDERFRAMEWORK_ENVIRONMENT.tell.fire("customelements--insertcss", ENDERFRAMEWORK_ENVIRONMENT.resources.css.customElements["warn-button"]);
    customElements.define('warn-button', WarnButton);
};