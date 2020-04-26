var stepInfo;

var Tasks = {};

Messages.on(Messages.protocols.STEP_INIT, function (msg) {
    stepInfo = msg.info;
    Tasks[msg.task][msg.step].execute(stepInfo);
});

function finish(info) {
    port.postMessage(Messages.form(Messages.protocols.STEP_END, info));
}