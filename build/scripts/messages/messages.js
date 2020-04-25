var Messages = {};

Messages.protocols = {
    "ERROR": 0,
    "STEP_INIT": 1,
    "STEP_END": 2,
    "REQUEST_TEAMS_RESCAN": 3,
    "PONG": 4
};

Messages.delayPort = false;



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