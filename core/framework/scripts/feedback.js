var showFeedbackScreen = function() {
        topBarBlur(false);
        document.getElementById("_COfFeedback").style.display = "block";
        document.getElementById("_FeedbackUI").style.display = "block";
    },
    hideFeedbackScreen = function() {
        topBarBlur(true);
        document.getElementById('_COfFeedback').style.display = 'none';
        document.getElementById('_FeedbackUI').style.display = 'none';
        document.getElementById('_feedbackTextarea').value = '';
    };