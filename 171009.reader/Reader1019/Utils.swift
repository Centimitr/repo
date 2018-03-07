//
//  Utils.swift
//  Reader1019
//
//  Created by Xiao Shi on 23/10/2017.
//  Copyright © 2017 Xiao Shi. All rights reserved.
//

import Foundation
import Cocoa
import Quartz.PDFKit
import ImageIO
import AVFoundation

func ensureDirectory(_ url: URL) {
    do {
        try FileManager.default.createDirectory(at: url, withIntermediateDirectories: true, attributes: nil)
    } catch {
    }
}

class Lock {
    var available = true

    func lock() {
        available = false
    }

    func unlock() {
        available = true
    }
}

extension Archive {
    func extract(_ name: String) -> Data {
        let entry = self[name]!
        var data = Data()
        _ = try! self.extract(entry, consumer: { chunk in
            data.append(chunk)
        })
        return data
    }

    func extractAsYaml(_ name: String) -> Yaml {
        let data = self.extract(name)
        let str = String(data: data, encoding: String.Encoding.utf8)!
        Swift.print(str)
        let yaml = try! Yaml.load(str)
        return yaml
    }

    func extractAsImage(_ name: String) -> NSImage {
        let data = self.extract(name)
        let image = NSImage(data: data)!
        return image
    }

    func extractAsPDFPage(_ name: String) -> PDFPage {
        let image = self.extractAsImage(name)
        let page = PDFPage(image: image)!
        return page
    }

    func addFile(_ name: String, data: Data) {
        try! self.addEntry(with: name, type: .file, uncompressedSize: UInt32(data.count), compressionMethod: .none, provider: { (position, bufferSize) -> Data in
            let upperBound = Swift.min(data.count, position + bufferSize)
            let range = Range(uncheckedBounds: (lower: position, upper: upperBound))
            return data.subdata(in: range)
        })
    }

    func addFile(_ name: String, url: URL) {
        let data = try! Data(contentsOf: url)
        self.addFile(name, data: data)
    }
}

class MangaBookMeta {
    var name: String = ""
    var pageNames: [String] = []

    init() {
    }

    init(yaml: Yaml) {
        self.name = yaml["name"].string!
        yaml["pages"].array?.forEach { page in
            pageNames.append(page.string!)
        }
    }

    init(directory: URL) {
        let filename = directory.lastPathComponent
        self.pageNames = []
        self.name = filename
        let contents = try! FileManager.default.contentsOfDirectory(atPath: directory.path)
        let supportExtensions = [".jpg", ".jpeg", ".png"]
        for name in contents {
            if supportExtensions.reduce(false, { $0 || name.lowercased().contains($1) }) {
                self.pageNames.append(name)
            }
        }
        self.pageNames.sort()
    }

    var data: Data {
        get {
            var str = "name: '\(self.name)'\npages:\n"
            let rows = self.pageNames.map { name in
                " - \(name)\n"
            }
            str.append(rows.joined())
//            Swift.print(str)
            return str.data(using: .utf8)!
        }
    }
}

class MangaBook {

    var url: URL
    var type: String
    var meta: MangaBookMeta = MangaBookMeta()
    var container: URL

    init(url: URL, type: String) {
        self.container = URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true).appendingPathComponent(UUID().uuidString)
        self.url = url
        Swift.print(type)
        switch type {
        case "Manga Book File": self.type = "mangabook"
        case "public.folder":
            self.type = "folder"
            self.container = self.url
        default: self.type = type
        }
        Swift.print("LOAD FILE TYPE:", self.type)
        ensureDirectory(self.container)
    }

    var isMangaFileFormat: Bool {
        get {
            return self.type == "mangabook"
        }
    }

    func expand() {
        Swift.print(self.container)
        switch self.type {
        case "mangabook": self.expandMangaBook(to: self.container)
        case "zip": self.expandZip(to: self.container)
        case "folder": break
        default: Swift.print("ERROR: Unknown Format,", self.type)
        }
    }

    private func expandMangaBook(to: URL) {
        let fm = FileManager()
        try! fm.unzipItem(at: self.url, to: to)
    }

    private func expandZip(to: URL) {
        let fm = FileManager()
        try! fm.unzipItem(at: self.url, to: to)
    }

