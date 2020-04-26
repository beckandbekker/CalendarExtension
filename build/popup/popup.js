var rescanTeamsButton = O("rescan_teams");
var scanHomeworkButton = O("scan_homework");
var displayCalendarButton = O("open_calendar");

Messages.on(Messages.protocols.PONG, function () {
    console.log("Pong");
});

rescanTeamsButton.onclick = () => {
    Messages.send(Messages.protocols.REQUEST_TEAMS_RESCAN);
}

scanHomeworkButton.onclick = () => {
}

displayCalendarButton.onclick = () => {

}