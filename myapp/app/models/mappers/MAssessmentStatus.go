package mappers

import (
	"database/sql"

	"github.com/revel/revel"
)

type MAssessmentStatus struct {
	db *sql.DB
}

func (m *MAssessmentStatus) Init(db *sql.DB) {
	m.db = db
}

func (m *MAssessmentStatus) StatusById(id int64) (status string, err error) {
	var (
		query string
		row   *sql.Row
	)

	query = `Select
		c_name
		from ref_status_assessment
		where pk_id = $1
	`
	row = m.db.QueryRow(query, id)

	err = row.Scan(&status)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MAssessmentStatus.StatusById : rows.Scan, %s\n", err)
	}
	return
}

func (m *MAssessmentStatus) IdByStatus(status string) (id int64, err error) {
	var (
		query string
		row   *sql.Row
	)

	query = `Select
		pk_id
		from ref_status_assessment
		where c_name = $1
	`

	row = m.db.QueryRow(query, status)
	err = row.Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MAssessmentStatus.IdByStatus : rows.Scan, %s\n", err)
		return
	}
	return
}
