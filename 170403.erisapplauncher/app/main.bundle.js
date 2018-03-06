webpackJsonp([1,4],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_scale__ = __webpack_require__(93);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let cnt = 0;
const pt = v => console.log(cnt++, v);
class ConfigItem {
    constructor(v) {
        this.listeners = [];
        this._lock = false;
        this.value = v;
    }
    set(v) {
        if (this._lock)
            return false;
        const old = this.value;
        if (old !== v) {
            this.value = v;
            setTimeout(() => {
                this.listeners.forEach(cb => cb(this.value, old));
            }, 0);
        }
        return true;
    }
    get() {
        return this.value;
    }
    is(v) {
        return this.value === v;
    }
    lock() {
        this._lock = true;
    }
    unlock() {
        this._lock = false;
    }
    clear() {
        this.listeners = [];
    }
    change(cb) {
        this.listeners.push(cb);
    }
    toValue() {
        return this.value;
    }
    toString() {
        return this.toValue().toString();
    }
}
/* unused harmony export ConfigItem */

class ConfigRangedItem extends ConfigItem {
    constructor(v, min, max) {
        super(v);
        [this.min, this.max] = [min, max];
    }
    setRange(min, max) {
        if (min >= max)
            console.error('min should be smaller than max:', min, max);
        [this.min, this.max] = [min, max];
        if (this.value < this.min)
            this.set(this.min);
        else if (this.value > this.max)
            this.set(this.max);
    }
    inRange(v) {
        return this.min <= v && v <= this.max;
    }
    set(v) {
        if (this.inRange(v))
            return super.set(v);
        else
            return false;
    }
}
/* unused harmony export ConfigRangedItem */

let Config = Config_1 = class Config {
    constructor() {
        this.recentlyEnjoyedLen = 10;
        this.scrollDirection = true;
        // appearance
        this.ui = {
            view: {
                before: 5,
                after: 0,
                eachAfter: 5,
                zoomUnit: 5
            }
        };
        this.pinch = new ConfigItem(1);
        this.scale = new ConfigItem(Config_1.SCALE_DEFAULT);
        // view
        this.view = new ConfigItem(Config_1.VIEW_SINGLE_PAGE);
        // mixed
        // whenSinglePageNotFullHeight(v: any) {
        //   if (this.isSinglePage() && !this.isFullHeight()) return v;
        // }
    }
    clear() {
        this.pinch.clear();
        this.view.clear();
    }
    // mode
    // mode = new ConfigItem<number>(Config.MODE_DEFAULT);
    // static MODE_DEFAULT: number = 0;
    // static MODE_FULL_HEIGHT: number = 1;
    // static MODE_FULL_WIDTH: number = 2;
    // static MODE_ALL: number[] = [Config.MODE_FULL_HEIGHT, Config.MODE_DEFAULT, Config.MODE_FULL_WIDTH];
    // scale
    // defaultScale: number = 150;
    // scale = new ConfigRangedItem(this.defaultScale, 100, 100000);
    // private _onSetScaleConstraint: Function[] = [];
    // onSetScaleConstraint(cb: Function) {
    //   this._onSetScaleConstraint.push(cb);
    // }
    // setScaleConstraint(book: Book, reader: HTMLElement, viewers: QueryList<ViewerComponent>) {
    //   if (book.meta.Pages.length && viewers.length) {
    //     const vw = Math.max(...viewers.map(v => v.elm.offsetWidth));
    //     const vh = Math.max(...viewers.map(v => v.elm.offsetHeight));
    // const imgWs = viewers.map(v => v.oriWidth).filter(v => v);
    // const imgHs = viewers.map(v => v.oriHeight).filter(v => v);
    // if (!imgWs.length || !imgHs.length) return;
    // const MIN_HEIGHT_PROPORTION = 65;
    // const MIN_WIDTH_PROPORTION = 30;
    // this.scale.setRange(100 * 375 / reader.offsetHeight, 100 * reader.offsetWidth / Math.min(...imgWs));
    // this._onSetScaleConstraint.forEach(cb => cb(this.scale.min, this.scale.max));
    // }
    // }
    // isFullWidth(): boolean {
    //   return this.mode.is(Config.MODE_FULL_WIDTH);
    // }
    //
    // whenFullWidth(v: any): boolean {
    //   if (this.isFullWidth()) {
    //     return v;
    //   }
    // }
    //
    // whenNotFullWidth(v: any): boolean {
    //   if (!this.isFullWidth()) {
    //     return v;
    //   }
    // }
    //
    isMaxlHeight() {
        return this.scale.is(Config_1.SCALE_MAXHEIGHT);
    }
    isContinuousScroll() {
        return this.view.get() === Config_1.VIEW_CONTINUOUS_SCROLL;
    }
    whenContinuousScroll(v) {
        if (this.isContinuousScroll()) {
            return v;
        }
    }
    isSinglePage() {
        return this.view.is(Config_1.VIEW_SINGLE_PAGE);
    }
};
// scale
Config.SCALE_DEFAULT = new __WEBPACK_IMPORTED_MODULE_1__image_scale__["a" /* Scale */](null, 100, null, 150);
Config.SCALE_MAXHEIGHT = new __WEBPACK_IMPORTED_MODULE_1__image_scale__["a" /* Scale */](null, 100, null, 100);
Config.SCALE_FULLWIDTH = new __WEBPACK_IMPORTED_MODULE_1__image_scale__["a" /* Scale */](100, 100, null, null);
Config.SCALE_ALL = [Config_1.SCALE_MAXHEIGHT, Config_1.SCALE_DEFAULT, Config_1.SCALE_FULLWIDTH];
Config.VIEW_CONTINUOUS_SCROLL = 0;
Config.VIEW_SINGLE_PAGE = 1;
Config.VIEW_ALL = [Config_1.VIEW_CONTINUOUS_SCROLL, Config_1.VIEW_SINGLE_PAGE];
Config = Config_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
], Config);

var Config_1;
//# sourceMappingURL=config.service.js.map

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AppStorageValue {
    constructor(k, driver) {
        this.k = k;
        this.driver = driver;
        this.cached = false;
        this._onChange = [];
    }
    get(defaultValue) {
        if (!this.cached) {
            this.v = this.driver.read(this.k, defaultValue);
            this.cached = true;
        }
        return this.v;
    }
    set(v) {
        const old = this.v;
        this.v = v;
        this.cached = true;
        this.driver.write(this.k, v);
        if (old !== v) {
            this._onChange.forEach(cb => cb(v, old));
        }
    }
    onChange(cb) {
        this._onChange.push(cb);
    }
    clearCache() {
        this.v = null;
        this.cached = false;
    }
}
/* unused harmony export AppStorageValue */

