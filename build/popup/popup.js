var rescanTeamsButton = document.getElementById("rescan_teams");
var scanHomeworkButton = document.getElementById("scan_homework");

// for sending messages
browser.tabs.executeScript({file: "/scripts/messages/messages.js"});

rescanTeamsButton.onclick = function () {
    browser.tabs.executeScript({file: "/scripts/messages/interactions/rescanTeamsButton.js"});
}

scanHomeworkButton.onclick = function () {
    browser.tabs.executeScript({file: "/scripts/messages/interactions/scanHomeworkButton.js"});
}