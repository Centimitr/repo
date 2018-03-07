//
//  DocumentController.swift
//  Reader1019
//
//  Created by Xiao Shi on 26/10/2017.
//  Copyright © 2017 Xiao Shi. All rights reserved.
//

import Cocoa

class DocumentController: NSDocumentController {
    override func runModalOpenPanel(_ openPanel: NSOpenPanel, forTypes types: [String]?) -> Int {
        openPanel.canChooseDirectories = true
        return super.runModalOpenPanel(openPanel, forTypes: types)
    }
}