class AppStorage {
    constructor() {
        this.m = new Map();
        this.s = window.localStorage;
    }
    write(key, value) {
        return this.s.setItem(key, JSON.stringify(value));
    }
    read(key, defaultValue = null) {
        const v = this.s.getItem(key);
        return JSON.parse(v !== null ? v : typeof defaultValue === 'string' ? defaultValue : JSON.stringify(defaultValue));
    }
    get(key) {
        const exists = this.m.has(key);
        if (!exists) {
            this.m.set(key, new AppStorageValue(key, this));
        }
        return this.m.get(key);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AppStorage;

//# sourceMappingURL=storage.js.map

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__time__ = __webpack_require__(95);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class RustyLock {
    constructor() {
        this.finishTime = 0;
    }
    lock(interval) {
        this.finishTime = Date.now() + interval;
    }
    run(cb) {
        if (Date.now() > this.finishTime) {
            cb();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["e"] = RustyLock;

class Checker {
    constructor(freq) {
        this.freq = freq;
    }
    check(checkFn, cb, times = -1) {
        const call = () => {
            if (checkFn()) {
                if (times > 0) {
                    times--;
                }
                cb();
                if (times === 0) {
                    this.clear();
                }
            }
        };
        call();
        this.timer = setInterval(() => {
            call();
        }, this.freq);
    }
    clear() {
        clearInterval(this.timer);
    }
}
/* unused harmony export Checker */

class ABMap {
    constructor(enumArr) {
        this.mapA = new Map();
        this.mapB = new Map();
        if (enumArr) {
            enumArr.forEach((item, i) => this.set(i, item));
        }
    }
    set(a, b) {
        this.mapA.set(a, b);
        this.mapB.set(b, a);
    }
    getA(b) {
        return this.mapB.get(b);
    }
    getB(a) {
        return this.mapA.get(a);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ABMap;

class Semaphore {
    constructor(permits) {
        this.permits = permits;
        this.initial = permits;
    }
    set(p) {
        this.permits = p;
    }
    reset() {
        return this.permits = this.initial;
    }
    get() {
        return this.permits;
    }
    wait(success, error) {
        if (this.permits > 0) {
            success && success();
            this.permits--;
            return true;
        }
        else {
            error && error();
            return false;
        }
    }
    release() {
        this.permits++;
        return this.permits;
    }
}
/* unused harmony export Semaphore */

class Change {
    constructor(initial) {
        this.v = initial;
    }
    changed(n) {
        if (n !== this.v) {
            this.v = n;
            return true;
        }
        return false;
    }
}
/* unused harmony export Change */

class LRU {
    constructor(q, size, cmp) {
        this.q = q;
        this.size = size;
        this.cmp = cmp;
        this.checkSize();
    }
    checkSize() {
        this.q.splice(this.size);
    }
    add(v) {
        this.q = this.q.filter(item => !this.cmp(v, item));
        this.q.unshift(v);
        this.checkSize();
        return this.get();
    }
    get() {
        return this.q;
    }
}
/* harmony export (immutable) */ __webpack_exports__["d"] = LRU;

class LatestRunner {
    constructor() {
        this.busy = false;
    }
    run(fn) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.busy) {
                this.busy = true;
                yield fn();
                if (this.wait) {
                    yield this.wait();
                    this.wait = null;
                }
                this.busy = false;
            }
            else {
                // console.log('busy so wait');
                this.wait = fn;
            }
        });
    }
    runp(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const fn = () => p;
            yield this.run(fn);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = LatestRunner;

class Timeout {
    constructor() {
        this.t = __WEBPACK_IMPORTED_MODULE_0__time__["a" /* time */].Now();
    }
    timeout(delay) {
        return new Promise(resolve => {
            const since = __WEBPACK_IMPORTED_MODULE_0__time__["a" /* time */].Since(this.t);
            const d = since > delay ? 0 : delay - since;
            setTimeout(() => {
                resolve();
            }, d);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = Timeout;

//# sourceMappingURL=util.js.map

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoverService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

const electron = window['require']('electron');
const { getCurrentWindow } = electron.remote;
const forEach = (obj) => {
    return Object.keys(obj).map(k => ({ k: k, v: obj[k] }));
};
let CoverService = class CoverService {
    constructor(z) {
        this.z = z;
        this.backdropShow = false;
        this.states = {
            about: false,
            preferences: false,
        };
        this.r = fn => {
            this.z.run(fn);
        };
    }
    _show(name) {
        this.r(() => {
            getCurrentWindow().show();
            this.backdropShow = true;
            const showing = forEach(this.states).filter(kv => kv.v).pop();
            let timeout = 0;
            if (showing && showing.k != name) {
                this.states[showing.k] = false;
                timeout = 150;
            }
            setTimeout(() => this.states[name] = true, timeout);
        });
    }
    showAbout() {
        this._show('about');
    }
    showPreferences() {
        this._show('preferences');
    }
    dismissAll() {
        this.r(() => {
            Object.keys(this.states).forEach(k => this.states[k] = false);
            this.backdropShow = false;
        });
    }
};
CoverService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* NgZone */]) === "function" && _a || Object])
], CoverService);

var _a;
//# sourceMappingURL=cover.service.js.map

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cover_cover_layer_cover_service__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Menu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MenuItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return alwaysOnTopItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMenu; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


const electron = window['require']('electron');
const { app, Menu, MenuItem, BrowserWindow } = electron.remote;
const process = window['process'];
const alwaysOnTopItem = {
    label: 'Always on Top',
    type: 'checkbox',
    checked: false,
    click(item, win) {
        win.setAlwaysOnTop(!win.isAlwaysOnTop());
        item.checked = win.isAlwaysOnTop();
    }
};
const getTemplate = function (c) {
    const template = [
        {
            label: 'File',
            submenu: []
        }, {
            label: 'Catalogue',
            submenu: []
        }, {
            label: 'View',
            submenu: []
        },
        {
            role: 'window',
            submenu: [
                {
                    role: 'minimize'
                },
                {
                    role: 'close'
                }
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    // label: 'Learn More',
                    // click () {
                    //   electron.shell.openExternal('http://erisapp.com');
                    // }
                    // }, {
                    //   label: 'Credits',
                    //   click(){
                    //     electron.shell.openExternal('http://erisapp.com/credits');
                    //   }
                    // }, {
                    label: 'Feedback',
                    click() {
                        electron.shell.openExternal('mailto:centimitr@gmail.com?subject=[Feedback] &body=Thank you for your feedback!');
                    }
                }, {
                    label: 'Feature Request',
                    click() {
                        electron.shell.openExternal('mailto:centimitr@gmail.com?subject=[Feature Request] &body=Thank you for your feedback!');
                    }
                }
            ]
        }
    ];
    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                {
                    label: `About ${app.getName()}`,
                    click() {
                        c.showAbout();
                    }
                }, {
                    label: `Preferences...`,
                    accelerator: 'CmdOrCtrl+,',
                    click() {
                        c.showPreferences();
                    }
                }, {
                    type: 'separator'
                },
                {
                    role: 'services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    role: 'hide'
                },
                {
                    role: 'hideothers'
                },
                {
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit'
                }
            ]
        });
        // Window menu.
        template[4].submenu = [
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            },
            {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            }, {
                type: 'separator'
            }, {
                role: 'togglefullscreen'
            }, {
                label: 'Zoom',
                accelerator: 'Ctrl+Cmd+=',
                role: 'zoom'
            }, {
                label: 'Center',
                click(item, win) {
                    win.center();
                }
            }, alwaysOnTopItem, {
                type: 'separator'
            }, {
                label: 'Background',
                enabled: false
            }, {
                label: 'Light',
                type: 'radio',
                click(item, win) {
                    document.body.style.backgroundColor = null;
                    win.setVibrancy('light');
                }
            }, {
                label: 'Dark',
                type: 'radio',
                click(item, win) {
                    win.setVibrancy('medium-light');
                    document.body.style.backgroundColor = 'rgba(0,0,0,.7)';
                }
            }, {
                label: 'Book Paper',
                type: 'radio',
                click() {
                    document.body.style.backgroundColor = '#f8f4ea';
                }
            }, {
                label: 'Silver Gray',
                type: 'radio',
                click() {
                    document.body.style.backgroundColor = '#dedede';
                }
            }, {
                label: 'Deep Black',
                type: 'radio',
                click() {
                    document.body.style.backgroundColor = '#171717';
                }
            }, {
                type: 'separator'
            }, {
                label: 'Bring All to Front',
                role: 'front'
            }
        ];
        if (1) {
            template[4].submenu.push({
                label: 'Developer Tools',
                accelerator: 'Cmd+Alt+I',
                role: 'toggledevtools'
            });
        }
    }
    return Menu.buildFromTemplate(template);
};

let AppMenu = class AppMenu {
    constructor(c) {
        this.c = c;
        this.current = getTemplate(this.c);
    }
    get() {
        return this.current;
    }
    getSubMenu(index) {
        return this.current.items[index].submenu;
    }
    file() {
        return this.getSubMenu(1);
    }
    catalogue() {
        return this.getSubMenu(2);
    }
    view() {
        return this.getSubMenu(3);
    }
    set() {
        Menu.setApplicationMenu(this.current);
    }
    reset() {
        this.current = getTemplate(this.c);
        this.set();
    }
};
AppMenu = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cover_cover_layer_cover_service__["a" /* CoverService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cover_cover_layer_cover_service__["a" /* CoverService */]) === "function" && _a || Object])
], AppMenu);

var _a;
//# sourceMappingURL=menu.js.map

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__range__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_service__ = __webpack_require__(17);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const clearCache = window['require']('electron').webFrame.clearCache;
const createImageBitmap = window['createImageBitmap'];
const fetch = function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield window.fetch(url);
        const img = yield res.blob();
        return yield createImageBitmap(img);
    });
};
const bitmapToCanvas = function (ib) {
    const canvas = document.createElement('canvas');
    canvas.height = ib.height;
    canvas.width = ib.width;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(ib, 0, 0);
    ib.close();
    return canvas;
};
const px = function (v) {
    return v + 'px';
};
let ImageComponent = class ImageComponent {
    constructor(elm, config) {
        this.config = config;
        this.showing = false;
        this.showLock = false;
        this.reject = false;
        this.elm = elm.nativeElement;
        this.setHeight(375);
        this.config.scale.change(() => this.resize());
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = this.elm.querySelector('.loading');
        });
    }
    cache() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.reject = false;
                if (!this.canvas) {
                    let ib = yield fetch(this.src);
                    if (this.reject) {
                        return;
                    }
                    this.canvas = bitmapToCanvas(ib);
                    ib = null;
                    this.size = { w: this.canvas.width, h: this.canvas.height };
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    paint() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.showing && !this.showLock) {
                this.showLock = true;
                yield this.cache();
                if (this.reject)
                    return;
                this.resize(false);
                this.elm.appendChild(this.canvas);
                this.canvas.style.boxShadow = '0 0 12px 4px rgba(0,0,0,.382)';
                this.canvas.style.border = '1px solid rgba(0,0,0,.382)';
                this.showing = true;
                this.loading.classList.add('hide');
                this.showLock = false;
            }
        });
    }
    resize(checkOverflow = true) {
        if (!this.canvas)
            return;
        try {
            const p = this.elm.parentNode.parentNode;
            const mode = this.config.scale.get();
            let s = mode.calc({
                w: p.offsetWidth,
                h: p.offsetHeight
            }, this.size);
            this.canvas.style.zoom = s;
            this.setHeight(this.size.h * s);
            if (checkOverflow)
                this.checkOverflow();
        }
        catch (e) {
            console.warn(e);
            // this catch is because when submenu changing, parentNode may be null
        }
    }
    checkOverflow() {
        try {
            if (this.config.isSinglePage()) {
                const p = this.elm.parentNode.parentNode;
                const threshold = p.clientHeight - window.innerHeight * (5 + 5) / 100;
                const shouldCenter = threshold > this._height;
                if (shouldCenter) {
                    const offset = (threshold - this._height) / 2;
                    this.elm.style.marginTop = px(offset);
                    return;
                }
            }
            this.elm.style.marginTop = null;
        }
        catch (e) {
        }
    }
    clear() {
        this.reject = true;
        if (this.canvas) {
            const parent = this.canvas.parentNode;
            if (parent)
                parent.removeChild(this.canvas);
            this.showing = false;
            this.loading.classList.remove('hide');
            this.canvas = null;
        }
    }
    show() {
        this.checkOverflow();
        this.elm.style.display = 'flex';
        return this;
    }
    hide() {
        this.elm.style.display = 'none';
        return this;
    }
    distance() {
        try {
            const min = this.elm.offsetTop - this.elm.offsetParent.clientHeight;
            const max = this.elm.offsetTop + this.elm.offsetHeight;
            return new __WEBPACK_IMPORTED_MODULE_1__range__["a" /* Range */](min, max).distance(this.elm.offsetParent.scrollTop);
        }
        catch (e) {
            console.error(e);
        }
    }
    ratio() {
        const r = this.elm.getBoundingClientRect();
        if (!this.elm.offsetParent) {
            return 0;
        }
        const pr = this.elm.offsetParent.getBoundingClientRect();
        const xr = new __WEBPACK_IMPORTED_MODULE_1__range__["a" /* Range */](pr.left, pr.right);
        const yr = new __WEBPACK_IMPORTED_MODULE_1__range__["a" /* Range */](pr.top, pr.bottom);
        const w = xr.near(r.right) - xr.near(r.left);
        const h = yr.near(r.bottom) - yr.near(r.top);
        const cw = Math.min(r.width, pr.width);
        const ch = Math.min(r.height, pr.height);
        return (w * h) / (cw * ch);
    }
    inView() {
        return this.distance() === 0;
    }
    setHeight(h) {
        this._height = h;
        this.elm.style.height = px(h);
    }
    scrollTo() {
        this.elm.scrollIntoView(true);
    }
    ngOnDestroy() {
        this.clear();
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Input */])(),
    __metadata("design:type", String)
], ImageComponent.prototype, "src", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Input */])(),
    __metadata("design:type", Number)
], ImageComponent.prototype, "page", void 0);
ImageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'cm-image',
        template: __webpack_require__(176),
        styles: [__webpack_require__(162)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* Config */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* Config */]) === "function" && _b || Object])
], ImageComponent);

