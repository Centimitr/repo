package main

import (
	"encoding/json"
	"fmt"
	"github.com/centimitr/credits"
	"io/ioutil"
	"os"
	"path/filepath"
)

func main() {
	var paths []string
	var outputPath string

	if len(os.Args) > 1 {
		outputPath = os.Args[1]
	}
	if len(os.Args) > 2 {
		paths = os.Args[2:]
	} else {
		paths = []string{os.Args[0]}
	}

	c := credits.Ins()
	for _, p := range paths {
		c.Resolve(p)
	}
	b, err := json.Marshal(c)
	if err != nil {
		fmt.Println(err, b)
	}

	if outputPath == "" {
		fmt.Println(c.Items)
	} else {
		ioutil.WriteFile(filepath.Join(outputPath, "credits.json"), b, 0666)
	}
}
