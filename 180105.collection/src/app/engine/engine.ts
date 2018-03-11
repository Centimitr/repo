import {Vendor} from './vendor';
import {Storage} from './storage';
import {Strategy} from './strategy';

type Task = (Engine) => Promise<void>

class Engine {
    vendor = new Vendor()
    storage = new Storage()
    strategy = new Strategy(this.vendor, this.storage)
    queue: Task[] = []

    add(t: Task) {
        this.queue.push(t)
    }

    async run() {
        for (let i = 0; i < this.queue.length; i++) {
            const t = this.queue[i]
            await t(this)
        }
    }
}

export {
    Engine
}
