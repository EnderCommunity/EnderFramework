class RequestRElement extends HTMLElement {
    get name() {
        return this.getAttribute('name').replace(/\s/g, "");
    }
    get instantLoading() {
        return !this.hasAttribute("wait")
    }
    constructor() {
        super();
    }
    connectedCallback() {
        var sharedCode = () => {
            if (this.name == "name") {
                //
            }
        };
        if (this.instantLoading)
            sharedCode();
        else
            document.addEventListener("DOMContentLoaded", function() {
                sharedCode();
            });
    }
}
module.exports = function() {
    customElements.define('request-resource', RequestRElement);
};