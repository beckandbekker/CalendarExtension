var MessageHandler = {};

MessageHandler.ports = [];

MessageHandler.handleMessage = function (msg) {
    if (msg.protocol == Messages.protocols.REQUEST_TEAMS_RESCAN) {
        var task = new ScanTeams();
        task.start();
    }
}

// MessageHandler.reportError = function (e) {
//     browser.tabs.getCurrent().then(function (tab) {
//         browser.tabs.sendMessage(
//             tab.id,
//             Messages.form(Messages.protocols.ERROR, e)
//         );
//     });
// }

MessageHandler.onConnect = function (port) {
    port.sendMessage(Messages.form(Messages.protocols.PONG));
    var id = port.sender.tab.id;
    MessageHandler.ports[port.sender.tab.id] = port;

    var callbacks = MessageHandler.loadCallbacks[id];

    if (callbacks != undefined) {
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](id, port);
        }
    }

    port.onMessage.addListener(handleMessage);

    MessageHandler.loadCallbacks[id] = undefined;
}

MessageHandler.isConnected = function (id) {
    return MessageHandler.ports[id] != undefined;
}

MessageHandler.getPort = function (id) {
    return MessageHandler.ports[id];
}

browser.runtime.onConnect.addListener(MessageHandler.onConnect);



MessageHandler.loadCallbacks = {};
MessageHandler.onLoad = function (id, callback) {
    var port = MessageHandler.ports[id];

    if (port != undefined) {
        callback(id, port);

        return;
    }

    if (MessageHandler.loadCallbacks[id] == undefined) {
        MessageHandler.loadCallbacks[id] = [];
    }

    MessageHandler.loadCallbacks.push(callback);
}