var _a, _b;
//# sourceMappingURL=image.component.js.map

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const checkNum = function (v) {
    return v || v === 0;
};
class Range {
    constructor(i, a) {
        [this.min, this.max] = [i, a];
    }
    x(n) {
        let min, max;
        if (this.min !== null && n !== null)
            min = this.min * n;
        if (this.max !== null && n !== null)
            max = this.max * n;
        return new Range(min, max);
    }
    cmb(r) {
        let { min, max } = this;
        if (r.min > min || !checkNum(min))
            min = r.min;
        if (r.max < max || !checkNum(max))
            max = r.max;
        return new Range(min, max);
    }
    between(v) {
        const r = 0;
        if (checkNum(this.max) && v >= this.max)
            return 1;
        else if (checkNum(this.min) && v <= this.min)
            return -1;
        else
            return 0;
    }
    near(v) {
        switch (this.between(v)) {
            case 0:
                return v;
            case 1:
                return this.max;
            case -1:
                return this.min;
        }
    }
    distance(v) {
        switch (this.between(v)) {
            case 0:
                return 0;
            case 1:
                return v - this.max;
            case -1:
                return v - this.min;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Range;

//# sourceMappingURL=range.js.map

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const qs = __webpack_require__(170);
const { ipcRenderer } = window['require']('electron');
class Args {
    constructor() {
        this.sema = 0;
        this._onPath = [];
        this._promise = new Promise(resolve => this._resolve = resolve);
    }
    check() {
        if (this._resolve && this.sema >= 2) {
            this._resolve();
        }
    }
    wait() {
        return this._promise;
    }
    onPath(fn) {
        this._onPath.push(fn);
    }
    execOnPath() {
        this._onPath.forEach(fn => fn(this.path));
    }
}
/* unused harmony export Args */

const args = new Args();
ipcRenderer.on('path', (event, message) => {
    console.warn('PATH:', message);
    args.path = message;
    args.execOnPath();
    args.sema++;
    args.check();
});
ipcRenderer.on('port', (event, message) => {
    console.warn('PORT:', message);
    args.port = message;
    args.sema++;
    args.check();
});
/* harmony default export */ __webpack_exports__["a"] = args;
//# sourceMappingURL=args.js.map

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_args__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_get__ = __webpack_require__(94);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const getSubBookNames = function (pms) {
    const m = new Map();
    pms.forEach(pm => m.set(pm.SubBook, 1));
    return Array.from(m.keys()).sort((a, b) => a.length - b.length);
};
const { webFrame } = window['require']('electron');
class Book {
    constructor(path, config, s) {
        this.config = config;
        this.s = s;
        this._onPage = [];
        this._onSubBook = [];
        this.locator = path;
    }
    get current() {
        return this._current;
    }
    set current(page) {
        const old = this._current;
        this._current = page;
        if (old !== page) {
            this._onPage.forEach(cb => cb(page, old));
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield __WEBPACK_IMPORTED_MODULE_0__lib_args__["a" /* default */].wait();
            const data = yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_get__["a" /* get */])(`https://localhost:${__WEBPACK_IMPORTED_MODULE_0__lib_args__["a" /* default */].port}/book`, {
                locator: this.locator,
                keys: this.s.get('preferences.config').get().rarPasswords
            });
            this.meta = yield data.json();
            if (!this.meta.Pages || !this.meta.Pages.length) {
                return 'Sorry, no book found in this folder.';
            }
            this.subBooks = getSubBookNames(this.meta.Pages);
            this.setSubBook(this.subBooks[0]);
        });
    }
    onSubBook(fn) {
        this._onSubBook.push(fn);
    }
    setSubBook(name) {
        webFrame.clearCache();
        this.curSubBook = name;
        this.current = 1;
        this.total = this.pages().length;
        this._onSubBook.forEach(fn => fn());
    }
    pages() {
        return this.meta && this.meta.Pages ? this.meta.Pages.filter(pm => pm.SubBook === this.curSubBook) : [];
    }
    checkPage(page) {
        return page > 0 && page <= this.total;
    }
    updateCurrent(page) {
        const ok = this.checkPage(page);
        if (ok) {
            this.current = page;
        }
        return ok;
    }
    bind(imgs) {
        this.imgs = imgs;
    }
    go(pageOrOffset, relative = false) {
        const page = relative ? this.current + pageOrOffset : pageOrOffset;
        const ok = this.checkPage(page);
        if (ok) {
            if (this.config.isSinglePage()) {
                this.current = page;
            }
            else if (this.config.isContinuousScroll()) {
                const img = this.imgs[page - 1];
                img.scrollTo();
            }
        }
        return ok;
    }
    prev(page) {
        return this.go((page || 0) - 1, !page);
    }
    next(page) {
        return this.go((page || 0) + 1, !page);
    }
    getPageFilePath(imgLocator) {
        const url = new URL(`https://localhost:${__WEBPACK_IMPORTED_MODULE_0__lib_args__["a" /* default */].port}/book/page`);
        url['searchParams'].append('locator', this.locator);
        url['searchParams'].append('page', imgLocator);
        url['searchParams'].append('keys', this.s.get('preferences.config').get().rarPasswords);
        return url.href;
    }
    onPage(callback) {
        this._onPage.push(callback);
    }
    onPageRemove(callback) {
        this._onPage = this._onPage.filter(cb => cb !== callback);
    }
    hasPageLoaded() {
        return new Promise(resolve => this.pHasPageLoaded = resolve);
    }
    ensureHasPageLoaded() {
        if (this.pHasPageLoaded)
            this.pHasPageLoaded();
    }
    // last read
    getLastReadIndex() {
        return this.meta.Pages.map(pm => pm.Locator).indexOf(this.meta.LastRead);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Book;

//# sourceMappingURL=book.js.map

/***/ }),
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 78;


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(87);



// if (environment.production) {
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
// }
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_args__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_menu__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const electron = window['require']('electron');
const { webFrame } = electron;
const { dialog, getCurrentWindow, app } = electron.remote;
const ses = getCurrentWindow().webContents.session;
const getSize = () => new Promise(resolve => ses.getCacheSize(size => resolve(size)));
let AppComponent = class AppComponent {
    constructor(zone, title, m, s) {
        this.zone = zone;
        this.title = title;
        this.m = m;
        this.s = s;
        this.refresh = 0;
        webFrame.setZoomLevelLimits(1, 1);
        this.win = getCurrentWindow();
        const menu = new __WEBPACK_IMPORTED_MODULE_2__lib_menu__["b" /* Menu */]();
        const aotItem = new __WEBPACK_IMPORTED_MODULE_2__lib_menu__["c" /* MenuItem */](__WEBPACK_IMPORTED_MODULE_2__lib_menu__["d" /* alwaysOnTopItem */]);
        menu.append(aotItem);
        menu.refreshAOTChecked = () => aotItem.checked = this.win.isAlwaysOnTop();
        this.titleBarContextMenu = menu;
        ses.on('will-download', (event) => {
            event.preventDefault();
        });
        this.m.reset();
        const re = this.s.get('menu.recentlyEnjoyed');
        re.onChange(() => this.setFileMenu(re));
        this.setFileMenu(re);
    }
    setFileMenu(re) {
        // file menu
        const fm = this.m.file();
        fm.clear();
        fm.append(new __WEBPACK_IMPORTED_MODULE_2__lib_menu__["c" /* MenuItem */]({
            label: 'Open...',
            accelerator: 'CmdOrCtrl+O',
            enabled: true,
            click: () => this.zone.run(() => this.open())
        }));
        fm.append(new __WEBPACK_IMPORTED_MODULE_2__lib_menu__["c" /* MenuItem */]({
            label: 'Open URL...',
            accelerator: 'CmdOrCtrl+U',
            visible: false,
            enabled: false,
            click: () => this.zone.run(() => this.open())
        }));
        fm.append(new __WEBPACK_IMPORTED_MODULE_2__lib_menu__["c" /* MenuItem */]({
            label: 'Save As...',
            enabled: false,
            visible: false,
            accelerator: 'CmdOrCtrl+Shift+S',
            click() {
                console.log('SAVE AS.');
            }
        }));
        fm.append(new __WEBPACK_IMPORTED_MODULE_2__lib_menu__["c" /* MenuItem */]({ type: 'separator' }));
        fm.append(new __WEBPACK_IMPORTED_MODULE_2__lib_menu__["c" /* MenuItem */]({ type: 'separator' }));
        fm.append(new __WEBPACK_IMPORTED_MODULE_2__lib_menu__["c" /* MenuItem */]({ label: 'Recently Enjoyed', enabled: false }));
        re.get([]).map((item) => new __WEBPACK_IMPORTED_MODULE_2__lib_menu__["c" /* MenuItem */]({
            label: item.key,
            click: () => this.zone.run(() => this.path = item.value)
        })).map(item => fm.append(item));
        this.m.set();
    }
    ;
    whenOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            webFrame.clearCache();
            const ses = getCurrentWindow().webContents.session;
            yield new Promise(r => ses.clearCache(r));
        });
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield __WEBPACK_IMPORTED_MODULE_1__lib_args__["a" /* default */].wait();
            const path = __WEBPACK_IMPORTED_MODULE_1__lib_args__["a" /* default */].path;
            if (!path) {
                // await this.open();
            }
            else {
                this.path = path;
                yield this.whenOpen();
            }
            __WEBPACK_IMPORTED_MODULE_1__lib_args__["a" /* default */].onPath(path => {
                const shouldOpen = dialog.showMessageBox(getCurrentWindow(), {
                    type: 'question',
                    message: `File Open Request`,
                    detail: `Would you like to open '${path}'?`,
                    buttons: ['Yes', 'Cancel'],
                    cancelId: 1
                }) === 0;
                if (shouldOpen) {
                    this.zone.run(() => __awaiter(this, void 0, void 0, function* () {
                        this.path = path;
                        yield this.whenOpen();
                    }));
                }
            });
        });
    }
    onOk() {
        getCurrentWindow().show();
    }
    open(e) {
        return __awaiter(this, void 0, void 0, function* () {
            if (e) {
                dialog.showMessageBox(this.win.isVisible() ? this.win : null, {
                    type: 'warning',
                    message: e
                });
            }
            try {
                this.path = dialog.showOpenDialog({
                    properties: ['openFile', 'openDirectory', 'showHiddenFiles'],
                    filters: [
                        { name: 'Images', extensions: ['webp', 'jpg', 'png', 'gif', 'jpeg'] },
                        { name: 'Manga', extensions: ['eris'] },
                        { name: 'Archive', extensions: ['rar', 'zip'] },
                    ]
                }).pop();
                this.refresh++;
                yield this.whenOpen();
            }
            catch (e) {
            }
        });
    }
    getTitle() {
        return this.title.getTitle();
    }
    onContextMenu(e, titleBar) {
        const m = this.titleBarContextMenu;
        m.refreshAOTChecked();
        m.popup(this.win, { x: e.x, y: titleBar.offsetHeight / 2 });
    }
    zoom() {
        const w = this.win;
        return w.isMaximized() ? w.unmaximize() : w.maximize();
    }
    onDropBefore() {
        return false;
    }
    onDrop(e) {
        e.preventDefault();
        this.path = e.dataTransfer.files[0].path;
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* HostListener */])('window:dragover', ['$event']),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* HostListener */])('window:dragleave', ['$event']),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* HostListener */])('window:dragend', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppComponent.prototype, "onDropBefore", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* HostListener */])('window:drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppComponent.prototype, "onDrop", null);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(171),
        styles: [__webpack_require__(155)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* NgZone */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["d" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["d" /* Title */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__lib_menu__["a" /* AppMenu */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__lib_menu__["a" /* AppMenu */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__lib_storage__["a" /* AppStorage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__lib_storage__["a" /* AppStorage */]) === "function" && _d || Object])
], AppComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=app.component.js.map

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__trust_resource_url_pipe__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reader_reader_component__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_menu__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__image_image_component__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__scroll_scroll_component__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__config_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__asist_dot_dot_component__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__cover_cover_about_cover_about_component__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__cover_cover_preferences_cover_preferences_component__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__cover_cover_layer_cover_layer_component__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__cover_cover_layer_cover_service__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















let AppModule = class AppModule {
};
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__reader_reader_component__["a" /* ReaderComponent */],
            __WEBPACK_IMPORTED_MODULE_5__trust_resource_url_pipe__["a" /* TrustResourceUrlPipe */],
            __WEBPACK_IMPORTED_MODULE_9__image_image_component__["a" /* ImageComponent */],
            __WEBPACK_IMPORTED_MODULE_10__scroll_scroll_component__["a" /* ScrollComponent */],
            __WEBPACK_IMPORTED_MODULE_12__asist_dot_dot_component__["a" /* DotComponent */],
            __WEBPACK_IMPORTED_MODULE_13__cover_cover_about_cover_about_component__["a" /* CoverAboutComponent */],
            __WEBPACK_IMPORTED_MODULE_15__cover_cover_layer_cover_layer_component__["a" /* CoverLayerComponent */],
            __WEBPACK_IMPORTED_MODULE_14__cover_cover_preferences_cover_preferences_component__["a" /* CoverPreferencesComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_16__cover_cover_layer_cover_service__["a" /* CoverService */], __WEBPACK_IMPORTED_MODULE_7__lib_menu__["a" /* AppMenu */], __WEBPACK_IMPORTED_MODULE_8__lib_storage__["a" /* AppStorage */], __WEBPACK_IMPORTED_MODULE_11__config_service__["a" /* Config */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DotComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let DotComponent = class DotComponent {
    constructor(elm) {
        this.elm = elm.nativeElement;
    }
    ngOnInit() {
        let times = 0;
        this.timer = setInterval(() => {
            times++;
            const dots = (new Array(3))
                .fill(false).map((v, i) => i < times % 4)
                .map(v => `<span style="opacity: ${v ? 1 : 0}">.</span>`)
                .join('');
            this.elm.querySelector('span').innerHTML = dots;
        }, this.interval);
    }
    ngOnDestroy() {
        clearInterval(this.timer);
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Input */])(),
    __metadata("design:type", String)
], DotComponent.prototype, "word", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Input */])(),
    __metadata("design:type", Number)
], DotComponent.prototype, "interval", void 0);
DotComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'cm-dot',
        template: __webpack_require__(172),
        styles: [__webpack_require__(156)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* ElementRef */]) === "function" && _a || Object])
], DotComponent);

