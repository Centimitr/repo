package main

import (
	"fmt"
	"os"
	"strconv"
	"tempconv"
)

func main() {
	for _, arg := range os.Args[1:] {
		t, err := strconv.ParseFloat(arg, 64)
		if err != nil {
			fmt.Fprintf(os.Stderr, "cf: %v\n", err)
			os.Exit(1)
		}
		c := tempconv.Celsius(t)
		k := tempconv.Kelvin(t)
		fmt.Printf("%s = %s, %s = %s\n",
			c, tempconv.KToC(k), k, tempconv.CToK(c))
	}
}
