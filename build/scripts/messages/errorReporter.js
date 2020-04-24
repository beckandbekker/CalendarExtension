browser.runtime.onMessage.addListener(function (req) {
    alert(JSON.stringify(req));
    if (req.protocol == Messages.protocols.ERROR) {
        alert("MS Teams Homework Calendar Error:\n\n" + req.message);
    }
});