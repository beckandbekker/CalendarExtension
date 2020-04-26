var MessageHandler = {};

MessageHandler.ports = [];

MessageHandler.handleMessage = function (msg) {
    if (msg.protocol == Messages.protocols.REQUEST_TEAMS_RESCAN) {
        var task = new ScanTeams();
        task.start();
    }
}

MessageHandler.onConnect = function (port) {
    port.postMessage(Messages.form(Messages.protocols.PONG));

    // not always from a tab, there are popup ports
    if (port.sender.tab != undefined) {
        var id = port.sender.tab.id;
        MessageHandler.ports[port.sender.tab.id] = port;

        var callbacks = MessageHandler.loadCallbacks[id];

        if (callbacks != undefined) {
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i](id, port);
            }
        }

        MessageHandler.loadCallbacks[id] = undefined;
    }

    port.onMessage.addListener(MessageHandler.handleMessage);
}

MessageHandler.isConnected = function (id) {
    return MessageHandler.ports[id] != undefined;
}

MessageHandler.getPort = function (id) {
    return MessageHandler.ports[id];
}

brows.runtime.onConnect.addListener(MessageHandler.onConnect);



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

    MessageHandler.loadCallbacks[id].push(callback);
}