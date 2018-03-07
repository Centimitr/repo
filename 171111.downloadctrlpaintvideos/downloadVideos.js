const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const pages = require('./pagesWithVideoLinks')
const digit2 = n => n < 10? `0${n}`:`${n}`

// let cmd = `youtube-dl -o '%(id)s.%(ext)s' `
// cmd += pages.map(p => p.content).reduce((a,b)=>a.concat(b)).map(v => v.src).map(src => `'${src}'`).join(' ')
// console.log(cmd)

// ts.forEach(t => exec(`mv '${t.id}.mp4' '${t.filename}.mp4'`, { cwd: path.resolve('videos') }, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// }))

// 303
// 4.1, 8.3, 9.7, 13.2, 14.4, 17,1, 18.1, 19.1
// 

const {Manager, Task} = require('./manager')
const m = new Manager({limit:2, progressInfo: true})

pages.forEach(p => {
	const vs = p.content.filter(v => v.video)
	vs.forEach(v => {
		const n = `${digit2(v.index+1)} ${v.text}`
		const s = v.src
		const ps = path.resolve('video', `${p.heading}`)
		const cmd = `youtube-dl -o "${ps}/${n}.%(ext)s" "${s}"` 
		const dp = `${ps}/${n}.mp4`
		try{
			fs.accessSync(dp)
		} catch (e){
			try{
				const dp2 = `${ps}/${n}.mov`
				fs.accessSync(dp2)
			} catch (e){
				if (!n.includes('/')) {
					// console.log(p.index+1, v.index+1, n)
					const t = new Task(n, async () => {
						console.log(`ST: ${n}`)
						try{
							await exec(cmd)
						} catch (e){
							console.error('FAIL:', e)
						}
							console.log(`OK: ${n}`)
						})
					m.add(t)
				}
			}
			// console.error(e)
		}

		// const t = new Task(n, async () => {
		// 	console.log(`ST: ${n}`)
		// 	try{
		// 		await exec(cmd)
		// 	} catch (e){
		// 		console.error(e)
		// 	}
		// 	console.log(`OK: ${n}`)
		// })
	})
})

m.run()