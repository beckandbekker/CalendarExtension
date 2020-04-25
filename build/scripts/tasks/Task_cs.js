var stepInfo;

Messages.on(Messages.protocols.STEP_INIT, function (msg) {
    stepInfo = msg.info;

    browser.tabs.executeScript({file: msg.script});
});

function finish(info) {
    port.postMessage(Messages.form(Messages.protocols.STEP_END, info));
}