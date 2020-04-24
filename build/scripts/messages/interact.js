// Interactions from popup get directed to this content script in order to communicate with
// the messageReader background script

browser.runtime.sendMessage(Messages.form(Messages.protocols.REQUEST_SCAN))
.then(function() {
    console.log("succ!")
}, function (e) {
    console.log(e);
});