// SERVER
const Mouse = require('./mouse');
const WebSocket = require('ws');
const bonjour = require('bonjour')()
const wss = new WebSocket.Server({port: 6138});
// noinspection JSUnresolvedFunction
bonjour.publish({name: 'Remote Browser Service', type: 'com.devbycm.remotebrowser', port: 6138})
// setInterval(() => {
// noinspection JSUnresolvedFunction
bonjour.find({type: 'com.devbycm.remotebrowser'}, function (service) {
    console.log('remotebrowserservice:', service)
})
// }, 5000)

let socket
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        if (message.startsWith('{"debug":true,"content":')) {
            const debugMsg = JSON.parse(message)
            const msg = debugMsg.content
            console.log(msg)
            return
        }
        console.log('RCVD: %s', message);
    });

    ws.send(JSON.stringify("Hello"));
    socket = ws
});
const cmd = (...args) => {
    if (socket) {
        socket.send(JSON.stringify(args))
    }
}
const inputCmd = e => {
    const buildEventString = function (e) {
        // deltaX Integer
// deltaY Integer
// wheelTicksX Integer
// wheelTicksY Integer
// accelerationRatioX Integer
// accelerationRatioY Integer
// hasPreciseScrollingDeltas Boolean
// canScroll Boolean
        const event = {
            type: e.type,
            key: e.key,
            code: e.code,
            // x: e.clientX,
            // y: e.clientY,
            button: ({0: 'left', 1: 'middle', 2: 'right'})[e.button],
            buttons: ({0: null, 1: 'left', 4: 'middle', 2: 'right'})[e.button],
            clickCount: 1,
            modifiers: [],
            deltaX: e.deltaX,
            deltaY: e.deltaY,
            delayZ: e.deltaZ,
            deltaMode: e.deltaMode
        }
        return JSON.stringify(event)
    }
    console.log(e)
    cmd('input', buildEventString(e))
}


// VIEW
const area = document.querySelector('#area')

document.onmousemove = e => {
    const [w, h] = [area.clientWidth, area.clientHeight]
    cmd('move', e.x, e.y, w, h)
}

document.onkeydown = e => {
    let sysCmd = false
    if (e.metaKey) {
        const map = {
            l: 'location',
            n: 'new',
            w: 'close'
        }
        const cmdName = map[e.key]
        if (cmdName) {
            cmd(cmdName)
            sysCmd = true
        }
    }
    if (!sysCmd) inputCmd(e)
}
document.onkeyup = e => inputCmd(e)
document.onmouseup = e => inputCmd(e)
document.onmousedown = e => inputCmd(e)
document.onclick = e => inputCmd(e)

class ScrollSmoother {

    constructor(cb) {
        this.cb = cb
        this.v = {
            x: 0,
            y: 0,
            z: 0
        }
    }

    canReduce() {
        const [x, y, z] = ['x', 'y', 'z'].map(c => {
            const old = this.v[c]
            const step = 6
            const change = old === 0 ? 0 : (old > 0 ? 1 : -1) * step
            const _new = old - change
            this.v[c] = _new * old > 0 ? _new : 0
        })
        return {
            x, y, z, can: x !== 0 || y !== 0 || z !== 0
        }
    }

    check() {
        const r = this.canReduce()
        console.log(r)
        if (r.can) {
            window.requestAnimationFrame(() => {
                this.cb({
                    deltaX: r.x,
                    deltaY: r.y,
                    deltaZ: r.z,
                })
                this.check()
            })
        }
    }

    scroll(x, y, z) {
        this.v.x += x
        this.v.y += y
        this.v.z += z
        this.check()
    }
}

const ss = new ScrollSmoother(e => inputCmd(Object.assign({type: 'wheel'}, e)))

document.onwheel = e => {
    // if (e.delta > 64) {
    //     ss.scroll(e.deltaX, e.deltaY, e.deltaZ)
    // } else {
    inputCmd({
        deltaX: e.deltaX,
        deltaY: e.deltaY,
        deltaZ: e.deltaZ,
        deltaMode: e.deltaMode
    })
    // }
}
