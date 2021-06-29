package mappers

import (
	"database/sql"

	"github.com/revel/revel"
)

type MAssessmentEmployee struct {
	db *sql.DB
}

// Init
func (m *MAssessmentEmployee) Init(db *sql.DB) {
	m.db = db
}

func (m *MAssessmentEmployee) Insert(fk_assessment int64, fk_employee int64, fk_role int64) (id int64, err error) {
	var (
		query string
		row   *sql.Row
	)

	query = `
	INSERT INTO toc_assessment_employees (
		fk_assessment,
		fk_employee,
		fk_role
	)
	VALUES(
		$1,	-- fk_assessment
		$2,	-- fk_employee
		$3	-- fk_status
	)
	returning pk_id;
	`

	row = m.db.QueryRow(query,
		fk_assessment,
		fk_employee,
		fk_role,
	)

	err = row.Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MAssessmentEmployee.Insert : row.Scan, %s\n", err)
		return
	}
	return
}

func (m *MAssessmentEmployee) Delete(id int64) (err error) {
	query := `DELETE FROM toc_assessment_employees where fk_assessment = $1;`
	_, err = m.db.Exec(query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MAssessmentEmployee.Delete : m.db.Exec, %s\n", err)
		return
	}
	return
}

func (m *MAssessmentEmployee) IDByRoleName(roleName string) (id int64, err error) {
	var (
		query string   // строка запроса
		row   *sql.Row // выборка данных
	)

	// запрос
	query = `
		SELECT
			pk_id
		FROM ref_role
		WHERE c_name = $1
		ORDER BY pk_id;
	`

	// выполнение запроса
	row = m.db.QueryRow(query, roleName)

	// считывание строки выборки
	err = row.Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MAssessmentEmployee.IDByRoleName : row.Scan, %s\n", err)
		return
	}

	return
}
