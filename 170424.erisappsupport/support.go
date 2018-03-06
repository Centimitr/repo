package main

import (
	"encoding/json"
	"erisapp.com/entity"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
)

var api API

func main() {
	http.HandleFunc("/", func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Access-Control-Allow-Origin", "*")
		res.Write([]byte("Hello"))
	})
	http.HandleFunc("/book", func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Access-Control-Allow-Origin", "*")
		res.Header().Set("Content-Type", "text/json; charset=utf-8")
		req.ParseForm()
		locator := req.Form.Get("locator")
		keys := req.Form.Get("keys")

		api.GetBook(locator, keys, res)
	})
	http.HandleFunc("/book/page", func(res http.ResponseWriter, req *http.Request) {
		//toUint := func(s string, defaultValue uint) uint {
		//	i, err := strconv.Atoi(s)
		//	if err != nil || i < 0 {
		//		return defaultValue
		//	}
		//	return uint(i)
		//}
		res.Header().Set("Access-Control-Allow-Origin", "*")
		req.ParseForm()
		locator := req.Form.Get("locator")
		keys := req.Form.Get("keys")
		page := req.Form.Get("page")
		//mw := toUint(req.Form.Get("maxWidth"), 100000)
		//mh := toUint(req.Form.Get("maxHeight"), 100000)

		api.GetBookPage(locator, keys, page, res)
	})
	http.HandleFunc("/pack", func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Access-Control-Allow-Origin", "*")
		res.Header().Set("Content-Type", "text/json; charset=utf-8")
		req.ParseForm()
		//fmt.Println(req.Form)
		//dst := req.Form.Get("dst")
		//bmj := req.Form.Get("bookMeta")
		body, err := ioutil.ReadAll(req.Body)
		fmt.Println(body)
		if err != nil {
			fmt.Println("req body", err)
		}
		defer req.Body.Close()
		b := struct {
			Dst      string
			BookMeta *entity.BookMeta
		}{}
		json.Unmarshal(body, &b)
		fmt.Println(b)

		//api.MakeErisFromFolder(path, dst)
		api.PackErisFile(b.BookMeta, b.Dst)
	})

	// port config
	port := 3455
	if len(os.Args) > 1 {
		port, _ = strconv.Atoi(os.Args[1])
	}

	// http2 cert and key
	certFile := createTempFile("com.devbycm.eris.support", []byte(_TLS_CERT))
	keyFile := createTempFile("com.devbycm.eris.support", []byte(_TLS_KEY))
	defer os.Remove(certFile)
	defer os.Remove(keyFile)

	//log.Fatal(http.ListenAndServe(fmt.Sprintf("127.0.0.1:%d", port), nil))
	log.Fatal(http.ListenAndServeTLS(fmt.Sprintf("127.0.0.1:%d", port), certFile, keyFile, nil))
}

//func mainx() {
//	server.HandleFunc("a", func() {
//		fmt.Println(1)
//	})
//	for {
//		var v string
//		fmt.Scan(&v)
//		server.Handle("a")
//	}
//}
