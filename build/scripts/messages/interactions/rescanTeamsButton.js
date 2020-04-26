alert("hi!")
try {
Messages.createPort();
} catch(e) {
    console.log(e);
}
alert("Created port");
Messages.send(Messages.protocols.REQUEST_TEAMS_RESCAN);