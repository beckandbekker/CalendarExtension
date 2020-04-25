var teams;

function test() {
    teams = document.getElementsByClassName("team-card");
    return teams.length != 0;
}

function getTeamCount() {
    if (!test) {
        var int = setInterval(function () {
            if (test) {
                clearInterval(int);

                alert(teams.length);
                finish(teams.length);
            }
        }, 1000);
    }
}

getTeamCount();

// https://teams.microsoft.com/_#/school