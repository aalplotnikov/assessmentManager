package controllers

import (
	"github.com/revel/revel"
)

type App struct {
	*revel.Controller
}

// Init интерцептор контроллера CIndex
func (c App) Init() revel.Result {
	return nil
}

func (c App) Index() revel.Result {
	return c.Render()
}