var _a;
//# sourceMappingURL=dot.component.js.map

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__credits__ = __webpack_require__(90);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoverAboutComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let CoverAboutComponent = class CoverAboutComponent {
    constructor() {
        this.creditShow = false;
        this.credits = [];
    }
    ngOnInit() {
        this.credits = __WEBPACK_IMPORTED_MODULE_1__credits__["a" /* default */];
    }
    showCredit() {
        this.creditShow = true;
    }
    hideCredit() {
        this.creditShow = false;
    }
    open(url) {
        window['require']('electron').shell.openExternal(url);
    }
};
CoverAboutComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'cover-about',
        template: __webpack_require__(173),
        styles: [__webpack_require__(158), __webpack_require__(157), __webpack_require__(159)]
    }),
    __metadata("design:paramtypes", [])
], CoverAboutComponent);

//# sourceMappingURL=cover-about.component.js.map

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const items = json['Items'];
const credits = Object.keys(items).map(k => items[k])
    .filter(c => c.license);
/* harmony default export */ __webpack_exports__["a"] = credits;
//# sourceMappingURL=credits.js.map

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cover_service__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoverLayerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let CoverLayerComponent = class CoverLayerComponent {
    constructor(s) {
        this.s = s;
    }
    ngOnInit() {
    }
};
CoverLayerComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'cover-layer',
        template: __webpack_require__(174),
        styles: [__webpack_require__(160)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cover_service__["a" /* CoverService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cover_service__["a" /* CoverService */]) === "function" && _a || Object])
], CoverLayerComponent);

var _a;
//# sourceMappingURL=cover-layer.component.js.map

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_storage__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoverPreferencesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


const equal = function (base, toCheck) {
    const keys = Object.keys(base);
    return keys.map(k => ({ k: k, v: base[k] }))
        .map(kv => toCheck[kv.k] === kv.v)
        .filter(v => v).length === keys.length;
};
const DEFAULT_CONFIG = {
    submitData: true,
    rarPasswords: '⑨ qwertyuiop 扶她奶茶'
};
let CoverPreferencesComponent = class CoverPreferencesComponent {
    constructor(s) {
        this.s = s;
        this._pc = this.s.get('preferences.config');
        this.c = this._pc.get(Object.assign({}, DEFAULT_CONFIG));
    }
    ngOnInit() {
    }
    save() {
        this.c.rarPasswords = this.c.rarPasswords.trim();
        this._pc.set(this.c);
    }
    canReset() {
        return !equal(DEFAULT_CONFIG, this.c);
    }
    reset() {
        this.c = Object.assign({}, DEFAULT_CONFIG);
        this.save();
    }
};
CoverPreferencesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'cover-preferences',
        template: __webpack_require__(175),
        styles: [__webpack_require__(161)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__lib_storage__["a" /* AppStorage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__lib_storage__["a" /* AppStorage */]) === "function" && _a || Object])
], CoverPreferencesComponent);

