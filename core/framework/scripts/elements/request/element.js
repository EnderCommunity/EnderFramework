const path = require("path"),
    requestedCustomElements = [];
class RequestElement extends HTMLElement {
    get name() {
        return this.getAttribute('tag').replace(/\s/g, "");
    }
    get instantLoading() {
        return !this.hasAttribute("wait")
    }
    constructor() {
        super();
    }
    connectedCallback() {
        var sharedCode = () => {
            if (!this.name.includes("-"))
                console.error(`The element tag <${this.name}> is invalid!`);
            else if (requestedCustomElements.includes(this.name))
                console.error(`The element <${this.name}> has been already imported!`);
            else
                try {
                    (require(path.join("../", this.name)))();
                    requestedCustomElements[requestedCustomElements.length] = this.name;
                } catch {
                    try {
                        (require(path.join(paths.currentApp, "resources", "elements", this.name)))();
                        requestedCustomElements[requestedCustomElements.length] = this.name;
                    } catch {
                        console.error(`Couldn't import the element <${this.name}>!`);
                    }
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
    customElements.define('request-element', RequestElement);
};