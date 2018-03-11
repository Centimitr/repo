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
//import PTFakeTouch


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
//            case "input":
//            PT
//            case "eval":
//                let js: String = data.string!
////                print(js)
//                guard let tab = self.tab(id) else {
//                    print("Err: no tab found:", id)
//                    return
//                }
//                tab.evaluateJavaScript(js, completionHandler: { (data, error) in
//                    completeHandler(data as Any)
//                    responded = true
//                })
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
