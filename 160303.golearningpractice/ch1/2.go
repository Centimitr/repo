package main

import (
	"fmt"
	"os"
)

func main() {
	for i, param := range os.Args[1:] {
		fmt.Println(i, param)
	}
}
