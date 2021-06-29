package mappers

import (
	"database/sql"

	"github.com/revel/revel"
)

type MAssessmentCandidate struct {
	db *sql.DB
}

// Init
func (m *MAssessmentCandidate) Init(db *sql.DB) {
	m.db = db
}

func (m *MAssessmentCandidate) Insert(fk_assessment int64, fk_candidate int64, fk_status int64) (id int64, err error) {
	var (
		query string
		row   *sql.Row
	)

	query = `
	INSERT INTO toc_assessment_candidates (
		fk_assessment,
		fk_candidate,
		fk_status
	)
	VALUES(
		$1,	-- fk_assessment
		$2,	-- fk_candidate
		$3	-- fk_status
	)
	returning pk_id;
	`

	row = m.db.QueryRow(query,
		fk_assessment,
		fk_candidate,
		fk_status,
	)

	err = row.Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MAssessmentCandidate.Insert : row.Scan, %s\n", err)
		return
	}
	return
}

func (m *MAssessmentCandidate) UpdateStatus(fk_assessment int64, fk_candidate int64, fk_status int64) (err error) {
	query := `update toc_assessment_candidates
	set
		fk_status = $3
	where fk_assessment = $1 and fk_candidate = $2;`

	_, err = m.db.Exec(query, fk_assessment, fk_candidate, fk_status)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MAssessmentCandidate.UpdateStatus : m.db.Exec, %s\n", err)
		return
	}
	return
}

func (m *MAssessmentCandidate) Delete(id int64) (err error) {
	query := `DELETE FROM toc_assessment_candidates where fk_assessment = $1;`
	_, err = m.db.Exec(query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MAssessmentCandidate.Delete : m.db.Exec, %s\n", err)
		return
	}
	return
}
