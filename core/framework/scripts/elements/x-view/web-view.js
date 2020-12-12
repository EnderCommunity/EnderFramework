var THIS = null;
module.exports = {
    start: function(element) {
        THIS = element;
    },
    initiate: function() {
        THIS.iframe.onload = () => {
            //console.log(this.iframe.contentWindow); //This is not working
            //this.src = this.iframe.src;
            //this.setAttribute("src", this.iframe.src);
        };
        THIS.iframe.src = THIS.src;
    }
};