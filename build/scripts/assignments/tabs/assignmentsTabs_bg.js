// this deals with determining the URLs of tabs where assignments are shown for every class

var AssignmentsTabs = {};

var scanning = false;
var teamCount;

AssignmentsTabs.requestRescan = function () {
    // avoid people breaking it
    if (scanning) { return; }

    scanning = true;

    browser.windows.create({
        "url": "https://teams.microsoft.com/_#/school//?ctx=teamsGrid" // home page
    }).then(function (window) {
        // Teams home page tab
        browser.tabs.sendMessage(
            window.tabs[0].id,
            Messages.form(Messages.protocols.GET_TEAM_COUNT)
        );
    }).catch(function (e) {
        scanning = false;
    });
}

AssignmentsTabs.sendTeamCount = function (count) {
    teamCount = count;

    scanning = false;
}