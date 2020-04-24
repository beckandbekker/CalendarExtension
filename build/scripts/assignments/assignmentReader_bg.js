// background script that opens up all assignment tabs in order for them to be read

var AssignmentReader = {};

AssignmentReader.requestScan = function() {
    browser.windows.create({
    }).then(function (windowInfo) {
        browser.tabs.create({
            "url": "https://teams.microsoft.com/_#/school/classroom/General?threadId=19:d51be344f9c44316832185765635ed76@thread.tacv2&ctx=channel",
            "windowId": windowInfo.id
        }).then(function (tabInfo) {
            alert(tabInfo.id);
        });
    }).catch(function (e) {
        console.log(e);
    });
}