package mappers

import (
	"database/sql"
	"myapp/app/models/entities"

	"github.com/revel/revel"
)

type MCandidateStatus struct {
	db *sql.DB
}

func (m *MCandidateStatus) Init(db *sql.DB) {
	m.db = db
}

func (m *MCandidateStatus) StatusById(id int64) (status entities.CandidateStatus, err error) {
	var (
		query string
		row   *sql.Row
	)

	query = `Select
	ref_status_candidate.c_name
	from ref_status_candidate left join toc_assessment_candidates on ref_status_candidate.pk_id = toc_assessment_candidates.fk_status
	where fk_assessment = $1
	`
	row = m.db.QueryRow(query, id)

	err = row.Scan(&status)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MCandidateStatus.StatusById : rows.Scan, %s\n", err)
	}
	return
}

func (m *MCandidateStatus) IdByStatus(status entities.CandidateStatus) (id int64, err error) {
	var (
		query string
		row   *sql.Row
	)

	query = `Select
		pk_id
		from ref_status_candidate
		where c_name = $1
	`

	row = m.db.QueryRow(query, status)
	err = row.Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MCandidateStatus.IdByStatus : rows.Scan, %s\n", err)
		return
	}
	return
}
