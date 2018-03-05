package main

import "testing"

func BenchmarkParseWikiXmlToPages(b *testing.B) {
	for i := 0; i < b.N; i++ {
		wikiXmlToPages()
	}
}

func BenchmarkPagesToIndex(b *testing.B) {
	for i := 0; i < b.N; i++ {
		pagesToIndex()
	}
}
