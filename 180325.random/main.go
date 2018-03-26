package main

import (
	"crypto/rand"
	"math/big"
	"fmt"
)

func randomBytes(n int) (b []byte, err error) {
	b = make([]byte, n)
	_, err = rand.Read(b)
	return
}
func randomIntn(max *big.Int) (n *big.Int, err error) {
	return rand.Int(rand.Reader, max)
}

func main() {
	m := big.NewInt(100 * 1000 * 1000)
	n, _ := randomIntn(m)
	fmt.Println(n)
}
