var MessageHandler = {};

MessageHandler.handleMessage = function (req, sender, respond) {
    if (req.protocol == Messages.protocols.REQUEST_SCAN) {
        AssignmentReader.requestScan();
    }



    if (req.protocol == Messages.protocols.REQUEST_TEAMS_RESCAN) {
        AssignmentsTabs.requestRescan();
    }



    if (req.protocol == Messages.protocols.SEND_TEAM_COUNT) {
        AssignmentsTabs.sendTeamCount(req.message);
    }
}

MessageHandler.reportError = function (e) {
    browser.tabs.sendMessage(
        browser.tabs.getCurrent().id,
        e
    );
}

browser.runtime.onMessage.addListener(MessageHandler.handleMessage);