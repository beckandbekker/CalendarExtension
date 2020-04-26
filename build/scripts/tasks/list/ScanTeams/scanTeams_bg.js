class ScanTeams_OpenHome extends Step {
    constructor() {
        super("OpenHome");
    }

    onFinish(teamCount) {
        console.log("Done: " + teamCount);
    }
}

class ScanTeams extends Task {
    constructor() {
        super("ScanTeams");
    }

    start() {
        var that = this;

        createWindow({
            "url": "https://teams.microsoft.com/_#/school//?ctx=teamsGrid" // home page
        }, function (window) {
            var id = window.tabs[0].id;

            that.addTab(id);
            var step = new ScanTeams_OpenHome();
            that.assignTabStep(id, step);
        });
    }
}