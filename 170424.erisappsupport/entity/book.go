package entity

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
)

func trimLocator(locator string) (l string, ext string, isFs bool, err error) {
	fi, err := os.Stat(locator)
	fmt.Println(locator)
	if err != nil {
		return
	}
	if fi.IsDir() {
		return locator, "", true, nil
	} else {
		switch true {
		case isBookSupported(locator):
			return locator, filepath.Ext(locator), false, nil
		case isImageSupported(locator):
			return filepath.Dir(locator), filepath.Ext(locator), true, nil
		default:
			return "", "", false, errors.New("unknown book/image with specific locator")
		}
	}
}

type Options struct {
	Keys string
}

type Book struct {
	Locator string
	Meta    *BookMeta
	Options *Options
	Key     string
	driver  Driver
}

func (b *Book) Init(locator string) error {
	l, ext, isFs, err := trimLocator(locator)
	if err != nil {
		return err
	}

	// choose driver
	if isFs {
		b.driver = FSDriver{}
	} else {
		switch ext {
		case ".eris":
			b.driver = ErisDriver{}
		case ".rar":
			b.driver = RarDriver{}
		case ".cbr":
			b.driver = RarDriver{}
		case ".zip":
			b.driver = ZipDriver{}
		case ".cbz":
			b.driver = ZipDriver{}
		default:
			return errors.New("format not matched")
		}
	}

	// book: configure
	b.Locator = l
	b.Key, err = b.driver.ReadKey(b)
	if err != nil {
		return err
	}

	// meta: init
	m, err := b.driver.ReadMeta(b)
	if err != nil {
		fmt.Println("book.json:", err)
	}
	m.Locator = b.Locator
	m.parent = b
	m.SetPages()
	m.SetSubBooks()

	// meta: name
	if m.Name == "" {
		_, m.Name = filepath.Split(locator)
	}

	// set lastRead when FSDriver
	if isFs {
		m.SetLastRead(locator)
	}

	b.Meta = &m
	return nil
}
