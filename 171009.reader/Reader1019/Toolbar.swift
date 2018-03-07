//
//  Toolbar.swift
//  Reader1019
//
//  Created by Xiao Shi on 25/10/2017.
//  Copyright © 2017 Xiao Shi. All rights reserved.
//

import Cocoa

class ToolbarView: NSView {
    override init(frame frameRect: NSRect) {
        super.init(frame: frameRect)
        Swift.print(0)
        let text = NSTextField()
        addSubview(text)
    }
    
    required init?(coder decoder: NSCoder) {
        super.init(coder: decoder)
    }
}
