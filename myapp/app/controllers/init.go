package controllers

import (
	"github.com/revel/revel"
)

func init() {
	// Инициализация интерцепторов
	revel.InterceptMethod((*CAssessment).Init, revel.BEFORE)
	revel.InterceptMethod((*CEmployee).Init, revel.BEFORE)
	revel.InterceptMethod((*CCandidate).Init, revel.BEFORE)
	revel.InterceptMethod((*CPosition).Init, revel.BEFORE)
}
