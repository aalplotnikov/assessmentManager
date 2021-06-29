package mappers

import (
	"database/sql"
	"myapp/app/models/entities"

	"github.com/revel/revel"
)

type CandidateDBType struct {
	Pk_id          int64
	Fk_status      int64
	C_firstname    string
	C_lastname     string
	C_middlename   string
	C_email        string
	C_phone_number string
	C_note         string
	//C_birthday    *time.Time
}

func (dbt *CandidateDBType) ToType() (c *entities.Candidate, err error) {
	c = new(entities.Candidate)

	c.ID = dbt.Pk_id
	c.Firstname = dbt.C_firstname
	c.Lastname = dbt.C_lastname
	c.Middlename = dbt.C_middlename
	c.Email = dbt.C_email
	c.PhoneNumber = dbt.C_phone_number
	c.Note = dbt.C_note
	// c.Birthday = dbt.C_birthday
	return
}

func (_ *CandidateDBType) FromType(c entities.Candidate) (dbt *CandidateDBType, err error) {
	dbt = &CandidateDBType{
		Pk_id:          c.ID,
		C_firstname:    c.Firstname,
		C_lastname:     c.Lastname,
		C_middlename:   c.Middlename,
		C_email:        c.Email,
		C_phone_number: c.PhoneNumber,
		C_note:         c.Note,
	}
	return
}

type MCandidate struct {
	db *sql.DB
}

func (m *MCandidate) Init(db *sql.DB) {
	m.db = db
}

func (m *MCandidate) SelectAll() (cs []*CandidateDBType, err error) {
	var (
		query string
		rows  *sql.Rows
	)

	query = `Select 
		pk_id,
		c_name,
		c_lastname,
		c_middlename,
		c_email,
		c_phone_number,
		c_note
	from t_candidates;`
	rows, err = m.db.Query(query)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MCandidate.SelectAll : m.db.query, %s\n", err)
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
			revel.AppLog.Errorf("MCandidate.SelectAll : rows.Scan, %s\n", err)
			continue
		}

		cs = append(cs, c)
	}

	return
}

func (m *MCandidate) SelectById(id int64) (c *CandidateDBType, err error) {
	var (
		query string
		row   *sql.Row
	)
	c = new(CandidateDBType)
	query = `Select 
		pk_id,
		c_name,
		c_lastname,
		c_middlename,
		c_email,
		c_phone_number,
		c_note
	from t_candidates where pk_id = $1`
	row = m.db.QueryRow(query, id)

	err = row.Scan(
		&c.Pk_id,
		&c.C_firstname,
		&c.C_lastname,
		&c.C_middlename,
		&c.C_email,
		&c.C_phone_number,
		&c.C_note,
	)
	if err != nil {
		revel.AppLog.Errorf("MCandidate.SelectById : row.Scan, %s\n", err)
		return
	}
	return
}

func (m *MCandidate) Insert(cdbt *CandidateDBType) (id int64, err error) {
	var (
		query string
		row   *sql.Row
	)

	query = `
	INSERT INTO t_candidates(
		c_name,
		c_lastname,
		c_middlename,
		c_phone_number,
		c_email,
		c_note
	)
	VALUES(
		$1,	-- c_name
		$2,	-- c_lastname
		$3,	-- c_middlename
		$4,	-- c_phone_number
		$5,	-- c_email
		$6	-- c_note
	)
	returning pk_id;
	`

	row = m.db.QueryRow(query,
		cdbt.C_firstname,
		cdbt.C_lastname,
		cdbt.C_middlename,
		cdbt.C_phone_number,
		cdbt.C_email,
		cdbt.C_note,
	)

	err = row.Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MCandidate.Insert : row.Scan, %s\n", err)
	}

	return
}

func (m *MCandidate) Update(cdbt *CandidateDBType) (err error) {
	query := `
	UPDATE t_candidates
	SET
		c_name = $2,
		c_lastname = $3,
		c_middlename = $4,
		c_phone_number = $5,
		c_email = $6,
		c_note = $7
		WHERE pk_id = $1;
	`

	_, err = m.db.Exec(query,
		cdbt.Pk_id,
		cdbt.C_firstname,
		cdbt.C_lastname,
		cdbt.C_middlename,
		cdbt.C_phone_number,
		cdbt.C_email,
		cdbt.C_note,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MCandidate.Update : m.db.Exec, %s\n", err)
		return
	}
	return
}

func (m *MCandidate) Delete(cdbt *CandidateDBType) (err error) {
	query := `DELETE FROM t_candidates WHERE pk_id = $1;`
	_, err = m.db.Exec(query, cdbt.Pk_id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		revel.AppLog.Errorf("MCandidate.Delete : m.db.Exec, %s\n", err)
		return
	}
	return
}
