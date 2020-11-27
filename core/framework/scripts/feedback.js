var showFeedbackScreen = function () {
    document.getElementById("_COfFeedback").style.display = "block";
    document.getElementById("_FeedbackUI").style.display = "block";
}, hideFeedbackScreen = function () {
    document.getElementById('_COfFeedback').style.display = 'none';
    document.getElementById('_FeedbackUI').style.display = 'none';
    document.getElementById('_feedbackTextarea').value = '';
};