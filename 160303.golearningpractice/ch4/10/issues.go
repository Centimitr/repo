package main

import (
	"fmt"
	"issues/github"
	"log"
	"os"
	"sort"
	"time"
)

func main() {
	result, err := github.SearchIssues(os.Args[1:])
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%d issues:\n", result.TotalCount)
	sort.Sort(github.ByTime(result.Items))

	var withinMonth, withinYear, overYear = false, false, false
	for _, item := range result.Items {
		m := time.Since(item.CreatedAt).Hours() / 24 / 30
		switch {
		case !withinMonth && m-1 <= 0:
			fmt.Println("\nWithin a month:")
			withinMonth = true
		case !withinYear && m-12 <= 0:
			fmt.Println("\nWithin a year:")
			withinYear = true
		case !overYear && m-12 > 0:
			fmt.Println("\nOver a year:")
			overYear = true
		}
		fmt.Printf("#%-5d %.10s %9.9s %.55s\n",
			item.Number, item.CreatedAt, item.User.Login, item.Title)
	}
}
