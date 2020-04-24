browser.runtime.sendMessage(Messages.form(Messages.protocols.REQUEST_SCAN))
.then(function() {
    console.log("succ!")
}, function (e) {
    console.log(e);
});