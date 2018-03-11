//
//  Channel.swift
//  Remote Browser
//
//  Created by Xiao Shi on 25/12/17.
//  Copyright © 2017 devbycm. All rights reserved.
//

import Foundation

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
