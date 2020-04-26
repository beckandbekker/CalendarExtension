Messages.callbacks = {};
Messages.on = function (protocol, callback) {
    if (protocol != undefined) {
        if (Messages.callbacks[protocol] == undefined) {
            Messages.callbacks[protocol] = [];
        }

        Messages.callbacks[protocol].push(callback);
    }
}



var messageHandler = function (msg) {
    var protocol = msg.protocol;

    var callbacks = Messages.callbacks[protocol];

    if (callbacks != undefined) {
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](msg.message);
        }
    }
}

var port;

Messages.createPort = function () {
    port = brows.runtime.connect();
    port.onMessage.addListener(messageHandler);
}

Messages.createPort();

Messages.send = function (protocol, message) {
    try {
        port.postMessage(Messages.form(protocol, message));
    } catch (e) {
        console.log(e);
    }
}