package main

import (
	"fmt"
	"unicode/utf8"
)

func reverse(s []byte) {
	for i := 0; i < len(s); {
		_, size := utf8.DecodeRune(s[i:])
		//reverse current rune
		for j, k := i, i+size-1; j < k; j, k = j+1, k-1 {
			s[j], s[k] = s[k], s[j]
		}
		i += size
	}
	//reverse all
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
}
func main() {
	s := []byte("2016暑期实习")
	fmt.Printf("%s\n", s)
	reverse(s)
	// or s = reverse(s)
	fmt.Printf("%s\n", s)
}
