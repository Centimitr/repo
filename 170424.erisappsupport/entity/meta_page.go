package entity

import (
	_ "golang.org/x/image/webp"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"io"
)

type PageMeta struct {
	parent  *Book
	Locator string
	SubBook string

	//Type   string
	//Width  int
	//Height int
}

func (p *PageMeta) GetFile() (io.ReadCloser, error) {
	return p.parent.driver.ReadPage(p.parent, p.Locator)
}

func (p *PageMeta) Init() error {
	//img, err := p.GetFile()
	//if err != nil {
	//	return err
	//}
	//now := time.Now()
	//cfg, t, err := image.DecodeConfig(img)
	//fmt.Println(p.Locator, time.Since(now))
	//if err == nil {
	//	p.Type = t
	//	p.Width = cfg.Width
	//	p.Height = cfg.Height
	//} else {
	//	fmt.Println(err)
	//}
	//img.Close()
	return nil
}
