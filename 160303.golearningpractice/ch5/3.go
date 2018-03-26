package main

import (
	"fmt"
	"golang.org/x/net/html"
	"os"
)

func main() {
	doc, err := html.Parse(os.Stdin)
	if err != nil {
		fmt.Fprintf(os.Stderr, "outline: %v\n", err)
		os.Exit(1)
	}
	text(doc)
}

func text(n *html.Node) {
	if n.Type == html.TextNode && n.Parent.Data != "script" && n.Parent.Data != "style" {
		fmt.Println(n.Data)
	}
	if n.NextSibling != nil {
		text(n.NextSibling)
	}
	if n.FirstChild != nil {
		text(n.FirstChild)
	}
}
