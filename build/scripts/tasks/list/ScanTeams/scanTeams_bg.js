class ScanTeams_OpenHome extends Step {
    constructor() {
        super("scripts/tasks/list/ScanTeams/scanTeams.js");
    }

    onFinish(teamCount) {
        
    }
}

class ScanTeams extends Task {
    start() {
        browser.windows.create({
            "url": "https://teams.microsoft.com/_#/school//?ctx=teamsGrid" // home page
        }).then(function (window) {
            var id = window.tabs[0].id;

            addTab(id).then(function () {
                var step = new ScanTeams_OpenHome();
                assignTabStep(id, step);
            });
        });
    }
}