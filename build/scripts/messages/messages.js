var Messages = {};

Messages.protocols = {
    "REQUEST_SCAN": 0
};

Messages.form = function (protocol, msg) {
    // Give JavaScript enums please!
    if (protocol == undefined) {
        var error = new Error("Message protocol " + protocol + " doesn't exist!");

        console.log(error);
        throw error;
    }
    return {
        "protocol": protocol,
        "message": msg
    }
}