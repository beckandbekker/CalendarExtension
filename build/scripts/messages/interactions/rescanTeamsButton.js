browser.runtime.sendMessage(Messages.form(Messages.protocols.REQUEST_TEAMS_RESCAN)).then(function() {
}, function (e) {
    console.log(e);
});