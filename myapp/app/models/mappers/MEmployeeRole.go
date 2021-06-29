package mappers

import (
	"database/sql"
	"myapp/app/models/entities"

	"github.com/revel/revel"
)

type MEmployeeRole struct {
	db *sql.DB
}

func (m *MEmployeeRole) Init(db *sql.DB) {
	m.db = db
}

func (m *MEmployeeRole) RoleById(id int64) (status entities.EmplojeeRole, err error) {
	var (
		query string
		row   *sql.Row
	)

	query = `Select
		c_name
		from ref_role
		where pk_id = $1
	`
	row = m.db.QueryRow(query, id)

	err = row.Scan(&status)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MEmployeeRole.StatusById : rows.Scan, %s\n", err)
	}
	return
}

func (m *MEmployeeRole) IdByRole(status entities.EmplojeeRole) (id int64, err error) {
	var (
		query string
		row   *sql.Row
	)

	query = `Select
	ref_role.c_name
	from ref_role left join toc_assessment_employees on ref_role.pk_id = toc_assessment_employees.fk_role
	where fk_assessment = $1
	`

	row = m.db.QueryRow(query, status)
	err = row.Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MEmployeeRole.IdByStatus : rows.Scan, %s\n", err)
		return
	}
	return
}
