package assessment_provider

import (
	"database/sql"
	"fmt"
	"myapp/app/helpers"
	"myapp/app/models/entities"
	"myapp/app/models/mappers"

	"github.com/revel/revel"
)

// PAssessment провайдер контроллера ассессмента
type PAssessment struct {
	assessmentMapper          *mappers.MAssessment
	assessmentCandidateMapper *mappers.MAssessmentCandidate
	assessmentEmployeeMapper  *mappers.MAssessmentEmployee
	assessmentStatusMapper    *mappers.MAssessmentStatus
	candidateStatusMapper     *mappers.MCandidateStatus
	employeeRoleMapper        *mappers.MEmployeeRole
	positionsMapper           *mappers.MPosition
}

// Init
func (p *PAssessment) Init() (err error) {
	var db *sql.DB // экземпляр подключения к бд

	// получение экземпляра подключения к бд
	db, err = helpers.GetDBConnection()
	if err != nil {
		revel.AppLog.Errorf("PAssessment.Init : helpers.GetDBConnection, %s\n", err)
		return err
	}

	// инициализация маппера ассессмента
	p.assessmentMapper = new(mappers.MAssessment)
	p.assessmentMapper.Init(db)

	p.assessmentCandidateMapper = new(mappers.MAssessmentCandidate)
	p.assessmentCandidateMapper.Init(db)

	p.assessmentEmployeeMapper = new(mappers.MAssessmentEmployee)
	p.assessmentEmployeeMapper.Init(db)

	p.assessmentStatusMapper = new(mappers.MAssessmentStatus)
	p.assessmentStatusMapper.Init(db)

	p.candidateStatusMapper = new(mappers.MCandidateStatus)
	p.candidateStatusMapper.Init(db)

	p.employeeRoleMapper = new(mappers.MEmployeeRole)
	p.employeeRoleMapper.Init(db)

	p.positionsMapper = new(mappers.MPosition)
	p.positionsMapper.Init(db)

	return
}

// GetAssessments метод получения ассессмента
func (p *PAssessment) GetAssessments() (assessment []*entities.Assessment, err error) {
	var (
		adbts []*mappers.AssessmentDBType
		cdbts []*mappers.CandidateDBType
		edbts []*mappers.EmployeeDBType
		a     *entities.Assessment
		c     *entities.Candidate
		e     *entities.Employee
	)

	// получение данных ассессмента
	adbts, err = p.assessmentMapper.SelectAll()
	if err != nil {
		revel.AppLog.Errorf("PAssessment.GetAssessments : p.assessmentMapper.SelectAll, %s\n", err)
		return
	}

	for _, adbt := range adbts {
		// преобразование к типу сущности
		a, err = adbt.ToType()
		if err != nil {
			revel.AppLog.Errorf("PAssessment.GetAssessments : adbt.ToType, %s\n", err)
			continue
		}

		a.Status, err = p.assessmentStatusMapper.StatusById(adbt.Fk_status)
		if err != nil {
			revel.AppLog.Errorf("PAssessment.GetAssessments : p.assessmentMapper.StatusById, %s\n", err)
			continue
		}

		cdbts, err = p.assessmentMapper.SelectByIdCandidates(adbt.Pk_id)
		if err != nil {
			revel.AppLog.Errorf("PAssessment.GetAssessments : p.assessmentMapper.SelectByIdCandidates, %s\n", err)
			continue
		}
		for _, cdbt := range cdbts {
			c, err = cdbt.ToType()
			if err != nil {
				revel.AppLog.Errorf("PAssessment.GetAssessments : cdbt.ToType, %s\n", err)
				continue
			}
			c.Status, err = p.candidateStatusMapper.StatusById(adbt.Pk_id)
			if err != nil {
				revel.AppLog.Errorf("PAssessment.GetAssessments : p.candidateStatusMapper.StatusById, %s\n", err)
				continue
			}
			a.Candidate = append(a.Candidate, c)
		}

		edbts, err = p.assessmentMapper.SelectByIdEmployees(adbt.Pk_id)
		if err != nil {
			revel.AppLog.Errorf("PAssessment.GetAssessments : p.assessmentMapper.SelectByIdEmployees, %s\n", err)
			continue
		}
		for _, edbt := range edbts {
			e, err = edbt.ToType()
			if err != nil {
				revel.AppLog.Errorf("PAssessment.GetAssessments : edbt.ToType, %s\n", err)
				continue
			}
			e.Position, err = p.positionsMapper.PositionNameByID(edbt.Fk_position)
			if err != nil {
				revel.AppLog.Errorf("PAssessment.GetAssessments : p.positionsMapper.PositionNameByID, %s\n", err)
				continue
			}
			e.Role, err = p.employeeRoleMapper.RoleById(adbt.Pk_id)
			if err != nil {
				revel.AppLog.Errorf("PAssessment.GetAssessments : p.candidateStatusMapper.RoleById, %s\n", err)
				continue
			}

			a.Employee = append(a.Employee, e)
		}

		assessment = append(assessment, a)
	}

	return
}

