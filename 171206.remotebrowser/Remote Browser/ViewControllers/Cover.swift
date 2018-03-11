//
//  Cover.swift
//  Remote Browser
//
//  Created by Xiao Shi on 5/12/17.
//  Copyright © 2017 devbycm. All rights reserved.
//

import Foundation
import UIKit
import WebKit


class CoverViewController: UIViewController, WKUIDelegate, WKScriptMessageHandler {

    var webView: WKWebView!
    let methods = ["new", "switch", "load", "close", "eval", "closeAll"]
    let channel = Channel.shared

    override func loadView() {
        let webConfiguration = WKWebViewConfiguration()
        webConfiguration.suppressesIncrementalRendering = true
        let userController = WKUserContentController()
        methods.forEach { name in
            userController.add(self, name: name)
        }
        webConfiguration.userContentController = userController
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.configuration.preferences.setValue(true, forKey: "developerExtrasEnabled")
        webView.uiDelegate = self
        webView.isOpaque = false
        webView.backgroundColor = UIColor.clear
        webView.scrollView.backgroundColor = UIColor.clear
        view = webView
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        print(0, message.name)
        if methods.contains(message.name) {
            let body: [String] = (message.body as! String).components(separatedBy: " |REMOTEBROWSER.MESSAGE| ")
            let packageId = body[0]
            let data = body[1]
//            print("REQ:", packageId, data)
            channel.send(name: message.name, data: data, completeHandler: { data in
//                let json: String = (try! JSON(data: data as! Data).rawString())!
//                print("RES:", packageId, data)
                self.webView.evaluateJavaScript("window['_remotebrowser_response'](\(packageId), \(0)")
            })
        }
    }


    override func viewDidLoad() {
        super.viewDidLoad()
        let url = URL(string: "http://10.0.0.23:4200")
        let req = URLRequest(url: url!)
        self.webView.load(req)
    }
}
