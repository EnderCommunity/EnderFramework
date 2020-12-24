var isMax = false;
class FloatingAction extends HTMLElement {
    get content() {
        return this.getAttribute("content");
    }
    constructor() {
        super();
        ENDERFRAMEWORK_ENVIRONMENT.elements.warn("<floating-action> is an experimental element! If you don't need it, try not to use it.");
    }
    connectedCallback() {
        if (!isMax) {
            isMax = true;
            ENDERFRAMEWORK_ENVIRONMENT.elements.floatingActionButton[ENDERFRAMEWORK_ENVIRONMENT.elements.floatingActionButton.length] = this;
            this.addEventListener("click", function() {
                ENDERFRAMEWORK_ENVIRONMENT.elementActions.floatingButtonClicked(0, this.getAttribute("content"));
            });
        } else {
            ENDERFRAMEWORK_ENVIRONMENT.elements.error("You can only use one <floating-action> per page!");
            this.outerHTML = "";
        }
    }
}
module.exports = function() {
    ENDERFRAMEWORK_ENVIRONMENT.tell.fire("customelements--insertcss", ENDERFRAMEWORK_ENVIRONMENT.resources.css.customElements["floating-action"]);
    customElements.define('floating-action', FloatingAction);
};