//    func convert() {
//        let defaultStoreDirectory = FileManager.default.homeDirectoryForCurrentUser.appendingPathComponent("Manga Books")
//        do {
//            try FileManager.default.createDirectory(at: defaultStoreDirectory, withIntermediateDirectories: false, attributes: nil)
//        } catch {
//        }
//        Swift.print(defaultStoreDirectory)
//        let url = defaultStoreDirectory.appendingPathComponent(UUID().uuidString).appendingPathExtension("mangabook")
//        Swift.print("URL:", url)
//        switch self.type {
//        case "folder": convertFromFolder(self.url, to: url)
//        default: Swift.print("ERROR: Convert from Unknown Format,", self.type)
//        }
//        self.url = url
//    }
//
//    private func convertFromFolder(_ url: URL, to: URL) {
//        let archive = Archive(url: to, accessMode: .create)
//        let meta = MangaBookMeta(directory: url)
//        var pageNames: [String] = []
//        var cur = 0
//        for name in meta.pageNames {
//            autoreleasepool {
//                let fileUrl = url.appendingPathComponent(name)
//                let newName = UUID().uuidString
//                archive?.addFile(newName, url: fileUrl)
//                cur = cur + 1
//                pageNames.append(newName)
//            }
//        }
//        meta.pageNames = pageNames
//        archive?.addFile("Book", data: meta.data)
//    }
//
//    private func convertFromZip(_ url: URL, to: URL) {
//
//    }
//
//    private func convertFromRar(_ url: URL, to: URL) {
//
//    }

//    func load() {
//        let archive = Archive(url: self.url, accessMode: .read)!
//        let yaml = archive.extractAsYaml("Book")
//        self.meta = MangaBookMeta(yaml: yaml)
//    }

//    func pages(callback: @escaping (PDFPage) -> Void) {
//        let archive = Archive(url: self.url, accessMode: .read)!
//        let queue = DispatchQueue(label: "com.devbycm.mangareader.document.pages.load")
//        self.meta.pageNames.forEach { pageName in
//            queue.sync {
//                let page = archive.extractAsPDFPage(pageName)
//                DispatchQueue.main.async {
//                    Swift.print("LOADED:", pageName)
//                    callback(page)
//                }
//            }
//        }
//    }

    func load() {
        let fm = FileManager()
        let url = self.container.appendingPathComponent("Meta")
        if fm.fileExists(atPath: url.path) {
            let yaml = try! Yaml.load(String(contentsOf: url))
            self.meta = MangaBookMeta(yaml: yaml)
        } else {
            self.meta = MangaBookMeta(directory: self.container)
        }
    }

    func pages(callback: @escaping (PDFPage) -> Void) {
        for name in self.meta.pageNames {
            let url = self.container.appendingPathComponent(name)
            let img = NSImage(contentsOf: url)!
            let page = PDFPage(image: img)!
            callback(page)
        }
    }

//    func save() {
//        Swift.print("S!")
//        let url = URL(fileURLWithPath: "/Users/shixiao/Desktop/1.heic")
//        Swift.print(CGImageDestinationCopyTypeIdentifiers())
//        let dst = CGImageDestinationCreateWithURL(url as CFURL, AVFileType.heic as CFString, self.meta.pageNames.count, nil)!
//        for name in self.meta.pageNames {
//            let url = self.container.appendingPathComponent(name)
//            let img = NSImage(contentsOf: url)!.cgImage(forProposedRect: nil, context: nil, hints: nil)!
//            CGImageDestinationAddImage(dst, img, nil)
//            Swift.print("O")
//        }
//        CGImageDestinationFinalize(dst)
//        Swift.print("E!")
//    }

//    func pagesFromFile(callback: @escaping (PDFPage) -> Void) {
//        for name in self.meta.pageNames {
//            let url = self.container.appendingPathComponent(name)
//            let img = NSImage(contentsOf: url)!
//            let page = PDFPage(image: img)!
//            callback(page)
//        }
//    }
}
