package entity

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/nwaples/rardecode"
	"io"
	"io/ioutil"
	"os"
	"strings"
)

type rarReadCloser struct {
	r *rardecode.Reader
	c io.Closer
}

func (rc rarReadCloser) Read(p []byte) (n int, err error) {
	return rc.r.Read(p)
}

func (rc rarReadCloser) Close() error {
	return nil
}

func readRarFile(source, name string, password string) (io.ReadCloser, error) {
	f, err := os.Open(source)
	if err != nil {
		return nil, err
	}
	rr, err := rardecode.NewReader(f, password)
	if err != nil {
		fmt.Println("readRarFile:", err)
		return nil, err
	}
	for {
		header, err := rr.Next()
		if err == io.EOF {
			break
		}
		if err == nil && header.Name == name {
			return rarReadCloser{rr, f}, nil
		}
	}
	return nil, errors.New("readRarFile: file with specific name not found")
}

func tryRarKey(source string, passwords []string) (key string, err error) {
	for _, p := range passwords {
		ok := true
		f, err := os.Open(source)
		if err != nil {
			return "", err
		}
		rr, err := rardecode.NewReader(f, p)
		if err != nil {
			ok = false
		}
		for {
			header, err := rr.Next()
			if err == io.EOF {
				break
			} else if err != nil {
				ok = false
				break
			}

			if header.IsDir {
				continue
			}

			_, err = io.Copy(bytes.NewBufferString(""), rr)
			if err != nil {
				ok = false
			}
			break
		}
		f.Close()
		if ok {
			return p, nil
		}
	}
	return
}

// Driver
type RarDriver struct{}

func (d RarDriver) ReadKey(b *Book) (string, error) {
	return tryRarKey(b.Locator, append([]string{""}, strings.Split(b.Options.Keys, " ")...))
}

func (d RarDriver) ReadList(b *Book) (paths []string, err error) {
	f, err := os.Open(b.Locator)
	if err != nil {
		return
	}
	defer f.Close()
	rr, err := rardecode.NewReader(f, b.Key)
	if err != nil {
		return
	}
	for {
		header, err := rr.Next()
		if err == io.EOF {
			break
		}
		if err == nil && !header.IsDir && isImageSupported(header.Name) {
			paths = append(paths, header.Name)
		}
	}
	return paths, nil
}

func (d RarDriver) ReadMeta(b *Book) (m BookMeta, err error) {
	rr, err := readRarFile(b.Locator, "book.json", b.Key)
	if err != nil {
		return
	}
	data, err := ioutil.ReadAll(rr)
	if err == nil {
		err = json.Unmarshal(data, &m)
	}
	return
}

func (d RarDriver) ReadPage(b *Book, locator string) (io.ReadCloser, error) {
	return readRarFile(b.Locator, locator, b.Key)
}
