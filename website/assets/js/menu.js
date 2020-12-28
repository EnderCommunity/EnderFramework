document.getElementById("showMenu").addEventListener("click", function() {
    document.documentElement.dataset.menu = true;
});
document.getElementById("hideMenu").addEventListener("click", function() {
    document.documentElement.dataset.menu = false;
});