class Manager{
	constructor(opt){
		opt = opt || {}
		this.q = []
		this.limit = opt.limit || 1
		this.progressInfo = opt.progressInfo && true
	}
	add(task){
		this.q.push(task)
	}
	run(){
		const fn = (resolve) => {
			const running = this.q.filter(t => t.running)
			const waiting = this.q.filter(t => !t.running&& !t.complete)
			const waitingN = waiting.length
			if(this.q.filter(t => !t.complete).length === 0){
				resolve()
			}
			const freeN = this.limit - running.length
			const toRunN = freeN < waitingN ? freeN: waitingN
			waiting.slice(0, toRunN).forEach(async t => {
				// console.log('Start:', t.name)
				await t.run()
				if(this.progressInfo) console.info(`=> ${this.q.filter(t => t.complete).length}/${this.q.length}`)
				fn(resolve)
			})
		}
		return new Promise((resolve)=> fn(resolve));
	}
}

class Task{
	constructor(name, fn){
		this.name = name
		this.fn = fn
		this.running = false
		this.complete = false
	}
	async run(){
		this.running = true
		await this.fn()
		this.running = false
		this.complete = true
	}
}

module.exports = {
	Manager,
	Task
}
