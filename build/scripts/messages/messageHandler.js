function handleMessage(req, sender, respond) {
    if (req.protocol == Messages.protocols.REQUEST_SCAN) {
        AssignmentReader.requestScan();
    }
    if (req.protocol == Messages.protocols.REQUEST_TEAMS_RESCAN) {
        AssignmentsTabs.requestRescan();
    }
}

browser.runtime.onMessage.addListener(handleMessage);