package main

import (
	"fmt"
)

func clearDup(strings []string) []string {
	out := strings[:1]
	olen := len(strings)
	for _, s := range strings {
		if out[len(out)-1] != s {
			out = append(out, s)
			olen--
		}
	}
	return out
}

func main() {
	strings := []string{"dup", "a", "b", "dup", "dup", "c", "dup", "d", "dup"}
	fmt.Println(strings)
	strings = clearDup(strings)
	fmt.Println(strings)
}