func (p *PAssessment) GetAssessmentByid(id int64) (assessment *entities.Assessment, err error) {
	var (
		adbt  *mappers.AssessmentDBType
		cdbts []*mappers.CandidateDBType
		edbts []*mappers.EmployeeDBType
		c     *entities.Candidate
		e     *entities.Employee
	)

	adbt, err = p.assessmentMapper.SelectById(id)
	if err != nil {
		revel.AppLog.Errorf("PAssessment.GetAssessmentByid : p.assessmentMapper.SelectById, %s\n", err)
		return
	}

	assessment, err = adbt.ToType()
	if err != nil {
		revel.AppLog.Errorf("PAssessment.GetAssessmentByid : adbt.ToType, %s\n", err)
		return
	}

	assessment.Status, err = p.assessmentStatusMapper.StatusById(adbt.Fk_status)
	if err != nil {
		revel.AppLog.Errorf("PAssessment.GetAssessmentByid : p.assessmentMapper.StatusById, %s\n", err)
		return
	}

	cdbts, err = p.assessmentMapper.SelectByIdCandidates(adbt.Pk_id)
	if err != nil {
		revel.AppLog.Errorf("PAssessment.GetAssessmentByid : p.assessmentMapper.SelectByIdCandidates, %s\n", err)
		return
	}
	for _, cdbt := range cdbts {
		c, err = cdbt.ToType()
		if err != nil {
			revel.AppLog.Errorf("PAssessment.GetAssessmentByid : cdbt.ToType, %s\n", err)
			continue
		}
		c.Status, err = p.candidateStatusMapper.StatusById(adbt.Pk_id)
		if err != nil {
			revel.AppLog.Errorf("PAssessment.GetAssessmentByid : p.candidateStatusMapper.StatusById, %s\n", err)
			continue
		}
		assessment.Candidate = append(assessment.Candidate, c)
	}

	edbts, err = p.assessmentMapper.SelectByIdEmployees(adbt.Pk_id)
	if err != nil {
		revel.AppLog.Errorf("PAssessment.GetAssessmentByid : p.assessmentMapper.SelectByIdEmployees, %s\n", err)
		return
	}
	for _, edbt := range edbts {
		e, err = edbt.ToType()
		if err != nil {
			revel.AppLog.Errorf("PAssessment.GetAssessmentByid : edbt.ToType, %s\n", err)
			continue
		}
		e.Position, err = p.positionsMapper.PositionNameByID(edbt.Fk_position)
		if err != nil {
			revel.AppLog.Errorf("PAssessment.GetAssessmentByid : p.positionsMapper.PositionNameByID, %s\n", err)
			continue
		}
		e.Role, err = p.employeeRoleMapper.RoleById(adbt.Pk_id)
		if err != nil {
			revel.AppLog.Errorf("PAssessment.GetAssessmentByid : p.candidateStatusMapper.RoleById, %s\n", err)
			continue
		}

		assessment.Employee = append(assessment.Employee, e)
	}

	return
}

