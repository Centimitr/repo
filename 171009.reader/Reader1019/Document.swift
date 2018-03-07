//
//  Document.swift
//  Reader1019
//
//  Created by Xiao Shi on 18/10/2017.
//  Copyright © 2017 Xiao Shi. All rights reserved.
//

import Cocoa
import Quartz.PDFKit

class Document: NSDocument {

    override init() {
        super.init()
    }

    override class var autosavesInPlace: Bool {
        return true
    }
    
    var book: MangaBook?

    override func makeWindowControllers() {
        let wc = WindowController()
        wc.load(book: self.book)
        self.addWindowController(wc)
    }

    override func read(from url: URL, ofType typeName: String) throws {
        self.book = MangaBook(url: url, type: typeName)
    }

}

extension Document {
//    override func windowControllerDidLoadNib(_ windowController: NSWindowController) {
//        Swift.print("!!windowControllerDidLoadNib")
//        super.windowControllerDidLoadNib(windowController)
//        windowController.window?.appearance = NSAppearance(named: .vibrantDark)
//        pdf.configure()
//        pdf.document = self.document
//    }

//    override var windowNibName: NSNib.Name? {
//        // Returns the nib file name of the document
//        // If you need to use a subclass of NSWindowController or if your document supports multiple NSWindowControllers, you should remove this property and override -makeWindowControllers instead.
//        return NSNib.Name("Document")
//    }

    //    override func makeWindowControllers() {
    //        let wc = WindowController()
    //        self.addWindowController(wc)
    //    }
    //
    //    override func data(ofType typeName: String) throws -> Data {
    //        // Insert code here to write your document to data of the specified type. If outError != nil, ensure that you create and set an appropriate error when returning nil.
    //        // You can also choose to override fileWrapperOfType:error:, writeToURL:ofType:error:, or writeToURL:ofType:forSaveOperation:originalContentsURL:error: instead.
    //        Swift.print("Write:", typeName)
    //        throw NSError(domain: NSOSStatusErrorDomain, code: unimpErr, userInfo: nil)
    //    }
    //
    //    override func read(from data: Data, ofType typeName: String) throws {
    // Insert code here to read your document from the given data of the specified type. If outError != nil, ensure that you create and set an appropriate error when returning false.
    // You can also choose to override readFromFileWrapper:ofType:error: or readFromURL:ofType:error: instead.
    // If you override either of these, you should also override -isEntireFileLoaded to return false if the contents are lazily loaded.
    //        Swift.print("Read:", typeName)
    //        Swift.print(data.count)
    //        Swift.print(pdf)
    //        data.decompress(withAlgorithm: .LZ4)

    // throw NSError(domain: NSOSStatusErrorDomain, code: unimpErr, userInfo: nil)
    //    }
    //    override func fileWrapper(ofType typeName: String) throws -> FileWrapper {
    //        Swift.print("Write", typeName)
    //        let wrapper = FileWrapper(directoryWithFileWrappers: [:])
    //        let fws = wrapper.fileWrappers
    //        Swift.print(fws?.count ?? "-1")
    //        return wrapper
    //    }

    //    override func read(from fileWrapper: FileWrapper, ofType typeName: String) throws {
    //        Swift.print("Read", typeName)
    //        let document = PDFDocument()
    //        var imgWrappers: [FileWrapper] = []
    //
    //        fileWrapper.fileWrappers?.forEach { _, wrapper in
    //            let supportExts = [".jpg", ".jpeg", ".png"]
    //            let name = wrapper.filename!.lowercased()
    //            if supportExts.reduce(false, { $0 || name.contains($1)}){
    //                imgWrappers.append(wrapper)
    //            }
    //        }
    //
    //        imgWrappers.sort(by: { $0.filename! < $1.filename! })
    //
    //        imgWrappers.forEach{ wrapper in
    //            let data = wrapper.regularFileContents!
    //            let img = NSImage(data: data)!
    //            let page = PDFPage(image: img)!
    //            document.insert(page, at: document.pageCount)
    //        }
    //
    //        // Swift.print(document.pageCount)
    //        self.document = document
    //    }
}

