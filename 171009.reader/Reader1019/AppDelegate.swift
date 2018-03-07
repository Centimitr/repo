//
//  AppDelegate.swift
//  Reader1019
//
//  Created by Xiao Shi on 18/10/2017.
//  Copyright © 2017 Xiao Shi. All rights reserved.
//

import Cocoa

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate {

    let documentController = DocumentController()

    func applicationDidFinishLaunching(_ aNotification: Notification) {
    }
    
    func applicationWillBecomeActive(_ notification: Notification) {
        let count = documentController.documents.count
        if count == 0 {
            documentController.openDocument(nil)
        }
    }
    
    func applicationShouldHandleReopen(_ sender: NSApplication, hasVisibleWindows flag: Bool) -> Bool {
        if !flag {
            documentController.openDocument(nil)
        }
        return !flag
    }

    func applicationWillTerminate(_ aNotification: Notification) {
    }

}

