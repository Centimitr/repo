package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"unicode"
)

func main() {
	letter := 0
	graphic := 0
	digit := 0
	invalid := 0

	in := bufio.NewReader(os.Stdin)
	for {
		r, n, err := in.ReadRune()
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Fprintf(os.Stderr, "charcount: %v\n", err)
			os.Exit(1)
		}
		if r == unicode.ReplacementChar && n == 1 {
			invalid++
			continue
		}
		if unicode.IsLetter(r) {
			letter++
		} else if unicode.IsGraphic(r) {
			graphic++
		} else if unicode.IsDigit(r) {
			digit++
		}
	}
	fmt.Println(letter, graphic, digit, invalid)
}
