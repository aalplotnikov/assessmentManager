package controllers

import (
	"encoding/json"
	"io/ioutil"
	"myapp/app/models/entities"
	"myapp/app/models/providers/candidate_provider"

	"github.com/revel/revel"
)

type CCandidate struct {
	*revel.Controller
	provider *candidate_provider.PCandidate
}

func (c *CCandidate) Init() revel.Result {
	var err error
	c.provider = new(candidate_provider.PCandidate)
	err = c.provider.Init()
	if err != nil {
		revel.AppLog.Errorf("CCandidate.Init : c.provider.Init, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	return nil
}

func (c *CCandidate) Destroy() {
	c.Controller.Destroy()
	c.provider = nil
}

func (c *CCandidate) GetAll() revel.Result {
	candidates, err := c.provider.GetCandidates()
	if err != nil {
		revel.AppLog.Errorf("CCandidate.GetAll : c.provider.GetCandidates, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CCandidate.GetAll : c.provider.GetCandidates, candidate: %+v\n", candidates)
	return c.RenderJSON(Succes(candidates))
}

func (c *CCandidate) GetByID(id int64) revel.Result {
	candidate, err := c.provider.GetCandidateById(id)
	if err != nil {
		revel.AppLog.Errorf("CCandidate.GetByID : c.provider.GetCandidateById, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CCandidate.GetByID : c.provider.GetCandidateById, candidate: %+v\n", candidate)
	return c.RenderJSON(Succes(candidate))
}

func (c *CCandidate) Create() revel.Result {
	var (
		candidate *entities.Candidate
		err       error
	)

	candidate, err = c.fetchPostCandidate()
	if err != nil {
		revel.AppLog.Errorf("CCandidate.Create : c.fetchPostCandidate, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	candidate, err = c.provider.CreateCandidate(candidate)
	if err != nil {
		revel.AppLog.Errorf("CCandidate.Create : c.provider.CreateCandidate, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CCandidate.Create : c.provider.CreateCandidate, candidate: %+v\n", candidate)
	return c.RenderJSON(Succes(candidate))
}

func (c *CCandidate) Update() revel.Result {
	var (
		candidate *entities.Candidate
		err       error
	)
	candidate, err = c.fetchPostCandidate()
	if err != nil {
		revel.AppLog.Errorf("CCandidate.Update : c.fetchPostCandidate, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	candidate, err = c.provider.UpdateCandidate(candidate)
	if err != nil {
		revel.AppLog.Errorf("CCandidate.Update : c.provider.UpdateCandidate, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CCandidate.Update : c.provider.UpdateCandidate, candidate: %s\n", candidate)
	return c.RenderJSON(Succes(candidate))
}

func (c *CCandidate) Delete() revel.Result {
	var (
		candidate *entities.Candidate
		err       error
	)

	candidate, err = c.fetchPostCandidate()
	if err != nil {
		revel.AppLog.Errorf("CCandidate.Delete : c.provider.fetchPostCandidate, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	candidate, err = c.provider.DeleteCandidate(candidate)
	if err != nil {
		revel.AppLog.Errorf("CCandidate.Delete : c.provider.DeleteCandidate, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CCandidate.Delete : c.provider.DeleteCandidate, candidate: %s\n", candidate)
	return c.RenderJSON(Succes(candidate))
}

// fetchPostEmployee метод получения сущности из post параметров
func (c *CCandidate) fetchPostCandidate() (candidate *entities.Candidate, err error) {
	var (
		rawRequest []byte // байтовое представление тела запроса
	)

	// получение тела запроса
	rawRequest, err = ioutil.ReadAll(c.Request.GetBody())
	if err != nil {
		revel.AppLog.Errorf("CCandidate.fetchPostCandidate : ioutil.ReadAll, %s\n", err)
		return
	}

	// преобразование тела запроса в структуру сущности
	err = json.Unmarshal(rawRequest, &candidate)
	if err != nil {
		revel.AppLog.Errorf("CCandidate.fetchPostCandidate : json.Unmarshal, %s\n", err)
		return
	}

	revel.AppLog.Debugf("CCandidate.fetchPostCandidate, candidate: %+v\n", candidate)

	return
}
