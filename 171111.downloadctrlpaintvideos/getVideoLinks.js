const Nightmare = require('nightmare')
const {Manager, Task} = require('./manager')
const pages = require('./pages')

const getTask = function(name, link, cb){
	return new Task(name, async () => {
		const MINUTE = 60*1000
		try{
			const s = await Nightmare({ show: false, x: 0, y: 0,  gotoTimeout: 16*MINUTE,  waitTimeout: 16*MINUTE, webPreferences: { images: false }})
				.goto(link)
				.evaluate(()=> document.querySelector('iframe')['src'])
				.end()
			cb(s)
		} catch(e) {
			console.warn('Err:', e)
		}
	})
}

const m = new Manager(16)

pages.forEach(p => {
	const vs = p.content.filter(l => l.video)
	vs.forEach(v => {
		const t = getTask(v.pathname, `http://www.ctrlpaint.com${v.pathname}`, src => v.src = src)
		m.add(t)
	})
})

m.run().then(()=>{
	console.log(JSON.stringify(pages))
})
