package controllers

import (
	"encoding/json"
	"io/ioutil"
	"myapp/app/models/entities"
	"myapp/app/models/providers/assessment_provider"

	"github.com/revel/revel"
)

// CAssessment
type CAssessment struct {
	*revel.Controller
	provider *assessment_provider.PAssessment
}

// Init интерцептор контроллера CAssessment
func (c *CAssessment) Init() revel.Result {
	var (
		err error // ошибка в ходе выполнения функции
	)

	// инициализация провайдера
	c.provider = new(assessment_provider.PAssessment)
	err = c.provider.Init()
	if err != nil {
		revel.AppLog.Errorf("CAssessment.Init : c.provider.Init, %s\n", err)
		return c.RenderJSON(err.Error())
	}

	return nil
}

// Destroy контроллера CAssessment
func (c *CAssessment) Destroy() {
	c.Controller.Destroy()

	// удаление ссылки на провайдер
	c.provider = nil
}

// GetAll получение всех ассессментов
func (c *CAssessment) GetAll() revel.Result {
	// получение ассессмента
	assessment, err := c.provider.GetAssessments()
	if err != nil {
		revel.AppLog.Errorf("CAssessment.GetAll : c.provider.GetAssessments, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CAssessment.GetAll : c.provider.GetAssessments, assessment: %+v\n", assessment)

	// рендер положительного результата
	return c.RenderJSON(Succes(assessment))
}

func (c *CAssessment) GetByID(id int64) revel.Result {
	assessment, err := c.provider.GetAssessmentByid(id)
	if err != nil {
		revel.AppLog.Errorf("CAssessment.GetByID : c.provider.GetAssessmentByid, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CAssessment.GetByID : c.provider.GetAssessmentByid, assessment: %+v\n", assessment)
	return c.RenderJSON(Succes(assessment))
}

func (c *CAssessment) Create() revel.Result {
	var (
		assessment *entities.Assessment
		err        error
	)

	assessment, err = c.fetchPostAssessment()
	if err != nil {
		revel.AppLog.Errorf("CAssessment.Create : c.fetchPostAssessment, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	assessment, err = c.provider.CreateAssessment(assessment)
	if err != nil {
		revel.AppLog.Errorf("CAssessment.Create : c.provider.CreateAssessment, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CAssessment.Create : c.provider.CreateAssessment, assessment: %+v\n", assessment)
	return c.RenderJSON(Succes(assessment))
}

func (c *CAssessment) Update() revel.Result {
	var (
		assessment *entities.Assessment
		err        error
	)

	assessment, err = c.fetchPostAssessment()
	if err != nil {
		revel.AppLog.Errorf("CAssessment.Create : c.fetchPostAssessment, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	assessment, err = c.provider.UpdateAssessment(assessment)
	if err != nil {
		revel.AppLog.Errorf("CAssessment.Create : c.provider.UpdateAssessment, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CAssessment.Create : c.provider.UpdateAssessment, assessment: %+v\n", assessment)
	return c.RenderJSON(Succes(assessment))
}

func (c *CAssessment) Status(id int64) revel.Result {
	var (
		assessment *entities.Assessment
		err        error
	)
	assessment, err = c.fetchPostAssessment()
	if err != nil {
		revel.AppLog.Errorf("CAssessment.Create : c.fetchPostAssessment, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	err = c.provider.UpdateStatus(id, assessment)
	if err != nil {
		revel.AppLog.Errorf("CAssessment.Status : c.provider.UpdateStatus, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CAssessment.Status : c.provider.UpdateStatus, assessment: %+v\n", assessment)
	return c.RenderJSON(Succes(assessment))
}

func (c *CAssessment) Delete() revel.Result {
	var (
		assessment *entities.Assessment
		err        error
	)

	assessment, err = c.fetchPostAssessment()
	if err != nil {
		revel.AppLog.Errorf("CAssessment.Create : c.fetchPostAssessment, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	err = c.provider.DeleteAssessment(assessment)
	if err != nil {
		revel.AppLog.Errorf("CAssessment.Create : c.provider.DeleteAssessment, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CAssessment.Create : c.provider.DeleteAssessment, assessment: %+v\n", assessment)
	return c.RenderJSON(Succes(assessment))
}

func (c *CAssessment) fetchPostAssessment() (assessment *entities.Assessment, err error) {
	var (
		rawRequest []byte // байтовое представление тела запроса
	)

	// получение тела запроса
	rawRequest, err = ioutil.ReadAll(c.Request.GetBody())
	if err != nil {
		revel.AppLog.Errorf("CAssessment.fetchPostAssessment : ioutil.ReadAll, %s\n", err)
		return
	}

	// преобразование тела запроса в структуру сущности
	err = json.Unmarshal(rawRequest, &assessment)
	if err != nil {
		revel.AppLog.Errorf("CAssessment.fetchPostAssessment : json.Unmarshal, %s\n", err)
		return
	}

	revel.AppLog.Debugf("CAssessment.fetchPostAssessment, assessment: %+v\n", assessment)

	return
}
