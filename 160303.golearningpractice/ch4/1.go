package main

import (
	"crypto/sha256"
	"fmt"
)

// wait to verify whether the code is right

var pc [256]byte

func init() {
	for i := range pc {
		pc[i] = pc[i/2] + byte(i&1)
	}
}

func main() {
	c1 := sha256.Sum256([]byte("x"))
	c2 := sha256.Sum256([]byte("X"))
	// fmt.Printf("%x\n%x\n%t\n%T\n", c1, c2, c1 == c2, c1)
	fmt.Println(difBitsCount(c1, c2))
}

func difBitsCount(c1, c2 [32]byte) int {
	cnt := 0
	if c1 == c2 {
		return 0
	}
	for i := 0; i < 32; i++ {
		cnt += int(pc[c1[i]&c2[i]])
	}
	return cnt
}
