package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	"strings"
)

func main() {
	sum := 0
	file := os.Args[1]
	content, _ := ioutil.ReadFile(file)
	scores := strings.Split(string(content), ",")
	for _, scoreStr := range scores {
		score, _ := strconv.Atoi(scoreStr)
		sum += score
	}
	fmt.Println(float64(sum) / float64(len(scores)))
}
