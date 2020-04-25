browser.runtime.onMessage.addListener(function (req) {
    if (req.protocol == Messages.protocols.ERROR) {
        alert("MS Teams Homework Calendar Error:\n\n" + req.message);
    }
});