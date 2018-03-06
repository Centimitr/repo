package entity

import (
	"fmt"
	"path/filepath"
)

type BookMeta struct {
	parent  *Book
	Locator string

	Name      string
	Author    string
	Publisher string
	Pages     []*PageMeta
	LastRead  string
}

func (bm *BookMeta) SetPages() {
	if len(bm.Pages) == 0 {
		paths, _ := bm.parent.driver.ReadList(bm.parent)
		for _, p := range paths {
			pm := PageMeta{
				parent:  bm.parent,
				Locator: p,
				SubBook: filepath.Dir(p),
			}
			err := pm.Init()
			if err == nil {
				bm.Pages = append(bm.Pages, &pm)
			} else {
				fmt.Println("SetPages:", p, err)
			}
		}

	} else {
		for _, pm := range bm.Pages {
			pm.parent = bm.parent
			err := pm.Init()
			if err != nil {
				fmt.Println(err)
			}
		}
	}
}

func (bm *BookMeta) SetSubBooks() {
	// require pages
}

func (bm *BookMeta) SetLastRead(locator string) {
	// require pages
	_, l := filepath.Split(locator)
	for _, pm := range bm.Pages {
		if pm.Locator == l {
			bm.LastRead = pm.Locator
		}
	}
}

func (bm *BookMeta) GetPage(locator string) (pm *PageMeta) {
	for _, p := range bm.Pages {
		if p.Locator == locator {
			pm = p
		}
	}
	return
}
