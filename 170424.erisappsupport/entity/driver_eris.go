package entity

import (
	"archive/tar"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"
)

type ErisDriver struct {
}

func (d ErisDriver) ensure(locator string) error {
	return nil
}

type TarReadCloser struct {
	r *tar.Reader
	c io.Closer
}

func (rc *TarReadCloser) New(f *os.File) {
	tr := tar.NewReader(f)
	rc.r = tr
	rc.c = f
}

func (rc TarReadCloser) Read(p []byte) (n int, err error) {
	return rc.r.Read(p)
}

func (rc TarReadCloser) Close() error {
	return rc.c.Close()
}

func readErisContentFile(locator, name string) (io.ReadCloser, error) {
	f, _ := os.Open(locator)
	tr := TarReadCloser{}
	tr.New(f)
	for {
		hdr, err := tr.r.Next()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalln(err)
		}
		if hdr.Name == name {
			return tr, err
		}
	}
	return nil, errors.New("readErisContentFile: specific file not found: " + locator + name)
}

func (d ErisDriver) ReadKey(b *Book) (string, error) {
	return "", nil
}

func (d ErisDriver) ReadList(b *Book) ([]string, error) {
	paths := []string{}
	fmt.Println("ReadList:", "ErisDriver:", "this driver should not call this method!")
	return paths, nil
}

func (d ErisDriver) ReadMeta(b *Book) (m BookMeta, err error) {
	tr, err := readErisContentFile(b.Locator, "book.json")
	if err != nil {
		return
	}
	defer tr.Close()
	data, err := ioutil.ReadAll(tr)
	if err == nil {
		err = json.Unmarshal(data, &m)
	}
	return
}

func (d ErisDriver) ReadPage(b *Book, id string) (io.ReadCloser, error) {
	return readErisContentFile(b.Locator, id)
}
