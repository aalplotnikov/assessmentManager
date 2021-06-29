package candidate_provider

import (
	"database/sql"
	"myapp/app/helpers"
	"myapp/app/models/entities"
	"myapp/app/models/mappers"

	"github.com/revel/revel"
)

type PCandidate struct {
	candidatemapper *mappers.MCandidate
}

func (p *PCandidate) Init() (err error) {
	var db *sql.DB

	db, err = helpers.GetDBConnection()
	if err != nil {
		revel.AppLog.Errorf("PAssessment.Init : helpers.GetDBConnection, %s\n", err)
		return err
	}

	p.candidatemapper = new(mappers.MCandidate)
	p.candidatemapper.Init(db)

	return
}

func (p *PCandidate) GetCandidates() (cs []*entities.Candidate, err error) {
	var (
		cdbts []*mappers.CandidateDBType
		c     *entities.Candidate
	)

	cdbts, err = p.candidatemapper.SelectAll()
	if err != nil {
		revel.AppLog.Errorf("PCandidate.GetCandidates : p.candidateMapper.SelectAll, %s\n", err)
		return
	}

	for _, cdbt := range cdbts {
		c, err = cdbt.ToType()
		if err != nil {
			revel.AppLog.Errorf("PCandidate.GetCandidates : p.candidateMapper.ToType, %s\n", err)
			return
		}
		cs = append(cs, c)
	}
	return
}

func (p *PCandidate) GetCandidateById(id int64) (c *entities.Candidate, err error) {
	cdbt, err := p.candidatemapper.SelectById(id)
	if err != nil {
		revel.AppLog.Errorf("PCandidate.GetCandidateById : p.candidatemapper.SelectById, %s\n", err)
		return
	}
	c, err = cdbt.ToType()
	if err != nil {
		revel.AppLog.Errorf("PCandidate.GetCandidateById : p.candidateMapper.ToType, %s\n", err)
		return
	}
	return
}

func (p *PCandidate) CreateCandidate(candidate *entities.Candidate) (c *entities.Candidate, err error) {
	var cdbt *mappers.CandidateDBType

	cdbt, err = cdbt.FromType(*candidate)
	if err != nil {
		revel.AppLog.Errorf("PCandidate.CreateCandidate : cdbt.FromType, %s\n", err)
		return
	}
	candidate.ID, err = p.candidatemapper.Insert(cdbt)
	if err != nil {
		revel.AppLog.Errorf("PCandidate.CreateCandidate : cdbt.Insert, %s\n", err)
		return
	}
	return candidate, nil
}

func (p *PCandidate) UpdateCandidate(candidate *entities.Candidate) (_ *entities.Candidate, err error) {
	var cdbt *mappers.CandidateDBType

	cdbt, err = cdbt.FromType(*candidate)
	if err != nil {
		revel.AppLog.Errorf("PCandidate.UpdateCandidate : cdbt.FromType, %s\n", err)
		return
	}

	err = p.candidatemapper.Update(cdbt)
	if err != nil {
		revel.AppLog.Errorf("PCandidate.UpdateCandidate : cdbt.Update, %s\n", err)
	}
	return candidate, nil
}

func (p *PCandidate) DeleteCandidate(candidate *entities.Candidate) (c *entities.Candidate, err error) {
	var cdbt *mappers.CandidateDBType

	cdbt, err = cdbt.FromType(*candidate)
	if err != nil {
		revel.AppLog.Errorf("PCandidate.DeleteCandidate : cdbt.FromType, %s\n", err)
		return
	}

	err = p.candidatemapper.Delete(cdbt)
	if err != nil {
		revel.AppLog.Errorf("PCandidate.DeleteCandidate : cdbt.Delete, %s\n", err)
	}
	return candidate, nil
}
