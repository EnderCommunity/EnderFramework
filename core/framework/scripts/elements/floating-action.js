var isMax = false;
class FloatingAction extends HTMLElement {
    get content() {
        return this.getAttribute("content");
    }
    constructor() {
        super();
    }
    connectedCallback() {
        this.floatingActionID = ENDERFRAMEWORK_ENVIRONMENT.elements.floatingActionButton.length;
        ENDERFRAMEWORK_ENVIRONMENT.elements.floatingActionButton[ENDERFRAMEWORK_ENVIRONMENT.elements.floatingActionButton.length] = this;
        if (!isMax) {
            isMax = true;
            this.addEventListener("click", function() {
                ENDERFRAMEWORK_ENVIRONMENT.elementActions.floatingButtonClicked(this.floatingActionID, this.content);
            });
        } else {
            this.outerHTML = "";
            console.error("You can only add one <floating-action> per page!");
        }
    }
}
module.exports = function() {
    customElements.define('floating-action', FloatingAction);
};