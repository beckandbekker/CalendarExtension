function handleMessage(req, sender, respond) {
    if (req.protocol == Messages.protocols.REQUEST_SCAN) {
        AssignmentReader.requestScan();
    }
}

browser.runtime.onMessage.addListener(handleMessage);