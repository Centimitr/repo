//
//  PDFView.swift
//  Reader1019
//
//  Created by Xiao Shi on 19/10/2017.
//  Copyright © 2017 Xiao Shi. All rights reserved.
//

import Cocoa
import Quartz.PDFKit

class CMPDFView: PDFView {
    var turnPageLock = Lock()
}

extension CMPDFView {
    //    override func mouseUp(with event: NSEvent) {
    //        //        Swift.print("mouseUp!")
    //    }
    //
    //    override func rightMouseUp(with event: NSEvent) {
    //        //        Swift.print("rightMouseUp!")
    //    }
}

extension CMPDFView: PDFViewDelegate {

    func configure(){
        self.backgroundColor = NSColor.controlDarkShadowColor
        self.displayMode = .singlePage
        self.autoScales = true
    }

    override func hitTest(_ point: NSPoint) -> NSView? {
        return self
    }
    
    override func mouseDown(with event: NSEvent) {
        turnPageLock.unlock()
        self.goToNextPage(nil)
        let area = self.areaOfInterest(forMouse: event)
        if !area.contains(.imageArea) && event.absoluteY <= 38 {
            return
        }
    }
    
    override func rightMouseDown(with event: NSEvent) {
//         Swift.print("rightMouseDown!").
        if event.modifierFlags.contains(.command) {
            let menu = NSMenu()
            menu.addItem(NSMenuItem(title: "1", action: nil, keyEquivalent: ""))
            NSMenu.popUpContextMenu(menu, with: event, for: self.documentView!)
        } else {
            self.goToPreviousPage(nil)
        }
    }
    
    var currentPageIndex: Int {
        get {
            let page = self.currentPage!
            let index = self.document?.index(for: page)
            return index!
        }
    }
    
    var clipView: NSClipView {
        get {
            return (documentView!.enclosingScrollView?.contentView)!
        }
    }
    
    var yRange: CGFloat {
        get {
            let height = clipView.documentRect.size.height
            let visibleHeight = clipView.documentVisibleRect.size.height
            return (visibleHeight.distance(to: height))
        }
    }
    
    var scrollY: CGFloat {
        get {
            return (clipView.documentVisibleRect.origin.y)
        }
        set {
            clipView.bounds.origin.y = newValue
        }
    }
    
    func scrollToPageTop() {
        scrollY = clipView.documentRect.size.height
    }
    
    override func goToPreviousPage(_ sender: Any?) {
        if turnPageLock.available && canGoToPreviousPage {
            super.goToPreviousPage(sender)
            self.scrollToPageTop()
        }
        turnPageLock.unlock()
    }
    
    override func goToNextPage(_ sender: Any?) {
        if turnPageLock.available && canGoToNextPage {
            super.goToNextPage(sender)
            self.scrollToPageTop()
        }
        turnPageLock.unlock()
    }
    
    override func scroll(_ point: NSPoint) {
        Swift.print(1, point)
    }
    
    override func scroll(_ rect: NSRect, by delta: NSSize) {
        Swift.print(2, rect, delta)
    }
    
    override func scrollToVisible(_ rect: NSRect) -> Bool {
        Swift.print(3, rect)
        return super.scrollToVisible(rect)
    }

    override func scrollWheel(with event: NSEvent) {
        let scrollYChange = event.scrollingDeltaY
        let newScrollY = scrollY + scrollYChange
        
        let threshold = CGFloat(0.5)
        if yRange > threshold {
            if newScrollY < threshold || newScrollY > yRange - threshold {
                turnPageLock.lock()
            }
        }
        documentView!.scrollWheel(with: event)
    }

}

extension CMPDFView{
    
    override func go(to page: PDFPage){
        Swift.print(0, page)
        super.go(to: page)
    }
    
    override func go(to destination: PDFDestination){
        Swift.print(1, page)
        super.go(to: destination)
    }
    
    override func go(to selection: PDFSelection){
        Swift.print(2, page)
        super.go(to: selection)
    }
    
    override func go(to rect: CGRect, on page: PDFPage){
        Swift.print(3, page)
        super.go(to: rect, on: page)
    }
    
    override func otherMouseUp(with event: NSEvent) {
        Swift.print("otherMouseUp!")
    }
    
    override func otherMouseDown(with event: NSEvent) {
        Swift.print("otherMouseDown!")
    }
    
    override func keyDown(with event: NSEvent) {
        switch event.keyCode {
        case 125: self.scrollLineUp(nil)
        case 126: self.scrollLineDown(nil)
        default: break
        }
    }
    
    override func keyUp(with event: NSEvent) {
        //        Swift.print("keyUp!", event.characters, event.keyCode)
    }
    
    override func magnify(with event: NSEvent) {
        documentView?.magnify(with: event)
    }
    
    //    override func rotate(with event: NSEvent) {
    //        Swift.print("rotateWithEvent!")
    //    }
    
    //    override func swipe(with event: NSEvent) {
    //        Swift.print("swipeWithEvent!")
    //    }
    
}
