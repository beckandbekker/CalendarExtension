browser.runtime.sendMessage(Messages.form(Messages.protocols.REQUEST_SCAN)).then(function() {
}, function (e) {
    console.log(e);
});