var _a;
//# sourceMappingURL=cover-preferences.component.js.map

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__range__ = __webpack_require__(54);

class Scale {
    constructor(xi, xa, yi, ya) {
        this.x = new __WEBPACK_IMPORTED_MODULE_0__range__["a" /* Range */](null, null);
        this.y = new __WEBPACK_IMPORTED_MODULE_0__range__["a" /* Range */](null, null);
        [this.x.min, this.x.max, this.y.min, this.y.max] = [xi, xa, yi, ya];
    }
    calc(parent, child) {
        const wsr = this.x.x(parent.w).x(1 / child.w);
        const hsr = this.y.x(parent.h).x(1 / child.h);
        const sr = wsr.cmb(hsr);
        const s = sr.near(100);
        return s / 100;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Scale;

//# sourceMappingURL=scale.js.map

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const get = function (url, params) {
    const u = new URL(url);
    for (let prop in params) {
        u['searchParams'].append(prop, params[prop]);
    }
    return fetch(u.href);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = get;

//# sourceMappingURL=get.js.map

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const time = {
    Second: 1000,
    Minute: 1000 * 60,
    Hour: 1000 * 60 * 60,
    Day: 1000 * 60 * 60 * 24,
    Now() {
        return Date.now();
    },
    Sleep(duration) {
        return new Promise(r => setTimeout(r, duration));
    },
    Since(time) {
        return Date.now() - time;
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = time;

//# sourceMappingURL=time.js.map

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return setTouchBar; });
/* unused harmony export TouchBarButton */
/* unused harmony export TouchBarColorPicker */
/* unused harmony export TouchBarGroup */
/* unused harmony export TouchBarLabel */
/* unused harmony export TouchBarPopover */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TouchBarSlider; });
/* unused harmony export TouchBarSpacer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TouchBarSegmentedControl; });
/* unused harmony export TouchBarScrubber */
const electron = window['require']('electron');
const { getCurrentWindow, TouchBar } = electron.remote;
const { TouchBarButton, TouchBarColorPicker, TouchBarGroup, TouchBarLabel, TouchBarPopover, TouchBarSlider, TouchBarSpacer, TouchBarScrubber, TouchBarSegmentedControl } = TouchBar;
const setTouchBar = function (args) {
    const win = getCurrentWindow();
    const touchBar = new TouchBar(args);
    win.setTouchBar(touchBar);
};

//# sourceMappingURL=touchbar.js.map

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_touchbar__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_util__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__book__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_menu__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_lib_storage__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








const fs = window['require']('fs');
const { dialog, BrowserWindow, getCurrentWindow, Menu, MenuItem } = window['require']('electron').remote;
let ReaderComponent = class ReaderComponent {
    constructor(zone, title, m, s, elm, config) {
        this.zone = zone;
        this.title = title;
        this.m = m;
        this.s = s;
        this.config = config;
        this.ok = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */]();
        this.fail = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */]();
        this.loadingShow = false;
        this.elm = elm.nativeElement;
    }
    ngOnChanges(changes) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((changes.path || changes.refresh) && this.path) {
                this.config.clear();
                this.book = null;
                this.loadingShow = true;
                const t = new __WEBPACK_IMPORTED_MODULE_2__lib_util__["c" /* Timeout */]();
                this.book = new __WEBPACK_IMPORTED_MODULE_3__book__["a" /* Book */](this.path, this.config, this.s);
                let e = yield this.book.init();
                if (e) {
                    this.fail.emit(e);
                    return;
                }
                this.ok.emit();
                yield this.book.hasPageLoaded();
                yield t.timeout(375);
                this.loadingShow = false;
                this.title.setTitle(this.book.meta.Name);
                // if (this.book.meta.Pages.length > 512) {
                //   alert('Now manga with more than 512 pages is not supported, the first 512 pages are displayed.');
                //   this.book.meta.Pages = this.book.meta.Pages.slice(0, 512);
                // }
                // turn to specific page
                setTimeout(() => {
                    if (this.book.meta.LastRead) {
                        const page = this.book.getLastReadIndex();
                        const shouldTurn = dialog.showMessageBox(getCurrentWindow(), {
                            type: 'question',
                            message: `Turn to Page${page}`,
                            detail: `The book is opened via page${page}, 'OK' to go that page rather than Page1.`,
                            buttons: ['Yes', 'Cancel'],
                            cancelId: 1
                        }) === 0;
                        if (shouldTurn) {
                            this.zone.run(() => this.book.go(page));
                        }
                    }
                }, 0);
                // scale and view
                const barViewMap = new __WEBPACK_IMPORTED_MODULE_2__lib_util__["a" /* ABMap */](__WEBPACK_IMPORTED_MODULE_4__config_service__["a" /* Config */].VIEW_ALL);
                const barScaleMap = new __WEBPACK_IMPORTED_MODULE_2__lib_util__["a" /* ABMap */](__WEBPACK_IMPORTED_MODULE_4__config_service__["a" /* Config */].SCALE_ALL);
                const setView = i => {
                    this.zone.run(() => {
                        this.config.view.set(barViewMap.getB(i));
                    });
                };
                const setScale = i => {
                    this.zone.run(() => {
                        this.config.scale.set(barScaleMap.getB(i));
                    });
                };
                // todo: pinch
                this.config.pinch.change(v => 0);
                // menu
                const re = this.s.get('menu.recentlyEnjoyed');
                re.set((new __WEBPACK_IMPORTED_MODULE_2__lib_util__["d" /* LRU */](re.get([]), this.config.recentlyEnjoyedLen, (a, b) => a.value === b.value)).add({
                    key: this.book.meta.Name || this.book.meta.Locator,
                    value: this.book.meta.Locator
                }));
                const vm = this.m.view();
                vm.clear();
                const append = (vm, ...itemsArr) => {
                    itemsArr.forEach(items => {
                        vm.append(new MenuItem({ type: 'separator' }));
                        items.forEach(item => vm.append(item));
                    });
                };
                const viewItems = ['Continuous Scroll', 'Single Page'].map((label, i) => new MenuItem({
                    label,
                    accelerator: `CmdOrCtrl+${i + 1}`,
                    type: 'radio',
                    click: () => setView(i),
                    checked: barViewMap.getA(this.config.view.get()) === i,
                }));
                const modeItems = ['Full Page', 'Default', 'Width FullFilled'].map((label, i) => new MenuItem({
                    label,
                    accelerator: `CmdOrCtrl+Alt+${i + 1}`,
                    type: 'radio',
                    click: () => setScale(i),
                    checked: barScaleMap.getA(this.config.scale.get()) === i
                }));
                const goItems = ['First Page', 'Previous Page', 'Next Page'].map((label, i) => new MenuItem({
                    label,
                    accelerator: [null, 'Left', 'Right'][i],
                    click: () => {
                        this.zone.run(() => {
                            switch (i) {
                                case 0:
                                    this.book.go(1);
                                    break;
                                case 1:
                                    this.onContextMenu();
                                    break;
                                case 2:
                                    this.onClick();
                                    break;
                            }
                        });
                    }
                }));
                append(vm, viewItems, modeItems, goItems);
                const cm = this.m.catalogue();
                cm.clear();
                const subBookItems = this.book.subBooks.map(name => new MenuItem({
                    label: '.'.includes(name) ? 'Default Book' : name,
                    type: 'radio',
                    click: () => this.zone.run(() => this.book.setSubBook(name)),
                    checked: this.book.curSubBook === name
                }));
                append(cm, [new MenuItem({
                        label: subBookItems.length > 1 ? 'multi-books inside' : 'no sub-book found',
                        enabled: false
                    })], subBookItems.length > 1 ? subBookItems : []);
                this.m.set();
                // const setZoomItemEnabled = (min: number, max: number) => {
                //   const unit = this.config.ui.view.zoomUnit;
                //   const cur = this.config.scale.get();
                //   const toMin = (100 - unit) / 100 * cur;
                //   const toMax = (100 + unit) / 100 * cur;
                //   const threshold = 5;
                //   // [zoomOutItem.enabled, zoomInItem.enabled] = [toMin - min <= threshold, max - toMax <= threshold];
                // };
                // this.config.scale.change(() => setZoomItemEnabled(this.config.scale.min, this.config.scale.max));
                // this.config.onSetScaleConstraint((min, max) => setZoomItemEnabled(min, max));
                // touchBar
                const getProgressStr = (current = this.book.current) => current + '/' + this.book.total;
                const lock = new __WEBPACK_IMPORTED_MODULE_2__lib_util__["e" /* RustyLock */]();
                let barProgLastValue;
                const slider = new __WEBPACK_IMPORTED_MODULE_1__lib_touchbar__["a" /* TouchBarSlider */]({
                    label: getProgressStr(),
                    value: this.book.current,
                    minValue: 1,
                    maxValue: this.book.total,
                    change: (current) => {
                        if (barProgLastValue !== current) {
                            barProgLastValue = current;
                            slider.label = getProgressStr(current);
                            this.zone.run(() => this.book.go(current));
                            lock.lock(250);
                        }
                    }
                });
                const viewCtrl = new __WEBPACK_IMPORTED_MODULE_1__lib_touchbar__["b" /* TouchBarSegmentedControl */]({
                    segments: [
                        { label: 'Scroll' },
                        { label: 'Single' },
                    ],
                    selectedIndex: barViewMap.getA(this.config.view.get()),
                    change: setView
                });
                const modeCtrl = new __WEBPACK_IMPORTED_MODULE_1__lib_touchbar__["b" /* TouchBarSegmentedControl */]({
                    segments: [
                        { label: 'Page' },
                        { label: 'Default' },
                        { label: 'Width' },
                    ],
                    selectedIndex: barScaleMap.getA(this.config.scale.get()),
                    change: setScale
                });
                this.book.onPage((current) => {
                    lock.run(() => {
                        slider.value = current;
                        slider.label = getProgressStr(current);
                    });
                });
                this.book.onSubBook(() => {
                    slider.maxValue = this.book.total;
                    slider.label = getProgressStr(this.book.current);
                });
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_touchbar__["c" /* setTouchBar */])([
                    viewCtrl,
                    slider,
                    // new TouchBarScrubber({
                    //   items: (new Array(this.book.total)).fill(1).map((v, i) => '' + i).map(i => ({label: i})),
                    //   highlight: index => console.log('touchBar scrubber:', index),
                    //   mode: 'free',
                    //   selectedStyle: 'outline',
                    // }),
                    modeCtrl,
                ]);
                // update menu and touchBar
                this.config.view.change(n => {
                    const index = __WEBPACK_IMPORTED_MODULE_4__config_service__["a" /* Config */].VIEW_ALL.indexOf(n);
                    viewItems.filter((item, i) => i === index).forEach(item => item.checked = true);
                    viewCtrl.selectedIndex = index;
                });
                this.config.scale.change(n => {
                    const index = __WEBPACK_IMPORTED_MODULE_4__config_service__["a" /* Config */].SCALE_ALL.indexOf(n);
                    modeItems.filter((item, i) => i === index).forEach(item => item.checked = true);
                    modeCtrl.selectedIndex = index;
                });
            }
        });
    }
    // setScaleConstraint() {
    //   this.config.setScaleConstraint(this.book, this.elm, this.viewers);
    // }
    // @HostListener('resize', ['$event']) onResize() {
    //   alert(1)
    // setTimeout(() => {
    //   this.setScaleConstraint();
    // }, 0);
    // }
    onClick() {
        if (this.loadingShow)
            return;
        this.config.scrollDirection = true;
        const ok = this.book.next();
        console.log(1, ok);
    }
    onContextMenu() {
        if (this.loadingShow)
            return;
        this.config.scrollDirection = false;
        const ok = this.book.prev();
        console.log(ok);
    }
    onWheel(e) {
        if (e.ctrlKey) {
            e.preventDefault();
            if (this.config.scale.is(__WEBPACK_IMPORTED_MODULE_4__config_service__["a" /* Config */].SCALE_DEFAULT)) {
                this.config.pinch.set(Math.exp(-e.deltaY / 100));
            }
            return;
        }
        this.config.scrollDirection = e.deltaY > 0;
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Input */])(),
    __metadata("design:type", String)
], ReaderComponent.prototype, "path", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Input */])(),
    __metadata("design:type", Number)
], ReaderComponent.prototype, "refresh", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ReaderComponent.prototype, "ok", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(),
    __metadata("design:type", Object)
], ReaderComponent.prototype, "fail", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* HostListener */])('window:keydown.pageDown', ['$event']),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* HostListener */])('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReaderComponent.prototype, "onClick", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* HostListener */])('window:keydown.pageUp', ['$event']),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* HostListener */])('contextmenu', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReaderComponent.prototype, "onContextMenu", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* HostListener */])('window:mousewheel', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReaderComponent.prototype, "onWheel", null);
ReaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'reader',
        template: __webpack_require__(177),
        styles: [__webpack_require__(163), __webpack_require__(165), __webpack_require__(164)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* NgZone */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["d" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["d" /* Title */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__lib_menu__["a" /* AppMenu */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__lib_menu__["a" /* AppMenu */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7_app_lib_storage__["a" /* AppStorage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_app_lib_storage__["a" /* AppStorage */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* ElementRef */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__config_service__["a" /* Config */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__config_service__["a" /* Config */]) === "function" && _f || Object])
], ReaderComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=reader.component.js.map

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_util__ = __webpack_require__(24);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const BACKWARD_RESERVE = 3;
const FORWARD_RESERVE = 6;
const NEXT_PRELOAD = 3;
class MinorQueue {
    constructor() {
        this.interrupt = false;
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.wait) {
                this.interrupt = true;
                return this.wait;
            }
        });
    }
    run(tasks) {
        return __awaiter(this, void 0, void 0, function* () {
            let resolve;
            this.interrupt = false;
            this.wait = new Promise(r => resolve = r);
            for (let i = 0; i < tasks.length; i++) {
                yield tasks[i];
                if (this.interrupt) {
                    break;
                }
            }
            resolve();
        });
    }
}
class CacheManager {
    // imgs: ImageComponent[];
    // queues
    // showQ: ImageComponent[];
    // cacheQ: ImageComponent[];
    constructor(config, book, imgs) {
        this.config = config;
        this.book = book;
        this.imgs = imgs;
        this.minor = new MinorQueue();
        this.latest = new __WEBPACK_IMPORTED_MODULE_0__lib_util__["b" /* LatestRunner */]();
    }
    getPreloadTasks(indexes) {
        const d = this.config.scrollDirection ? 1 : -1;
        const startPoint = d ? Math.max(...indexes) : Math.min(...indexes);
        let from = Math.max(0, startPoint + d);
        let to = Math.max(0, startPoint + d * NEXT_PRELOAD);
        if (to < from)
            [to, from] = [from, to];
        return this.imgs.slice(from, to).map(img => img.paint());
    }
    getCleanTasks(indexes) {
        const to = Math.max(0, Math.min(...indexes) - BACKWARD_RESERVE);
        const from = Math.max(...indexes) + FORWARD_RESERVE;
        return this.imgs.slice(0, to).concat(this.imgs.slice(from)).map(img => (() => __awaiter(this, void 0, void 0, function* () { return img.clear(); }))());
    }
    request(...indexes) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.latest.run(async () => {
            yield this.minor.stop();
            for (let i = 0; i < indexes.length; i++) {
                yield this.imgs[indexes[i]].paint();
                this.book.ensureHasPageLoaded();
            }
            let tasks = [];
            tasks = tasks.concat(this.getPreloadTasks(indexes), this.getCleanTasks(indexes));
            this.minor.run(tasks);
            // });
        });
    }
    debug() {
        setInterval(() => {
            console.clear();
            console.table(this.imgs.map((img, i) => ({ index: i, showing: img.showing ? '*' : undefined })));
        }, 500);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CacheManager;

//# sourceMappingURL=cache-manager.js.map

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reader_book__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__image_image_component__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_util__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__view_mode__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cache_manager__ = __webpack_require__(98);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







const { webFrame } = window['require']('electron');
let checking = false;
let ScrollComponent = class ScrollComponent {
    constructor(config, elm) {
        this.config = config;
        this.elm = elm.nativeElement;
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        let check;
        const barViewMap = new __WEBPACK_IMPORTED_MODULE_4__lib_util__["a" /* ABMap */](__WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* Config */].VIEW_ALL);
        let viewCS, viewSP;
        this.imgs.changes.subscribe((changes) => __awaiter(this, void 0, void 0, function* () {
            // binding
            const imgs = this.imgs.map(img => img);
            const manager = new __WEBPACK_IMPORTED_MODULE_6__cache_manager__["a" /* CacheManager */](this.config, this.book, imgs);
            if (viewSP)
                viewSP.after(this.book);
            if (viewCS)
                viewCS.after(this.book);
            viewCS = new __WEBPACK_IMPORTED_MODULE_5__view_mode__["a" /* ViewContinuousScroll */](imgs, manager);
            viewSP = new __WEBPACK_IMPORTED_MODULE_5__view_mode__["b" /* ViewSinglePage */](imgs, manager);
            if (!this.book)
                return;
            this.book.bind(imgs);
            // manager.debug();
            // set check function
            if (!imgs.length)
                return;
            let checkCurView;
            check = (newIndex) => {
                const newValue = barViewMap.getA(newIndex);
                if (newIndex !== undefined) {
                    if (viewCS.is(newValue)) {
                        viewSP.after(this.book);
                        viewCS.before(this.config, this.book);
                        checkCurView = () => viewCS.check();
                    }
                    else if (viewSP.is(newValue)) {
                        viewCS.after(this.book);
                        viewSP.before(this.book);
                        checkCurView = () => viewSP.check(this.book.current);
                    }
                    else
                        debugger;
                }
                if (!checkCurView)
                    debugger;
                checkCurView();
            };
            check(this.config.view.get());
            this.config.view.change(n => check(n));
        }));
    }
    onResize() {
        this.imgs.map(img => img).filter(img => img.showing).forEach(img => img.resize());
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__reader_book__["a" /* Book */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__reader_book__["a" /* Book */]) === "function" && _a || Object)
], ScrollComponent.prototype, "book", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* ViewChildren */])(__WEBPACK_IMPORTED_MODULE_3__image_image_component__["a" /* ImageComponent */]),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* QueryList */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* QueryList */]) === "function" && _b || Object)
], ScrollComponent.prototype, "imgs", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* HostListener */])('window:resize'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ScrollComponent.prototype, "onResize", null);
ScrollComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'cm-scroll',
        template: __webpack_require__(178),
        styles: [__webpack_require__(166)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* Config */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* Config */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* ElementRef */]) === "function" && _d || Object])
], ScrollComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=scroll.component.js.map

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_util__ = __webpack_require__(24);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const r = new __WEBPACK_IMPORTED_MODULE_1__lib_util__["b" /* LatestRunner */]();
class ViewSinglePage {
    is(view) {
        return view === __WEBPACK_IMPORTED_MODULE_0__config_service__["a" /* Config */].VIEW_SINGLE_PAGE;
    }
    constructor(imgs, manager) {
        this.imgs = imgs;
        this.manager = manager;
    }
    before(book) {
        this.imgs.filter((img, i) => i !== book.current - 1).forEach(img => img.hide());
        this.onPage = (n) => {
            this.check(n);
        };
        book.onPage(this.onPage);
    }
    check(page) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(1, page);
            yield r.run(() => __awaiter(this, void 0, void 0, function* () {
                const cur = this.imgs[page - 1];
                // console.log(2, page);
                yield this.manager.request(page - 1);
                // console.log(3, page);
                if (this.last && this.last != cur) {
                    this.last.hide();
                }
                cur.scrollTo();
                cur.show();
                this.last = cur;
            }));
        });
    }
    after(book) {
        if (book)
            book.onPageRemove(this.onPage);
        this.last = null;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = ViewSinglePage;

class ViewContinuousScroll {
    is(view) {
        return view === __WEBPACK_IMPORTED_MODULE_0__config_service__["a" /* Config */].VIEW_CONTINUOUS_SCROLL;
    }
    constructor(imgs, manager) {
        this.imgs = imgs;
        this.manager = manager;
    }
    before(config, book) {
        this.imgs.forEach(img => img.show());
        this.imgs[book.current - 1].scrollTo();
        const r = new __WEBPACK_IMPORTED_MODULE_1__lib_util__["b" /* LatestRunner */]();
        this._timer = setInterval(() => {
            const r = this.imgs.map((img, i) => ({ i: i, r: img.ratio() })).filter(x => x.r > 0.45);
            const d = config.scrollDirection;
            const focus = d ? r.pop() : r.shift();
            if (focus) {
                book.updateCurrent(focus.i + 1);
            }
        }, 300);
        this.onPage = (n) => {
            this.check();
        };
        book.onPage(this.onPage);
    }
    check() {
        return __awaiter(this, void 0, void 0, function* () {
            yield r.run(() => __awaiter(this, void 0, void 0, function* () {
                const showingIndex = this.imgs.map((img, i) => ({
                    i: i,
                    inView: img.inView()
                })).filter(x => x.inView).map(x => x.i);
                yield this.manager.request(...showingIndex);
            }));
        });
    }
    after(book) {
        if (book)
            book.onPageRemove(this.onPage);
        clearInterval(this._timer);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ViewContinuousScroll;

//# sourceMappingURL=view-mode.js.map

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrustResourceUrlPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let TrustResourceUrlPipe = class TrustResourceUrlPipe {
    constructor(_s) {
        this.sanitizer = _s;
    }
    transform(value, args) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
};
TrustResourceUrlPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Pipe */])({
        name: 'trustResourceUrl'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _a || Object])
], TrustResourceUrlPipe);

