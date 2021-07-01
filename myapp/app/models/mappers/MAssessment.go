package mappers

import (
	"database/sql"
	"myapp/app/models/entities"
	"time"

	"github.com/revel/revel"
)

type AssessmentDBType struct {
	Pk_id     int64      // идентификатор
	Fk_status int64      // статус ассессмента
	C_name    string     // название ассессмента
	C_date    *time.Time // дата проведения
}

func (dbt *AssessmentDBType) ToType() (a *entities.Assessment, err error) {
	a = new(entities.Assessment)

	a.ID = dbt.Pk_id
	a.Name = dbt.C_name
	a.Date = dbt.C_date

	return
}

func (_ *AssessmentDBType) FromType(a entities.Assessment) (dbt *AssessmentDBType, err error) {
	dbt = &AssessmentDBType{
		Pk_id:  a.ID,
		C_name: a.Name,
		C_date: a.Date,
	}

	return
}

type MAssessment struct {
	db *sql.DB
}

// Init
func (m *MAssessment) Init(db *sql.DB) {
	m.db = db
}

// SelectAll получение всех ассессментов
func (m *MAssessment) SelectAll() (bs []*AssessmentDBType, err error) {
	var (
		query string    // строка запроса
		rows  *sql.Rows // выборка данных
	)

	// запрос
	query = `
		SELECT 
			pk_id,
			fk_status,
			c_name,
			c_date
		FROM t_assessment
		order by pk_id;
	`

	// выполнение запроса
	rows, err = m.db.Query(query)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MAssessment.SelectAll : m.db.query, %s\n", err)
		return
	}

	// обработка строк выборки
	for rows.Next() {
		// создание экземпляра сущности для считывания строки выборки
		b := new(AssessmentDBType)

		// считывание строки выборки
		err = rows.Scan(&b.Pk_id, &b.Fk_status, &b.C_name, &b.C_date)
		if err != nil {
			revel.AppLog.Errorf("MAssessment.SelectAll : rows.Scan, %s\n", err)
			continue
		}

		// добавление сущности в массив
		bs = append(bs, b)
	}
	return
}

func (m *MAssessment) SelectById(id int64) (a *AssessmentDBType, err error) {
	var (
		query string
		row   *sql.Row
	)
	a = new(AssessmentDBType)
	query = `Select 
		pk_id,
		fk_status,
		c_name,
		c_date
	from t_assessment where pk_id = $1`
	row = m.db.QueryRow(query, id)

	err = row.Scan(
		&a.Pk_id,
		&a.Fk_status,
		&a.C_name,
		&a.C_date,
	)

	if err != nil {
		revel.AppLog.Errorf("MCandidate.SelectById : row.Scan, %s\n", err)
		return
	}
	return
}

func (m *MAssessment) SelectByIdCandidates(id int64) (candidates []*CandidateDBType, err error) {
	var (
		query string
		rows  *sql.Rows
	)

	query = `Select
	t_candidates.pk_id,
	t_candidates.c_name,
	t_candidates.c_lastname,
	t_candidates.c_middlename,
	t_candidates.c_email,
	t_candidates.c_phone_number,
	t_candidates.c_note
	from t_candidates left join toc_assessment_candidates on t_candidates.pk_id = toc_assessment_candidates.fk_candidate
	where fk_assessment = $1
	`

	rows, err = m.db.Query(query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MAssessment.SelectByIdCandidates : m.db.query, %s\n", err)
		return
	}

	for rows.Next() {
		c := new(CandidateDBType)

		err = rows.Scan(
			&c.Pk_id,
			&c.C_firstname,
			&c.C_lastname,
			&c.C_middlename,
			&c.C_email,
			&c.C_phone_number,
			&c.C_note,
		)
		if err != nil {
			revel.AppLog.Errorf("MAssessment.SelectByIdCandidates : rows.Scan, %s\n", err)
			continue
		}
		candidates = append(candidates, c)
	}
	return
}

func (m *MAssessment) SelectByIdEmployees(id int64) (employees []*EmployeeDBType, err error) {
	var (
		query string
		rows  *sql.Rows
	)

	query = `Select
	t_employees.pk_id,
	t_employees.fk_position,
	t_employees.c_name,
	t_employees.c_lastname,
	t_employees.c_middlename,
	t_employees.c_phone_number,
	t_employees.c_email
	from t_employees left join toc_assessment_employees on t_employees.pk_id = toc_assessment_employees.fk_employee
	where fk_assessment = $1
	`

	rows, err = m.db.Query(query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MAssessment.SelectByIdEmployees : m.db.query, %s\n", err)
		return
	}

	for rows.Next() {
		e := new(EmployeeDBType)

		err = rows.Scan(
			&e.Pk_id,
			&e.Fk_position,
			&e.C_firstname,
			&e.C_lastname,
			&e.C_middlename,
			&e.C_phone_number,
			&e.C_email,
		)
		if err != nil {
			revel.AppLog.Errorf("MAssessment.SelectByIdEmployees : rows.Scan, %s\n", err)
			continue
		}
		employees = append(employees, e)
	}
	return
}

func (m *MAssessment) Insert(adbt *AssessmentDBType) (id int64, err error) {
	var (
		query string
		row   *sql.Row
	)

	query = `
	INSERT INTO t_assessment (
		fk_status,
		c_name,
		c_date
	)
	VALUES(
		$1,	-- fk_status
		$2,	-- c_name
		$3	-- c_date
	)
	returning pk_id;
	`

	row = m.db.QueryRow(query,
		adbt.Fk_status,
		adbt.C_name,
		adbt.C_date,
	)

	err = row.Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MAssessment.Insert : row.Scan, %s\n", err)
		return
	}
	return
}

func (m *MAssessment) Update(adbt *AssessmentDBType) (err error) {
	query := `Update t_assessment
	set
		fk_status = $2,
		c_name = $3,
		c_date = $4
	where pk_id = $1
	`

	_, err = m.db.Exec(query,
		adbt.Pk_id,
		adbt.Fk_status,
		adbt.C_name,
		adbt.C_date,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MAssessment.Update : m.db.Exec, %s\n", err)
		return
	}
	return
}

func (m *MAssessment) UpdateStatus(id int64, status int64) (err error) {
	query := `Update t_assessment
	set
		fk_status = $2
	where pk_id = $1
	`

	_, err = m.db.Exec(query,
		id,
		status,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MAssessment.Update : m.db.Exec, %s\n", err)
		return
	}
	return
}

func (m *MAssessment) Delete(adbt *AssessmentDBType) (err error) {
	query := `DELETE FROM t_assessment WHERE pk_id = $1;`
	_, err = m.db.Exec(query, adbt.Pk_id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MAssessment.Delete : m.db.Exec, %s\n", err)
		return
	}
	return
}
