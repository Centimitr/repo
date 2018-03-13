package main

import (
	"fmt"
)

func rotate(s []int) {
	first := s[0]
	for i := 0; i < len(s)-1; i++ {
		s[i] = s[i+1]
	}
	s[len(s)-1] = first
}

func main() {
	s := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
	rotate(s)
	fmt.Println(s)
	rotate(s)
	fmt.Println(s)
	rotate(s)
	fmt.Println(s)
}
