class Task {
    constructor(name) {
        this.tabs = [];
        this.steps = {};
        this.connected = 0;
        this.completed = 0;
        this.total = 0;
        this.progress = 0;
        this.name = name;
    }

    start() {

    }


    addTab(id) {
        this.tabs.push(id);
    }

    removeTab(id) {

    }

    assignTabStep(id, step, info) {
        var that = this;

        var ret = new Promise(function (resolve, reject) {
            MessageHandler.onLoad(id, function (id, port) {
                that.steps[id] = step;
    
                port.postMessage(Messages.form(
                    Messages.protocols.STEP_INIT,
                    {
                        "task": that.name,
                        "step": step.step,
                        "info": info
                    }
                ));
    
                port.onMessage.addListener(function (msg) {
                    if (msg.protocol == Messages.protocols.STEP_END) {
                        that.steps[id].onFinish(msg.message);
                        that.steps[id] = undefined;
                    }
                });
    
                resolve();
            });
        });

        return ret;
    }
}

class Step {
    constructor(step) {
        this.step = step;
    }

    onFinish(info) {

    }
}