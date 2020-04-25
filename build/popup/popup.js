var rescanTeamsButton = document.getElementById("rescan_teams");
var scanHomeworkButton = document.getElementById("scan_homework");

Messages.on(Messages.protocols.PONG, function () {
    alert("Pog!");
});

rescanTeamsButton.onclick = function () {
    Messages.send(Messages.protocols.REQUEST_TEAMS_RESCAN);
}

scanHomeworkButton.onclick = function () {
}