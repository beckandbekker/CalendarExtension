class Task {
    constructor() {
        this.tabs = [];
        this.steps = {};
        this.connected = 0;
        this.completed = 0;
        this.total = 0;
        this.progress = 0;
    }

    start() {

    }


    addTab(id) {
        this.tabs.push(id);
    }

    removeTab(id) {

    }

    assignTabStep(id, step, info) {
        var ret = new Promise();

        MessageHandler.onLoad(id, function (id, port) {
            this.steps[id] = step;

            port.postMessage(Messages.form(
                Messages.protocols.STEP_INIT,
                {
                    "script": step.script,
                    "info": info
                }
            ));

            port.onMessage.addListener(function (msg) {
                if (msg.protocol == Messages.protocols.STEP_END) {
                    this.steps[id].onFinish(msg.info);
                    this.steps[id] = undefined;
                }
            });

            ret.resolve();
        });

        return ret;
    }
}

class Step {
    constructor(script) {
        this.script = script;
    }

    onFinish(info) {

    }
}