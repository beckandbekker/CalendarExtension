Messages.callbacks = {};
Messages.on = function (protocol, callback) {
    try {
    if (protocol != undefined) {
        Messages.callbacks[protocol] = callback;
        //alert("Successful callback!");
    }
} catch(e) {
    alert(e);
}
}



var messageHandler = function (msg) {
    var protocol = msg.protocol;

    if (Messages.callbacks[protocol] != undefined) {
        Messages.callbacks[protocol](msg.message);
    }
}

var port;

Messages.createPort = function () {
    port = browser.runtime.connect();
    port.onMessage.addListener(messageHandler);
}

if (!Messages.delayPort) {
    Messages.createPort();
}

Messages.send = function (protocol, message) {
    try {
    port.postMessage(Messages.form(protocol, message));
    } catch (e) {
        console.log(e);
    }
    console.log("sent!");
}