var _a;
//# sourceMappingURL=trust-resource-url.pipe.js.map

/***/ }),
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".titlebar {\n  height: 38px;\n  -webkit-app-region: drag;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  opacity: 0;\n  text-align: center;\n  font-size: 14px;\n  line-height: 38px;\n  color: #ccc;\n  text-shadow: 0 0 1px black;\n  -webkit-transition: opacity 125ms ease-in-out;\n  transition: opacity 125ms ease-in-out;\n}\n\n.titlebar:hover {\n  opacity: 1;\n  background-color: rgba(0, 0, 0, 0.9);\n}\n\nreader {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n/*section.cover {*/\n/*position: fixed;*/\n/*top: 0;*/\n/*right: 0;*/\n/*bottom: 0;*/\n/*left: 0;*/\n/*z-index: 1;*/\n/*background-color: red;*/\n/*display: flex;*/\n/*align-items: center;*/\n/*justify-content: center;*/\n/*}*/\n\n/*section.cover img {*/\n/*}*/\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ":host {\n  display: inline;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".about {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: column nowrap;\n          flex-flow: column nowrap;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.logo {\n  margin: -12px 0;\n  width: 85%;\n}\n\n.blank {\n  opacity: 0;\n}\n\n.info {\n  font-size: 13px;\n}\n\n.footer {\n  font-size: 12px;\n  opacity: 0.62;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ":host {\n  position: absolute;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".credit {\n  /*display: flex;*/\n  /*flex-flow: column nowrap;*/\n  height: 100%;\n}\n\n.box-wrapper {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 12px 16px;\n}\n\n::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n\n.box {\n  position: absolute;\n  top: 48px;\n  right: 0;\n  bottom: 12px;\n  left: 0;\n  padding: 0 16px;\n  overflow-y: scroll;\n}\n\n.license {\n  max-height: 475px;\n  overflow-y: scroll;\n  line-height: 18px;\n  font-size: 12px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ":host {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row nowrap;\n          flex-flow: row nowrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  line-height: 32px;\n  font-size: 14px;\n  pointer-events: none;\n}\n\n.backdrop {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: black;\n  /*backdrop-filter: saturate(180%) blur(10px);*/\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n\n  z-index: -1;\n  pointer-events: none;\n  /*transition: opacity 25ms;*/\n  opacity: 0;\n}\n\n.backdrop.show {\n  pointer-events: auto;\n  opacity: .75;\n}\n\ncover-about, cover-preferences {\n  background-color: white;\n  border-radius: 6px;\n  border: 1px solid #888;\n  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.3);\n  margin-top: 8px;\n  padding: 16px;\n  width: 61.8%;\n  min-width: 320px;\n  max-width: 570px;\n  max-height: 85%;\n  -webkit-transition: 125ms ease-in-out;\n  transition: 125ms ease-in-out;\n  pointer-events: none;\n  display: none;\n}\n\ncover-about.show, cover-preferences.show {\n  pointer-events: auto;\n  display: block;\n}\n\ncover-about {\n  max-width: 480px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ":host {\n  position: relative;\n}\n\n.title {\n  text-align: center;\n  font-size: 16px;\n  font-weight: bold;\n  color: #444;\n}\n\n.reset {\n  position: absolute;\n  top: 16px;\n  right: 24px;\n}\n\n.main {\n  margin-top: 12px;\n  padding: 16px 0 8px 0;\n  border-top: 1px solid #cccccc;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\ntable{\n  display: inline-table;\n}\n\ninput[type=\"text\"] {\n  width: 180px;\n  border: 1px solid #cccccc;\n  height: 28px;\n  padding: 0 12px;\n  font-size: 14px;\n}\n\n\ninput[type=\"checkbox\"] {\n  margin-right: 12px;\n}\n\n.name, .value {\n  line-height: 38px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n.name {\n  padding: 0 12px;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.loading {\n  z-index: -1;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  /*color: white;*/\n  font-family: \"American Typewriter\", monospace;\n  opacity: 0.62;\n  -webkit-transition: opacity 275ms ease-in;\n  transition: opacity 275ms ease-in;\n}\n\n.loading.hide {\n  opacity: 0;\n}\n\n.loading.singlePage {\n  position: fixed;\n}\n\n.loading .words {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: column nowrap;\n          flex-flow: column nowrap;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n}\n\n.loading .words .page {\n  font-size: 4vh;\n  margin-bottom: 1vh;\n}\n\n.loading .words .status {\n  font-size: 2.5vh;\n  opacity: 0.8;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n\n:host {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".layer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n}\n\n.layer .panel {\n  position: absolute;\n  background-color: #111;\n  border-radius: 8px;\n  border: 1px solid #222;\n  color: #bbb;\n  padding: 6px 10px 6px 10px;\n  text-shadow: 0 0 2px black;\n  font-size: 16px;\n}\n\n.progress {\n  display: inline-block;\n  top: 18px;\n  right: 18px;\n}\n\n.ctrl {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n}\n\n.ctrl .panel {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n\n.loading {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  opacity: 0;\n  -webkit-transition: 275ms;\n  transition: 275ms;\n  background-color: rgba(0, 0, 0, .85);\n}\n\n.loading.show {\n  opacity: 1;\n}\n\n.loading .word {\n  font-size: 32px;\n  color: #444;\n}\n\n/*spinner*/\n@-webkit-keyframes uil-default-anim {\n  0% {\n    opacity: 1\n  }\n  100% {\n    opacity: 0\n  }\n}\n\n@keyframes uil-default-anim {\n  0% {\n    opacity: 1\n  }\n  100% {\n    opacity: 0\n  }\n}\n\n.uil-default-css > div:nth-of-type(1) {\n  -webkit-animation: uil-default-anim 1s linear infinite;\n  animation: uil-default-anim 1s linear infinite;\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n\n.uil-default-css {\n  position: relative;\n  background: none;\n  width: 200px;\n  height: 200px;\n}\n\n.uil-default-css > div:nth-of-type(2) {\n  -webkit-animation: uil-default-anim 1s linear infinite;\n  animation: uil-default-anim 1s linear infinite;\n  -webkit-animation-delay: -0.9166666666666666s;\n  animation-delay: -0.9166666666666666s;\n}\n\n.uil-default-css {\n  position: relative;\n  background: none;\n  width: 200px;\n  height: 200px;\n}\n\n.uil-default-css > div:nth-of-type(3) {\n  -webkit-animation: uil-default-anim 1s linear infinite;\n  animation: uil-default-anim 1s linear infinite;\n  -webkit-animation-delay: -0.8333333333333334s;\n  animation-delay: -0.8333333333333334s;\n}\n\n.uil-default-css {\n  position: relative;\n  background: none;\n  width: 200px;\n  height: 200px;\n}\n\n.uil-default-css > div:nth-of-type(4) {\n  -webkit-animation: uil-default-anim 1s linear infinite;\n  animation: uil-default-anim 1s linear infinite;\n  -webkit-animation-delay: -0.75s;\n  animation-delay: -0.75s;\n}\n\n.uil-default-css {\n  position: relative;\n  background: none;\n  width: 200px;\n  height: 200px;\n}\n\n.uil-default-css > div:nth-of-type(5) {\n  -webkit-animation: uil-default-anim 1s linear infinite;\n  animation: uil-default-anim 1s linear infinite;\n  -webkit-animation-delay: -0.6666666666666666s;\n  animation-delay: -0.6666666666666666s;\n}\n\n.uil-default-css {\n  position: relative;\n  background: none;\n  width: 200px;\n  height: 200px;\n}\n\n.uil-default-css > div:nth-of-type(6) {\n  -webkit-animation: uil-default-anim 1s linear infinite;\n  animation: uil-default-anim 1s linear infinite;\n  -webkit-animation-delay: -0.5833333333333334s;\n  animation-delay: -0.5833333333333334s;\n}\n\n.uil-default-css {\n  position: relative;\n  background: none;\n  width: 200px;\n  height: 200px;\n}\n\n.uil-default-css > div:nth-of-type(7) {\n  -webkit-animation: uil-default-anim 1s linear infinite;\n  animation: uil-default-anim 1s linear infinite;\n  -webkit-animation-delay: -0.5s;\n  animation-delay: -0.5s;\n}\n\n.uil-default-css {\n  position: relative;\n  background: none;\n  width: 200px;\n  height: 200px;\n}\n\n.uil-default-css > div:nth-of-type(8) {\n  -webkit-animation: uil-default-anim 1s linear infinite;\n  animation: uil-default-anim 1s linear infinite;\n  -webkit-animation-delay: -0.4166666666666667s;\n  animation-delay: -0.4166666666666667s;\n}\n\n.uil-default-css {\n  position: relative;\n  background: none;\n  width: 200px;\n  height: 200px;\n}\n\n.uil-default-css > div:nth-of-type(9) {\n  -webkit-animation: uil-default-anim 1s linear infinite;\n  animation: uil-default-anim 1s linear infinite;\n  -webkit-animation-delay: -0.3333333333333333s;\n  animation-delay: -0.3333333333333333s;\n}\n\n.uil-default-css {\n  position: relative;\n  background: none;\n  width: 200px;\n  height: 200px;\n}\n\n.uil-default-css > div:nth-of-type(10) {\n  -webkit-animation: uil-default-anim 1s linear infinite;\n  animation: uil-default-anim 1s linear infinite;\n  -webkit-animation-delay: -0.25s;\n  animation-delay: -0.25s;\n}\n\n.uil-default-css {\n  position: relative;\n  background: none;\n  width: 200px;\n  height: 200px;\n}\n\n.uil-default-css > div:nth-of-type(11) {\n  -webkit-animation: uil-default-anim 1s linear infinite;\n  animation: uil-default-anim 1s linear infinite;\n  -webkit-animation-delay: -0.16666666666666666s;\n  animation-delay: -0.16666666666666666s;\n}\n\n.uil-default-css {\n  position: relative;\n  background: none;\n  width: 200px;\n  height: 200px;\n}\n\n.uil-default-css > div:nth-of-type(12) {\n  -webkit-animation: uil-default-anim 1s linear infinite;\n  animation: uil-default-anim 1s linear infinite;\n  -webkit-animation-delay: -0.08333333333333333s;\n  animation-delay: -0.08333333333333333s;\n}\n\n.uil-default-css {\n  position: relative;\n  background: none;\n  width: 200px;\n  height: 200px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "section.pages {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: column nowrap;\n          flex-flow: column nowrap;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  overflow-scrolling: touch;\n  scroll-behavior: smooth;\n  opacity: 1;\n}\n\nsection.pages.hide {\n  opacity: 0;\n}\n\nviewer {\n  width: 100%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".hidden {\n  display: none;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */
/***/ (function(module, exports) {

module.exports = "<reader [path]=\"path\" [refresh]=\"refresh\" (ok)=\"onOk()\" (fail)=\"open($event)\"></reader>\n<header class=\"titlebar\" (dblclick)=\"zoom()\" (contextmenu)=\"onContextMenu($event, titleBar)\" #titleBar>{{getTitle()}}</header>\n<cover-layer></cover-layer>\n"

/***/ }),
/* 172 */
/***/ (function(module, exports) {

module.exports = "{{word}}<span></span>\n"

/***/ }),
/* 173 */
/***/ (function(module, exports) {

module.exports = "<div class=\"about\" *ngIf=\"!creditShow\">\n  <img class=\"logo\" src=\"data:image/png;base64,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\" alt=\"\">\n  <div>a convenient comic reader</div>\n  <div class=\"info\"><span>Version: 0.2.1 (18)</span><span class=\"blank\">-</span><span><a (click)=\"showCredit()\">Acknowledgement</a></span>\n  </div>\n  <div class=\"info\"><span><a (click)=\"open('mailto:centimitr@gmail.com?subject=[Bug Report] &body=Thank you for your feedback!')\">Submit a Bug</a></span><span> | </span><span><a\n    (click)=\"open('mailto:centimitr@gmail.com?subject=[Feature Request] &body=Thank you for your feedback!')\">Request a Feature</a></span></div>\n  <div class=\"footer\">2017 © Centimitr. All rights reserved.</div>\n\n</div>\n<div class=\"credit\" *ngIf=\"creditShow\">\n  <div style=\"height: 10000px;\"></div>\n  <div class=\"box-wrapper\">\n    <a style=\"text-decoration: none;\" (click)=\"hideCredit()\"><span style=\"margin: 0 4px;\">←</span>Back</a>\n    <div class=\"box\" style=\"\">\n        <div *ngFor=\"let c of credits\">\n          <div><a (click)=\"open(c.package.homepage)\">{{c.package.name}}</a></div>\n          <div class=\"license\">{{c.license}}</div>\n        </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),
/* 174 */
/***/ (function(module, exports) {

module.exports = "<div class=\"backdrop\" [class.show]=\"s.backdropShow\" (click)=\"s.dismissAll()\"></div>\n<cover-about [class.show]=\"s.states.about\"></cover-about>\n<cover-preferences [class.show]=\"s.states.preferences\"></cover-preferences>\n"

/***/ }),
/* 175 */
/***/ (function(module, exports) {

module.exports = "<div class=\"title\">Preferences</div>\n<div class=\"reset\" [hidden]=\"!canReset()\"><a (click)=\"reset()\">reset</a></div>\n<section class=\"main\">\n  <table>\n    <tr>\n        <td class=\"name\">RAR Passwords:</td>\n        <td class=\"value\"><input type=\"text\" title=\"\" [(ngModel)]=\"c.rarPasswords\" (blur)=\"save()\"></td>\n    </tr>\n    <tr>\n      <td colspan=\"2\" class=\"name\">\n        <label>\n          <input type=\"checkbox\" [(ngModel)]=\"c.submitData\" (change)=\"save()\">\n          Help Eris improve by submitting anonymous data\n        </label>\n      </td>\n    </tr>\n  </table>\n</section>\n"

/***/ }),
/* 176 */
/***/ (function(module, exports) {

module.exports = "<div class=\"loading\" [class.singlePage]=\"config.isSinglePage()\">\n  <div class=\"words\">\n    <div class=\"page\">Page {{page}}</div>\n    <div class=\"status\">loading...</div>\n  </div>\n</div>\n"

/***/ }),
/* 177 */
/***/ (function(module, exports) {

module.exports = "<section class=\"pages\" #pages [class.hide]=\"loadingShow\">\n  <cm-scroll style=\"width: 100%;\" [book]=\"book\"></cm-scroll>\n</section>\n<section class=\"layer\">\n  <section class=\"panel progress\" *ngIf=\"book?.total\">\n    <span>{{book?.current}}</span>\n    <span style=\"opacity: 0.8;margin: 0 -2px;\">/</span>\n    <span style=\"opacity: 0.95\">{{book?.total}}</span>\n  </section>\n  <section class=\"loading\" [class.show]=\"loadingShow\">\n    <div class=\"uil-default-css\" style=\"transform:scale(0.34);\">\n      <div style='top:80px;left:93px;width:14px;height:40px;background:#ffffff;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#ffffff;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#ffffff;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#ffffff;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#ffffff;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#ffffff;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#ffffff;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#ffffff;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#ffffff;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#ffffff;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#ffffff;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#ffffff;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;'></div></div>\n    <!--<cm-dot class=\"word\" [word]=\"'Book Loading'\" [interval]=\"500\"></cm-dot>-->\n  </section>\n</section>\n"

/***/ }),
/* 178 */
/***/ (function(module, exports) {

module.exports = "<div [hidden]=\"config.isSinglePage()&&config.isMaxlHeight()\"\n     style=\"height: 5vh; width: 100%;\"></div>\n<cm-image *ngFor=\"let p of book?.pages(); let i=index;\"\n          [style.marginBottom.vh]=\"config.isSinglePage()&&config.isMaxlHeight()?0:5\"\n          [page]=\"i+1\"\n          [src]=\"book.getPageFilePath(p.Locator)\"\n></cm-image>\n<div style=\"height: 0; width: 100%;\"></div>\n"

/***/ }),
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(79);


/***/ })
],[203]);
//# sourceMappingURL=main.bundle.js.map