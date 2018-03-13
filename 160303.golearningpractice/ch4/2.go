package main

import (
	"crypto/sha256"
	"crypto/sha512"
	"fmt"
	"os"
)

func main() {
	a := ""
	if len(os.Args) > 1 {
		a = os.Args[1]
	} else {
		a = "sha256"
	}
	text := fmt.Sprint(os.Stdin)
	bytes := []byte(text)
	switch a {
	case "sha384":
		fmt.Fprint(os.Stdout, sha512.Sum512(bytes))
	case "sha512":
		fmt.Fprint(os.Stdout, sha512.Sum384(bytes))
	case "sha256":
		fallthrough
	default:
		fmt.Fprint(os.Stdout, sha256.Sum256(bytes))
	}
}
