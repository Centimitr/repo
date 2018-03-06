package main

import (
	"archive/tar"
	"encoding/json"
	"erisapp.com/entity"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"time"
)

var r entity.Reader

type API struct{}

func init() {
	r.Init()
}

func (a *API) GetBook(locator string, keys string, w io.Writer) {
	book, err := r.Get(locator, &entity.Options{Keys: keys})
	if err != nil {
		fmt.Println(500)
		return
	}
	content, _ := json.Marshal(book.Meta)
	w.Write(content)
}

func (a *API) GetBookPage(locator string, keys string, pageLocator string, w io.Writer) {
	book, err := r.Get(locator, &entity.Options{Keys: keys})
	if err != nil {
		fmt.Println(500)
		return
	}
	pm := book.Meta.GetPage(pageLocator)
	file, err := pm.GetFile()
	if err != nil {
		fmt.Println(500, err)
		return
	}
	defer file.Close()
	io.Copy(w, file)
}

func (a *API) MakeErisFromFolder(path string, dst string) {

	name := ""
	text, err := ioutil.ReadFile(filepath.Join(path, "book.json"))
	bm := &entity.BookMeta{}
	if err == nil {
		if err := json.Unmarshal(text, &bm); err == nil {
			name = bm.Name
		}
	}
	if name == "" {
		name = string(time.Now().UnixNano())
	}
	name += ".eris"
	fmt.Println(name)

	os.MkdirAll(dst, 0777)
	f, _ := os.Create(filepath.Join(dst, name))
	defer f.Close()
	tw := tar.NewWriter(f)

	files, err := ioutil.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}
	for _, file := range files {
		hdr := &tar.Header{
			Name: file.Name(),
			Mode: 0600,
			Size: file.Size(),
		}
		if err := tw.WriteHeader(hdr); err != nil {
			log.Fatalln(err)
		}
		bytes, err := ioutil.ReadFile(filepath.Join(path, file.Name()))
		if err != nil {
			log.Fatalln(err)
		}
		if _, err := tw.Write(bytes); err != nil {
			log.Fatalln(err)
		}
	}
	if err := tw.Close(); err != nil {
		log.Fatalln(err)
	}
}

func (a *API) PackErisFile(bm *entity.BookMeta, dst string) {
	dir := filepath.Dir(dst)
	err := os.MkdirAll(dir, 0777)
	fmt.Println(dir)
	f, err := os.Create(dst)
	if err != nil {
		fmt.Println(500, err)
		return
	}
	defer f.Close()
	tw := tar.NewWriter(f)

	writeFile := func(tw *tar.Writer, path string, name string) (fileName string) {
		info, err := os.Stat(path)
		if err != nil {
			fmt.Println(500, err)
		}
		fmt.Println(name)
		if name == "" {
			name = info.Name()
		}
		fmt.Println(name)
		hdr := &tar.Header{
			Name: name,
			Mode: 0600,
			Size: info.Size(),
		}
		if err := tw.WriteHeader(hdr); err != nil {
			log.Fatalln(err)
		}
		bytes, err := ioutil.ReadFile(path)
		if err != nil {
			log.Fatalln(err)
		}
		if _, err := tw.Write(bytes); err != nil {
			log.Fatalln(err)
		}
		return name
	}
	for _, pm := range bm.Pages {
		pm.Locator = writeFile(tw, pm.Locator, "")
	}

	bookJson, err := json.Marshal(bm)
	if err != nil {
		fmt.Println(err)
	}
	bookJsonTemp := createTempFile("com.devbycm.eris.support", bookJson)
	defer os.Remove(bookJsonTemp)
	writeFile(tw, bookJsonTemp, "book.json")

	if err := tw.Close(); err != nil {
		log.Fatalln(err)
	}
}
