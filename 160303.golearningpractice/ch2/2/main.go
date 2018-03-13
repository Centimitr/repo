package main

import (
	"fmt"
	"lenconv"
	"os"
	"strconv"
	"tempconv"
)

func main() {
	var unitType string = os.Args[1]
	for _, arg := range os.Args[2:] {
		v, err := strconv.ParseFloat(arg, 64)
		if err != nil {
			fmt.Fprintf(os.Stderr, "cf: %v\n", err)
			os.Exit(1)
		}
		switch unitType {
		case "l":
			fallthrough
		case "len":
			fallthrough
		case "length":
			m := lenconv.Meter(v)
			in := lenconv.Inch(v)
			fmt.Printf("%s = %s, %s = %s\n",
				m, lenconv.MToIn(m), in, lenconv.InToM(in))
		case "t":
			fallthrough
		case "temp":
			fallthrough
		case "temperature":
			f := tempconv.Fahrenheit(v)
			c := tempconv.Celsius(v)
			fmt.Printf("%s = %s, %s = %s\n",
				f, tempconv.FToC(f), c, tempconv.CToF(c))
		}
	}
}
