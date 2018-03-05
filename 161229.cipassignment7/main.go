package main

import (
	"os"
	"encoding/xml"
	"strings"
	"io/ioutil"
	"path/filepath"
	"bufio"
	"bytes"
	"regexp"
	"net/http"
	"log"
	//"io"
	"fmt"
	"io"
)

const XML_FILE_PATH = "./simplewiki-latest-pages-articles.xml"
const OUTPUT_PATH = "../pages/"

type Page struct {
	Title string `xml:"title"`
	Id    string `xml:"id"`
	Text  string `xml:"revision>text"`
}

var index = make(map[string]map[string]int)

func wikiXmlToPages() {
	f, _ := os.Open(XML_FILE_PATH)
	defer f.Close()

	decoder := xml.NewDecoder(f)
	for {
		token, _ := decoder.Token()
		if token == nil {
			break
		}

		switch t := token.(type) {
		case xml.StartElement:
			if t.Name.Local == "page" {
				var p Page
				decoder.DecodeElement(&p, &t)
				if strings.ContainsRune(p.Title, ':') {
					go func() {
						ioutil.WriteFile(OUTPUT_PATH+p.Id, []byte(p.Text), 777)
					}()
				}
			}
		}
	}
}
func pagesToIndex() {
	validWord := regexp.MustCompile(`^[a-zA-Z]+$`)

	filepath.Walk(OUTPUT_PATH, func(path string, info os.FileInfo, err error) error {
		if info.IsDir() {
			return nil
		}
		text, _ := ioutil.ReadFile(path)
		scanner := bufio.NewScanner(bytes.NewReader(text))
		scanner.Split(bufio.ScanWords)
		// Scan.
		for scanner.Scan() {
			text := scanner.Text()
			if validWord.MatchString(text) {
				if index[text] == nil {
					index[text] = make(map[string]int)
				}
				index[text][info.Name()]++
			}
		}
		return nil
	})
	//l:=0
	//for w,v:=range index{
	//	l+=len(v)
	//	fmt.Println(w)
	//}
	//fmt.Println("Words:", len(index), "All Mappings:", l)
}

func getIndexResult(w http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	wd := req.Form.Get("wd")
	w.Header().Add("Access-Control-Allow-Origin", "*")
	fmt.Fprintf(w, "%v", index[wd])
}

func getPageFile(w http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	id := req.Form.Get("id")
	w.Header().Add("Access-Control-Allow-Origin", "*")
	b, _ := ioutil.ReadFile(OUTPUT_PATH + id)
	io.WriteString(w, string(b))
}

func main() {
	// wikiXmlToPages()
	pagesToIndex()

	http.HandleFunc("/index/", getIndexResult)
	http.HandleFunc("/page/", getPageFile)
	log.Fatal(http.ListenAndServe(":3000", nil))
}
