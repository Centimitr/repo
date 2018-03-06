package server

type Handler (func())

type Router struct {
	m map[string]Handler
}

func (r *Router) Init() {
	r.m = make(map[string]Handler)
}

type Server struct {
	r Router
}

func (s *Server) Init() {
	s.r.Init()
}

func (s *Server) Handle(name string) {

	if fn, ok := s.r.m[name]; ok {
		fn()
	}
}

var s Server

func init() {
	s.Init()
}

func HandleFunc(name string, fn Handler) {
	s.r.m[name] = fn
}

func Handle(name string) {
	s.Handle(name)
}
