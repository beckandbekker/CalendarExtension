// this deals with determining the URLs of tabs where assignments are shown for every class

var AssignmentsTabs = {};

var scanning = false;

AssignmentsTabs.requestRescan = function () {
    // avoid people breaking it
    if (scanning) { return; }

    scanning = true;

    browser.windows.create({
        "url": "https://teams.microsoft.com/_#/school//?ctx=teamsGrid" // home page
    }).then(function (windowInfo) {
        scanning = false;
    }).catch(function (e) {
        scanning = false;
    });
}