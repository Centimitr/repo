package main

import (
	"fmt"
	"math"
	"strconv"
)

const (
	width, height = 600, 320
	cells         = 100
	xyrange       = 30.0
	xyscale       = width / 2 / xyrange
	zscale        = height * 0.4
	angle         = math.Pi / 6
)

type Polygon struct {
	ax, ay, bx, by, cx, cy, dx, dy, virturalHeight float64
	color                                          string
}

var sin30, cos30 = math.Sin(angle), math.Cos(angle)

func main() {

	var polygons = []Polygon{}

	fmt.Printf("<svg xmlns='http://www.w3.org/2000/svg' "+
		"style='stroke: grey; fill: white; stroke-width: 0.7' "+
		"width='%d' height='%d'>", width, height)
	for i := 0; i < cells; i++ {
		for j := 0; j < cells; j++ {
			ax, ay, avh := corner(i+1, j)
			bx, by, bvh := corner(i, j)
			cx, cy, cvh := corner(i, j+1)
			dx, dy, dvh := corner(i+1, j+1)
			if isValid(ax, ay, width, height) && isValid(bx, by, width, height) && isValid(cx, cy, width, height) && isValid(dx, dy, width, height) {
				polygons = append(polygons, Polygon{ax, ay, bx, by, cx, cy, dx, dy, (avh + bvh + cvh + dvh) / 4, "#ff6666"})
			}
		}
	}
	var maxh, minh float64
	for i, p := range polygons {
		if i == 0 {
			maxh, minh = p.virturalHeight, p.virturalHeight
		} else if p.virturalHeight > maxh {
			maxh = p.virturalHeight
		} else if p.virturalHeight < minh {
			minh = p.virturalHeight
		}
	}
	hscale := maxh - minh
	// fmt.Printf("%.2f %.2f\n", maxh, minh)
	for _, p := range polygons {
		rf := ((p.virturalHeight - minh) / hscale) * 256
		bf := 256 - rf
		r := strconv.FormatInt(int64(math.Floor(rf)), 16)
		b := strconv.FormatInt(int64(math.Floor(bf)), 16)
		if len(r) == 1 {
			r = "0" + r
		}
		if len(b) == 1 {
			b = "0" + b
		}
		p.color = "#" + r + "00" + b
		// fmt.Println(p.color)
		fmt.Printf("<polygon points='%g,%g %g,%g %g,%g %g,%g' style='stroke:%s'/>\n",
			p.ax, p.ay, p.bx, p.by, p.cx, p.cy, p.dx, p.dy, p.color)
	}
	fmt.Println("</svg>")
}

func corner(i, j int) (float64, float64, float64) {
	x := xyrange * (float64(i)/cells - 0.5)
	y := xyrange * (float64(j)/cells - 0.5)

	z := f(x, y)

	sx := width/2 + (x-y)*cos30*xyscale
	sy := height/2 + (x+y)*sin30*xyscale - z*zscale
	return sx, sy, z
}

func f(x, y float64) float64 {
	r := math.Hypot(x, y)
	return math.Sin(r) / r
}

func isValid(x, y float64, width, height int) bool {
	return x >= 0 && x <= float64(width) && y >= 0 && y <= float64(height)
}
