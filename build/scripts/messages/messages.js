alert("hey!");

var Messages = {};

Messages.protocols = {
    "REQUEST_SCAN": 0,
    "REQUEST_TEAMS_RESCAN": 1,
    "GET_TEAM_COUNT": 3,
    "SEND_TEAM_COUNT": 4,
    "READ_TEAM_URLS": 5,
    "ERROR": 7
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