//
//  ViewController.swift
//  Remote Browser
//
//  Created by Xiao Shi on 5/12/17.
//  Copyright © 2017 devbycm. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var pagesView: UIView!
    @IBOutlet weak var coverView: UIView!
    
    override var prefersStatusBarHidden: Bool {
        return true
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        pagesView.frame = UIScreen.main.bounds
        coverView.frame = UIScreen.main.bounds
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

