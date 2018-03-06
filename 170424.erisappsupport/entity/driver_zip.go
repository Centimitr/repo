package entity

import (
	"archive/zip"
	"encoding/json"
	"errors"
	"io"
	"io/ioutil"
	"strings"
)

type ZipDriver struct {
}

func (d ZipDriver) ensure(locator string) error {
	return nil
}

func (d ZipDriver) ReadKey(b *Book) (string, error) {
	return "", nil
}

type wrapReadCloser struct {
	rc io.ReadCloser
	c  io.Closer
}

func (rc wrapReadCloser) Read(p []byte) (n int, err error) {
	return rc.rc.Read(p)
}

func (rc wrapReadCloser) Close() (err error) {
	err = rc.c.Close()
	if err != nil {
		return err
	}
	err = rc.rc.Close()
	return
}

func readZipContentFile(locator, name string) (io.ReadCloser, error) {
	rc, err := zip.OpenReader(locator)
	if err != nil {
		return nil, err
	}
	for _, f := range rc.File {
		if f.FileInfo().Name() == name {
			frc, err := f.Open()
			return wrapReadCloser{frc, rc}, err
		}
	}
	return nil, errors.New("readZipContentFile: specific file not found: " + locator + " " + name)
}

func (d ZipDriver) ReadList(b *Book) ([]string, error) {
	paths := []string{}
	r, err := zip.OpenReader(b.Locator)
	if err != nil {
		return nil, err
	}
	defer r.Close()

	for _, f := range r.File {
		i := f.FileInfo()
		name := i.Name()
		if err == nil && !i.IsDir() && !strings.HasPrefix(name, ".") && isImageSupported(name) {
			paths = append(paths, name)
		}
	}
	return paths, nil
}

func (d ZipDriver) ReadMeta(b *Book) (m BookMeta, err error) {
	tr, err := readZipContentFile(b.Locator, "book.json")
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

func (d ZipDriver) ReadPage(b *Book, id string) (io.ReadCloser, error) {
	return readZipContentFile(b.Locator, id)
}
