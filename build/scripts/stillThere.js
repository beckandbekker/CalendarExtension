// MS Teams bad, provide our users some emotional support :)
setInterval(function () {
    var elm = document.getElementById("ngdialog1");
    if (elm != undefined && elm.innerHTML.indexOf("Are you still there") != -1) {
        elm.parentNode.removeChild(elm);
    }
}, 60000);