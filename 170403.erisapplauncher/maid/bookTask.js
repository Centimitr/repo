const path = require('path');

class BookTask {
    constructor(url, name, total) {
        this.url = url;
        this.name = name;
        this.total = total;
        this.dest = './';
        this._complete = false;
        this._start = false;
        this._onCompleted = [];
        this.completedNum = 0;
        this.fn = null;
        const c = require('./x');
        const progressNotifyKey = this.url;
        c.on(progressNotifyKey, () => {
            this.completedNum++;
            console.log(name, `progress: [${this.completedNum}/${this.total}]`);
        });
    }

    transform() {
        this.Name = this.name;
        this.Author = '';
        this.Publisher = 'Anonymous';
        this.Pages = [];
        (Array(this.total)).fill(1).map((v, i) => i).map(i => `${i + 1}.webp`).forEach(name => this.Pages.push({Locator: name}));
    };

    setDest(parent) {
        this.dest = path.join(parent, this.name);
    }

    setFn(fn) {
        this.fn = fn;
    }

    start() {
        console.log(name, 'start!');
        this._start = true;
        if (this.fn) {
            this.fn(this).then(() => this.complete());
        } else {
            console.error('BookTask: no fn specified.');
        }
    }

    isRunning() {
        return this._start;
    }

    complete() {
        if (!this._completed) {
            this._completed = true;
            this._start = false;
            this.completedNum = this.total;
            if (this._onCompleted) {
                this._onCompleted.forEach(fn => fn(this));
            }
            return true;
        }
    }

    isCompleted() {
        return this._completed;
    }

    isWaiting() {
        return !(this.isRunning() || this.isCompleted());
    }

    onCompleted(cb) {
        this._onCompleted.push(cb);
    }
}

module.exports = BookTask;