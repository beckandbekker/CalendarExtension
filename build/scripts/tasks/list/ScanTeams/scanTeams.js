Tasks.ScanTeams = {}

var OpenHome = {};

OpenHome.test = function() {
    OpenHome.teams = document.getElementsByClassName("team-card");
    return OpenHome.teams.length != 0;
}

OpenHome.execute = function() {
    if (!OpenHome.test()) {
        var int = setInterval(function () {
            if (OpenHome.test()) {
                clearInterval(int);

                alert(OpenHome.teams.length);
                finish(OpenHome.teams.length);
            }
        }, 200);
    }
}

Tasks.ScanTeams.OpenHome = OpenHome;