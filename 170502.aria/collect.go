package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
	"time"
)

const APP_PATH = "./_project"
const APP_RESERVE_PATH = "./_project/_reserve"
const APP_SRC_PATH = "./_project/src"
const APP_DIST_PATH = "./_project/dist"
const PATH_MAP_PATH = "./app/path.js"
const PATH_MAP_BLOCK = "// COLLECT: MODIFY ENTRIES"
const PATH_MAP_TARGET = `const TARGET = '$'`

func replace(filename, from, to string) {
	txt, _ := ioutil.ReadFile(filename)
	txt = []byte(strings.Replace(string(txt), from, to, 1))
	ioutil.WriteFile(filename, txt, 666)
}

func replacePrevBlock(filename, block, to string) {
	txt, _ := ioutil.ReadFile(filename)
	ioutil.WriteFile(filename, []byte(to+strings.Split(string(txt), block)[1]), 666)
}

func task(name string, fn func()) {
	t0 := time.Now()
	fn()
	fmt.Println(name+":", time.Now().Sub(t0))
}

func buildAngularApp() {
	cmd := exec.Command("ng", "build")
	cmd.Dir = APP_PATH
	err := cmd.Run()
	if err != nil {
		fmt.Println(err)
	}
}
func serveAngularApp() {
	cmd := exec.Command("ng", "serve")
	cmd.Dir = APP_PATH
	cmd.Run()
}

func setAppPath(target string) {
	replacePrevBlock(PATH_MAP_PATH, PATH_MAP_BLOCK, strings.Replace(PATH_MAP_TARGET, "$", target, 1)+PATH_MAP_BLOCK)
}

func switchProject(name string) {
	setAppPath(name)
	b, err := ioutil.ReadFile(filepath.Join(APP_SRC_PATH, "app", "which"))
	if err == nil {
		which := strings.TrimSpace(string(b))
		backupFolder := filepath.Join(APP_RESERVE_PATH, "_former", which+"_"+strconv.Itoa(int(time.Now().Unix())))
		exec.Command("mv", filepath.Join(APP_RESERVE_PATH, which), backupFolder).Run()
		exec.Command("cp", "-rf", filepath.Join(APP_SRC_PATH, "app"), filepath.Join(APP_RESERVE_PATH, which)).Run()
	}
	exec.Command("rm", "-rf", filepath.Join(APP_SRC_PATH, "app")).Run()
	exec.Command("cp", "-rf", filepath.Join(APP_RESERVE_PATH, name), filepath.Join(APP_SRC_PATH, "app")).Run()
	exec.Command("cp", "-f", filepath.Join(APP_SRC_PATH, name+".html"), filepath.Join(APP_SRC_PATH, "index.html")).Run()
}

func build() {
	task("Total", func() {
		task("Build Main", func() {
			switchProject("main")
			buildAngularApp()
			exec.Command("cp", "-rf", APP_DIST_PATH, "./interface/main").Run()
			replace("./interface/main/index.html", `<base href="/">`, `<base href="./">`)
		})
		task("Build New", func() {
			switchProject("new")
			buildAngularApp()
			exec.Command("cp", "-rf", APP_DIST_PATH, "./interface/new").Run()
			replace("./interface/new/index.html", `<base href="/">`, `<base href="./">`)
		})
		task("Build App", func() {
			setAppPath("build")
			exec.Command("electron-builder", "--dir").Run()
		})
		task("Install App", func() {
			exec.Command("cp", "-rf", "./dist/mac/Downloads.app", "/Applications").Run()
		})
		fmt.Println()
	})
}

func main() {
	switch os.Args[1] {
	case "main":
		switchProject("main")
	case "new":
		switchProject("new")
	case "build":
		build()
	}
}
