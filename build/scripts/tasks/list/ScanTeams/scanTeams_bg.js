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

        browser.windows.create({
            "url": "https://teams.microsoft.com/_#/school//?ctx=teamsGrid" // home page
        }).then(function (window) {
            var id = window.tabs[0].id;

            that.addTab(id);
            var step = new ScanTeams_OpenHome();
            that.assignTabStep(id, step);
        });
    }
}