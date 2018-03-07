//
//  Window.swift
//  Reader1019
//
//  Created by Xiao Shi on 18/10/2017.
//  Copyright © 2017 Xiao Shi. All rights reserved.
//

import Foundation
import Cocoa
import Quartz.PDFKit

class WindowController: NSWindowController {

    @IBOutlet weak var pdf: CMPDFView!
    @IBOutlet weak var title: NSTextField!
    @IBOutlet weak var touchScrubber: NSScrubber!
    var pdfDocument: PDFDocument?

    override init(window: NSWindow?) {
        super.init(window: window)
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    override var windowNibName: NSNib.Name? {
        return NSNib.Name("Document")
    }

    override func windowTitle(forDocumentDisplayName displayName: String) -> String {
        var pageIndicator = ""
        let pageCount: Int = (self.pdf.document?.pageCount)!
        if pageCount > 0 {
            pageIndicator = " (page \(self.pdf.currentPageIndex + 1) of \(pageCount))"
        }
        return displayName + pageIndicator
    }

    override func windowDidLoad() {
        super.windowDidLoad()
        window?.appearance = NSAppearance(named: .vibrantDark)
        self.pdf.delegate = self
        self.pdf.document = self.pdfDocument
        self.pdf.configure()
        NotificationCenter.default.addObserver(self, selector: #selector(onChange), name: NSNotification.Name.PDFViewPageChanged, object: nil)
    }

    @objc func onChange() {
        self.synchronizeWindowTitleWithDocumentName()
    }

    func load(book: MangaBook?) {
        if let book = book {
            let document = PDFDocument()
            book.expand()
            book.load()
            book.pages(callback: { page in
                let pageCount = document.pageCount
                document.insert(page, at: pageCount)
                if pageCount == 0 && self.pdf != nil {
                    self.pdf.autoScales = true
                }
            })
            self.pdfDocument = document
        }
    }

    @IBAction func naviFirstPage(_ sender: NSMenuItem) {
        pdf.goToFirstPage(sender)
    }

    @IBAction func naviLastPage(_ sender: NSMenuItem) {
        pdf.goToLastPage(sender)
    }

    @IBAction func naviPreviousPage(_ sender: NSMenuItem) {
        pdf.goToPreviousPage(sender)
    }

    @IBAction func naviNextPage(_ sender: NSMenuItem) {
        pdf.goToNextPage(sender)
    }

    @IBAction func touchAutoScales(_ sender: NSButton) {
        pdf.autoScales = true
    }

    @IBAction func viewAutoScales(_ sender: NSMenuItem) {
        pdf.autoScales = true
    }

    @IBAction func viewZoomIn(_ sender: NSMenuItem) {
        pdf.zoomIn(sender)
    }

    @IBAction func viewZoomOut(_ sender: NSMenuItem) {
        pdf.zoomOut(sender)
    }
}

extension WindowController: PDFViewDelegate {
    func pdfViewPerformGo(toPage sender: PDFView) {
        Swift.print(sender)
    }
}
