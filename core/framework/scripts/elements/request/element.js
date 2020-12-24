const path = require("path");
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
                ENDERFRAMEWORK_ENVIRONMENT.elements.error(`The element tag <${this.name}> is invalid!`);
            else if (ENDERFRAMEWORK_ENVIRONMENT.elements.requestedCustomElements.includes(this.name))
                ENDERFRAMEWORK_ENVIRONMENT.elements.error(`The element <${this.name}> has been already imported!`);
            else
                try {
                    (require(path.join("../", this.name)))();
                    ENDERFRAMEWORK_ENVIRONMENT.elements.requestedCustomElements[ENDERFRAMEWORK_ENVIRONMENT.elements.requestedCustomElements.length] = this.name;
                } catch {
                    try {
                        (require(path.join(paths.currentApp, "resources", "elements", this.name)))();
                        ENDERFRAMEWORK_ENVIRONMENT.elements.requestedCustomElements[ENDERFRAMEWORK_ENVIRONMENT.elements.requestedCustomElements.length] = this.name;
                    } catch {
                        ENDERFRAMEWORK_ENVIRONMENT.elements.error(`Couldn't import the element <${this.name}>!`);
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