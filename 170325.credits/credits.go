package credits

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"path/filepath"
)

type Package struct {
	Name     string `json:"name"`
	Author   string `json:"author"`
	Email    string `json:"email"`
	Homepage string `json:"homepage"`
	License  string `json:"license"`
}

type Item struct {
	Package Package `json:"package"`
	License string  `json:"license"`
}

type Collection struct {
	Items map[string]Item
}

func (c *Collection) Init() {
	c.Items = make(map[string]Item)
}
func (c *Collection) ensure(path string) Item {
	if _, ok := c.Items[path]; !ok {
		c.Items[path] = Item{}
	}
	return c.Items[path]
}
func (c *Collection) Add(path string) {
	dir, name := filepath.Split(path)
	i := c.Items[dir]
	switch name {
	case "LICENSE.txt":
		fallthrough
	case "LICENSE":
		f, _ := ioutil.ReadFile(path)
		i.License = string(f)
	case "package.json":
		f, _ := ioutil.ReadFile(path)
		json.Unmarshal(f, &i.Package)
	default:
		return
	}
	c.Items[dir] = i
}
func (c *Collection) Clean() {
	//for _, i := range c.Items {
	//	if i.License == "" {
	//		delete(c.Items, k)
	//	}
	//}
}

func (c *Collection) Resolve(path string) {
	filepath.Walk(filepath.Join(path, "node_modules"), func(path string, info os.FileInfo, err error) error {
		c.Add(path)
		return nil
	})
	c.Clean()
}

var c Collection

func init() {
	c.Init()
}

func Ins() *Collection {
	return &c
}
