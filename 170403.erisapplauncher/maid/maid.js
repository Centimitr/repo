class MaidConfig {
    constructor() {
        this.maxRunningTasks = 5;
        this.defaultPath = '/Users/shixiao/Eris';
        this.port = 4569;
    }
}

class Maid {
    constructor(config) {
        this.config = Object.assign(new MaidConfig(), config);
        this.q = [];
    }

    get() {
        return this.q;
    }

    add(task) {
        const exportAs = async (task, path) => {
            const url = new URL(`http://localhost:${this.config.port}/pack`);
            url.searchParams.append('path', task.dest);
            url.searchParams.append('dst', path);
            await fetch(url);
        };
        this.q.push(task);
        task.onCompleted(() => this.start());
        task.onCompleted(() => exportAs(task, this.config.defaultPath));
    }

    start() {
        const running = this.q.filter(t => t.isRunning());
        const waiting = this.q.filter(t => t.isWaiting());
        const availableNum = this.config.maxRunningTasks - running.length;
        if (availableNum > 0) {
            waiting.slice(0, availableNum).forEach(t => t.start());
        }
    }
}

module.exports = Maid;