func (p *PAssessment) CreateAssessment(assessment *entities.Assessment) (a *entities.Assessment, err error) {
	var adbt *mappers.AssessmentDBType
	adbt, err = adbt.FromType(*assessment)
	if err != nil {
		revel.AppLog.Errorf("PAssessment.CreateAssessment : adbt.FromType, %s\n", err)
		return
	}

	adbt.Fk_status, err = p.assessmentStatusMapper.IdByStatus(assessment.Status)
	if err != nil {
		revel.AppLog.Errorf("PAssessment.CreateAssessment : p.assessmentStatusMapper.IdByStatus, %s\n", err)
		return
	}

	assessment.ID, err = p.assessmentMapper.Insert(adbt)
	if err != nil {
		revel.AppLog.Errorf("PAssessment.CreateAssessment : p.assessmentStatusMapper.Insert, %s\n", err)
		return
	}

	if len(assessment.Candidate) != 0 {
		for _, candidate := range assessment.Candidate {
			_, err = p.assessmentCandidateMapper.Insert(assessment.ID, candidate.ID, 1)
			if err != nil {
				revel.AppLog.Errorf("PAssessment.CreateAssessment : p.assessmentCandidateMapper.Insert, %s\n", err)
				return
			}
		}
	}

	if len(assessment.Employee) != 0 {
		for _, employee := range assessment.Employee {
			_, err = p.assessmentEmployeeMapper.Insert(assessment.ID, employee.ID, 1)
			if err != nil {
				revel.AppLog.Errorf("PAssessment.CreateAssessment : p.assessmentEmployeeMapper.Insert, %s\n", err)
				return
			}
		}
	}

	return assessment, nil
}

func (p *PAssessment) UpdateAssessment(assessment *entities.Assessment) (a *entities.Assessment, err error) {
	var (
		adbt    *mappers.AssessmentDBType
		fk_role int64
	)
	adbt, err = adbt.FromType(*assessment)
	if err != nil {
		revel.AppLog.Errorf("PAssessment.UpdateAssessment : adbt.FromType, %s\n", err)
		return
	}

	adbt.Fk_status, err = p.assessmentStatusMapper.IdByStatus(assessment.Status)
	if err != nil {
		revel.AppLog.Errorf("PAssessment.UpdateAssessment : p.assessmentStatusMapper.IdByStatus, %s\n", err)
		return
	}

	err = p.assessmentMapper.Update(adbt)
	if err != nil {
		revel.AppLog.Errorf("PAssessment.UpdateAssessment : p.assessmentStatusMapper.Update, %s\n", err)
		return
	}

	err = p.assessmentCandidateMapper.Delete(assessment.ID)
	if err != nil {
		revel.AppLog.Errorf("PAssessment.CreateAssessment : p.assessmentCandidateMapper.Delete, %s\n", err)
		return
	}

	if len(assessment.Candidate) != 0 {
		for _, candidate := range assessment.Candidate {
			_, err = p.assessmentCandidateMapper.Insert(assessment.ID, candidate.ID, 1)
			if err != nil {
				revel.AppLog.Errorf("PAssessment.CreateAssessment : p.assessmentCandidateMapper.Insert, %s\n", err)
				return
			}
		}
	}

	err = p.assessmentEmployeeMapper.Delete(assessment.ID)
	if err != nil {
		revel.AppLog.Errorf("PAssessment.CreateAssessment : p.assessmentEmployeeMapper.Delete, %s\n", err)
		return
	}

	if len(assessment.Employee) != 0 {
		for _, employee := range assessment.Employee {
			fk_role, err = p.assessmentEmployeeMapper.IDByRoleName(string(employee.Role))
			fmt.Println("aaaaaaaaaaa")
			fmt.Println("aaaaaaaaaaa")
			fmt.Println("aaaaaaaaaaa")
			fmt.Println("aaaaaaaaaaa")
			fmt.Println(employee.Role)
			_, err = p.assessmentEmployeeMapper.Insert(assessment.ID, employee.ID, fk_role)
			if err != nil {
				revel.AppLog.Errorf("PAssessment.CreateAssessment : p.assessmentEmployeeMapper.Insert, %s\n", err)
				return
			}
		}
	}

	return assessment, nil
}

func (p *PAssessment) DeleteAssessment(assessment *entities.Assessment) (err error) {
	var adbt *mappers.AssessmentDBType
	adbt, err = adbt.FromType(*assessment)
	if err != nil {
		revel.AppLog.Errorf("PAssessment.DeleteAssessment : adbt.FromType, %s\n", err)
		return
	}
	err = p.assessmentMapper.Delete(adbt)
	if err != nil {
		revel.AppLog.Errorf("PAssessment.UpdateAssessment : p.assessmentStatusMapper.Delete, %s\n", err)
		return
	}
	return
}
