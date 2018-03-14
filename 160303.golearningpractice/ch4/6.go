package main

import (
	"fmt"
	// "unicode"
	"unicode/utf8"
)

func removeDupSpace(s []byte) []byte {
	olen := len(s)
	formerIsSpace := false
	for i := 0; i < olen; {
		r, size := utf8.DecodeRune(s[i:])
		if r == rune(' ') {
			if formerIsSpace {
				copy(s[i:], s[i+1:])
				olen--
			}
			formerIsSpace = true
		} else {
			formerIsSpace = false
		}
		i += size
	}
	return s[:olen]
}

func main() {
	slice := []byte("  你  好  !  ")
	fmt.Println(slice)
	slice = removeDupSpace(slice)
	fmt.Println(slice)
}
