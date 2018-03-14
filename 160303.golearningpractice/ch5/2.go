package main

import (
	"fmt"
	"golang.org/x/net/html"
	"os"
)

var cnt = make(map[string]int)

func main() {
	doc, err := html.Parse(os.Stdin)
	if err != nil {
		fmt.Fprintf(os.Stderr, "outline: %v\n", err)
		os.Exit(1)
	}
	count(doc)
	fmt.Println(cnt)
}

// func outline(stack []string, n *html.Node) {
func count(n *html.Node) {
	if n.Type == html.ElementNode {
		// stack = append(stack, n.Data)
		// fmt.Println(stack)
		cnt[n.Data]++
	}
	for c := n.FirstChild; c != nil; c = c.NextSibling {
		// outline(stack, c)
		count(c)
	}
}
