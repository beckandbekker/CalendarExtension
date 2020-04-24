var teams;

alert("Running!");

function getTeamCount() {
    function test() {
        teams = document.getElementsByClassName("team-card");

        var ret = teams.length != 0;

        if (ret) {
            browser.runtime.sendMessage(Messages.form(Messages.protocols.SEND_TEAM_COUNT, teams.length));
            alert(teams.length + " teams found");
        }

        return ret;
    }

    if (!test) {
        var int = setInterval(function () {
            if (test) {
                clearInterval(int);
            }
        }, 1000);
    }
}

try {
    alert("Running!");
browser.runtime.onMessage.addListener(function (req) {
    alert(JSON.stringify(req));
    if (req.protocol == Messages.protocols.GET_TEAM_COUNT) {
        getTeamCount();
    }
});
} catch (e) {
    alert(e);
}

// https://teams.microsoft.com/_#/school