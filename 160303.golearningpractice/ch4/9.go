package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var freq = map[string]int{}
	input := bufio.NewScanner(os.Stdin)
	input.Split(bufio.ScanWords)
	for input.Scan() {
		freq[input.Text()]++
	}
	for t, n := range freq {
		if n > 1 {
			fmt.Println(t, n, "times")
		}
	}
}
