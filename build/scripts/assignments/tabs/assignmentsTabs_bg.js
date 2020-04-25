// this deals with determining the URLs of tabs where assignments are shown for every class

var AssignmentsTabs = {};

AssignmentsTabs.scanning = false;
AssignmentsTabs.teamCount = -1;
AssignmentsTabs.queue = [];

AssignmentsTabs.addToQueue = function (id, msg, callback) {
    if (callback == undefined) {
        callback = function (id) {

        }
    }
    AssignmentsTabs.queue[id] = {
        "msg": msg,
        "callback": callback
    };
}

AssignmentsTabs.requestRescan = function () {
    // avoid people breaking it
    if (AssignmentsTabs.scanning) { return; }

    AssignmentsTabs.scanning = true;

    browser.windows.create({
        "url": "https://teams.microsoft.com/_#/school//?ctx=teamsGrid" // home page
    }).then(function (window) {
        AssignmentsTabs.addToQueue(
            window.tabs[0].id,
            Messages.form(
                Messages.protocols.GET_TEAM_COUNT
            )
        );
    }, function (e) {
        MessageHandler.reportError(e);
        AssignmentsTabs.scanning = false;
    });
}

AssignmentsTabs.sendTeamCount = function (count) {
    AssignmentsTabs.teamCount = count;

    AssignmentsTabs.scanning = false;
}

AssignmentsTabs.loaded = function (id) {
    if (AssignmentsTabs.queue[id] == undefined) { return; }

    browser.tabs.sendMessage(id, queue[id].msg);
    queue[id].callback(id);
    queue[id] = undefined;
}