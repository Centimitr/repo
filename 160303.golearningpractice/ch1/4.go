package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	counts := make(map[string]int)
	files := os.Args[1:]
	if len(files) == 0 {
		countLines(os.Stdin, counts)
	} else {
		for _, arg := range files {
			f, err := os.Open(arg)
			if err != nil {
				fmt.Fprintln(os.Stderr, err)
				continue
			}
			if countLines(f, counts) {
				fmt.Println(arg)
			}
			f.Close()
		}
	}
	for line, n := range counts {
		if n > 1 {
			fmt.Println(n, line)
		}
	}
}

func countLines(f *os.File, counts map[string]int) (isRepeat bool) {
	isRepeat = false
	input := bufio.NewScanner(f)
	for input.Scan() {
		if counts[input.Text()] > 0 {
			isRepeat = true
		}
		counts[input.Text()]++
	}
	return
}
