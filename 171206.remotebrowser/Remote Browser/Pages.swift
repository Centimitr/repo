//
//  Pages.swift
//  Remote Browser
//
//  Created by Xiao Shi on 5/12/17.
//  Copyright © 2017 devbycm. All rights reserved.
//

import Foundation
import UIKit
import WebKit

//
//class PageViewController: UIViewController {
//
//    var id: String = ""
//    var webView: WKWebView!
//
//    override func loadView() {
//        let webConfiguration = WKWebViewConfiguration()
//        webView = WKWebView(frame: .zero, configuration: webConfiguration)
//        view = webView
//    }
//
//    override func viewDidLoad() {
//        super.viewDidLoad()
//    }
//
//    func load(_ urlString: String) {
//        let url = URL(string: urlString)
//        let req = URLRequest(url: url!)
//        webView.load(req)
//    }
//}

let script: String = "var _createClass=function(){function a(b,c){for(var f,d=0;d<c.length;d++)f=c[d],f.enumerable=f.enumerable||!1,f.configurable=!0,'value'in f&&(f.writable=!0),Object.defineProperty(b,f.key,f)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}console.log(1),window.bbb=1;var ActiveHighlight=function(){function a(){_classCallCheck(this,a);var b=document.createElement('div');b.position='fixed',b.background='rgba(0, 0, 0, .2)',b.borderRadius='4px',b.display='hidden',b.zIndex=1e9,document.body.appendChild(b),this.hl=b}return _createClass(a,[{key:'highlight',value:function highlight(b){this.hl.height=b.clientHeight,this.hl.width=b.clientWidth,this.hl.top=b.clientTop,this.hl.left=b.clientLeft,this.hl.display='block'}},{key:'cancel',value:function cancel(){this.hl.display='hidden'}}]),a}(),SmoothScroll=function(){function a(){_classCallCheck(this,a)}return _createClass(a,[{key:'scrollableElementFromPoint',value:function scrollableElementFromPoint(b,c){for(var d=function(g){var h=window.getComputedStyle(g),j='hidden'===h.overflow||'hidden'===h.overflowX||'hidden'===h.overflowY;return g.scrollHeight>g.offsetHeight&&!j},f=document.elementFromPoint(b,c);f&&!d(f);)f=f.parentElement;return f||document.body}},{key:'scroll',value:function scroll(b,c,d){var f=this.scrollableElementFromPoint(b,c);f.scrollTop+=d.deltaY,f.scrollWidth+=d.deltaX}}]),a}(),RemoteBrowserKit=function(){function a(){_classCallCheck(this,a),this.activeHightlight=new ActiveHighlight,this.smoothScroll=new SmoothScroll}return _createClass(a,[{key:'generateEvent',value:function generateEvent(b,c,d){return b.type.startsWith('key')?function f(j){return new KeyboardEvent(j.type,{view:window,bubbles:!0,cancelable:!0,code:j.code,key:j.key,altKey:j.modifiers.includes('alt'),ctrlKey:j.modifiers.includes('control'),metaKey:j.modifiers.includes('meta'),shiftKey:j.modifiers.includes('shift')})}(b):b.type.startsWith('mouse')||'click'===b.type?function g(j,k,l){return new MouseEvent(j.type,{view:window,bubbles:!0,cancelable:!0,button:{left:0,middle:1,right:2}[j.button],buttons:{left:1,middle:4,right:2}[j.button]||0,clientX:k,clientY:l,altKey:j.modifiers.includes('alt'),ctrlKey:j.modifiers.includes('control'),metaKey:j.modifiers.includes('meta'),shiftKey:j.modifiers.includes('shift')})}(b,c,d):b.type.startsWith('wheel')?function h(j,k,l){return new WheelEvent('wheel',{clientX:k,clientY:l,deltaX:j.deltaX,deltaY:j.deltaY,deltaZ:j.deltaZ,deltaMode:j.deltaMode})}(b,c,d):null}}]),a}();window.cmkit=new RemoteBrowserKit;return 0"

class Tab: WKWebView {
    var id: String

    init(_ id: String, frame: CGRect) {
        self.id = id
        let config = WKWebViewConfiguration()
        super.init(frame: frame, configuration: config)
//        let userContentCtrl = WKUserContentController()
//        let userScript = WKUserScript(source: "(function(){window.bbb = 1})()", injectionTime: .atDocumentStart, forMainFrameOnly: false)
//        userContentCtrl.removeAllUserScripts()
//        userContentCtrl.addUserScript(userScript)
//        self.configuration.userContentController = userContentCtrl
        print("Tab.init:", id, self.configuration.userContentController.userScripts)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    func load(_ urlString: String) {
        print("Tab.load:", urlString)
        let url = URL(string: urlString)
        let req = URLRequest(url: url!)
        self.load(req)
    }

    func ensureKit(_ callback: @escaping (() -> Void)) {
        self.evaluateJavaScript("!!window.cmkit", completionHandler: { (isExist, error) in
            print("Exist:", isExist as Any)
            print(1, error as Any)
            if (true) {
                self.evaluateJavaScript(script, completionHandler: { (data, error) in
                    print(2, error as Any)
                    callback()
                })
            } else {
                callback()
            }
        })
    }
}

class Channel {
    static let shared = Channel()
    private var callback: ((String, Any, @escaping (Any) -> Void) -> Void)?

    init() {
    }

    func send(name: String, data: Any, completeHandler: @escaping (Any) -> Void) {
        callback?(name, data, completeHandler)
    }

    func listen(callback: @escaping (String, Any, @escaping (Any) -> Void) -> Void) {
        self.callback = callback
    }
}

class PagesViewController: UIViewController {
    let channel = Channel.shared

    func tab(_ id: String) -> Tab? {
        var tab: Tab?
        view.subviews.forEach { view in
            let t = view as! Tab
            print(t.id)
            if (t.id == id) {
                tab = t
            }
        }
        return tab
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        var responded = false
        channel.listen { (method, jsonString, completeHandler) in
            let json: JSON = try! JSON(data: (jsonString as! String).data(using: .utf8)!)
            let id: String = json["id"].string ?? ""
            let data = json["data"]
            print(method, id)
            switch method {
            case "new":
                let tab = Tab(id, frame: self.view.bounds)
                self.view.addSubview(tab)
            case "load":
                let url: String = data.string!
                self.tab(id)?.load(url)
            case "close":
                self.tab(id)?.removeFromSuperview()
            case "switch":
                let t = self.tab(id)
                if (t != nil) {
                    self.view.bringSubview(toFront: t!)
                }
            case "eval":
                let js: String = data.string!
//                print(js)
                guard let tab = self.tab(id) else {
                    print("Err: no tab found:", id)
                    return
                }
                tab.evaluateJavaScript(js, completionHandler: { (data, error) in
                    completeHandler(data as Any)
                    responded = true
                })
            case "closeAll":
                self.view.subviews.forEach { view in
                    view.removeFromSuperview()
                }
                return
            default: return
            }
            if !responded {
                completeHandler(0)
            }
        }
    }
}
