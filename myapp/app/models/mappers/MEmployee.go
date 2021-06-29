package mappers

import (
	"database/sql"
	"myapp/app/models/entities"

	"github.com/revel/revel"
)

type EmployeeDBType struct {
	Pk_id          int64
	Fk_position    int64
	C_firstname    string
	C_lastname     string
	C_middlename   string
	C_email        string
	C_phone_number string
	//Birthday    *time.Time
}

func (dbt *EmployeeDBType) ToType() (e *entities.Employee, err error) {
	e = new(entities.Employee)
	e.ID = dbt.Pk_id
	e.Firstname = dbt.C_firstname
	e.Lastname = dbt.C_lastname
	e.Middlename = dbt.C_middlename
	e.Email = dbt.C_email
	e.PhoneNumber = dbt.C_phone_number
	//e.Birthday = dbt.Birthday

	return
}

func (em *EmployeeDBType) FromType(e entities.Employee) (dbt *EmployeeDBType, err error) {
	dbt = &EmployeeDBType{
		Pk_id:          e.ID,
		C_firstname:    e.Firstname,
		C_lastname:     e.Lastname,
		C_middlename:   e.Middlename,
		C_email:        e.Email,
		C_phone_number: e.PhoneNumber,
		//Birthday:    e.Birthday,
	}

	return
}

type MEmployee struct {
	db *sql.DB
}

func (m *MEmployee) Init(db *sql.DB) {
	m.db = db
}

func (m *MEmployee) SelectAll() (es []*EmployeeDBType, err error) {
	var (
		query string    // строка запроса
		rows  *sql.Rows // выборка данных
	)

	// запрос
	query = `
		SELECT 
			pk_id,
			fk_position,
			c_name,
			c_lastname,
			c_middlename,
			c_phone_number,
			c_email
		FROM t_employees;
	`

	// выполнение запроса
	rows, err = m.db.Query(query)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MEmployee.SelectAll : m.db.query, %s\n", err)
		return
	}

	// обработка строк выборки
	for rows.Next() {
		// создание экземпляра сущности для считывания строки выборки
		e := new(EmployeeDBType)

		// считывание строки выборки
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
			revel.AppLog.Errorf("MEmployee.SelectAll : rows.Scan, %s\n", err)
			continue
		}

		// добавление сущности в массив
		es = append(es, e)
	}

	return
}

func (m *MEmployee) SelectById(id int64) (e *EmployeeDBType, err error) {
	var (
		query string   // строка запроса
		row   *sql.Row // выборка данных
	)
	e = new(EmployeeDBType)
	query = `
	SELECT 
		pk_id,
		fk_position,
		c_name,
		c_lastname,
		c_middlename,
		c_phone_number,
		c_email
	FROM t_employees WHERE pk_id = $1;
	`

	row = m.db.QueryRow(query, id)

	err = row.Scan(
		&e.Pk_id,
		&e.Fk_position,
		&e.C_firstname,
		&e.C_lastname,
		&e.C_middlename,
		&e.C_phone_number,
		&e.C_email,
	)
	if err != nil {
		revel.AppLog.Errorf("MEmployee.SelectById : rows.Scan, %s\n", err)
		return
	}

	return
}

func (m *MEmployee) Insert(edbt *EmployeeDBType) (id int64, err error) {
	var (
		query string
		row   *sql.Row
	)
	query = `
	INSERT INTO t_employees(
		fk_position,
		c_name,
		c_lastname,
		c_middlename,
		c_phone_number,
		c_email
	)
	VALUES(
		$1,	-- fk_position
		$2,	-- c_firstname
		$3,	-- c_lastname
		$4,	-- c_middlename
		$5,	-- c_phone_number
		$6	-- c_email
	)
	returning pk_id;
	`
	row = m.db.QueryRow(query,
		edbt.Fk_position,
		edbt.C_firstname,
		edbt.C_lastname,
		edbt.C_middlename,
		edbt.C_phone_number,
		edbt.C_email,
	)

	err = row.Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
	}
	return
}

// Update изменение сотрудника
func (m *MEmployee) Update(edbt *EmployeeDBType) (err error) {
	var (
		query string // строка запроса
	)

	revel.AppLog.Debugf("MEmployee.Update, edbt: %+v\n", edbt)

	// запрос
	query = `
		UPDATE t_employees
		SET 
			fk_position = $2,
			c_name = $3,
			c_lastname = $4,
			c_middlename = $5,
			c_phone_number = $6,
			c_email = $7
		WHERE pk_id = $1;
	`

	// выполнение запроса
	_, err = m.db.Exec(query,
		edbt.Pk_id,          // pk_id
		edbt.Fk_position,    // fk_position
		edbt.C_firstname,    // c_firstname
		edbt.C_lastname,     // c_lastname
		edbt.C_middlename,   // c_middlename
		edbt.C_phone_number, // c_phone_number
		edbt.C_email,        // c_email
	)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MEmployee.Update : m.db.Exec, %s\n", err)
		return
	}

	return
}

// Delete удаление сотрудника
func (m *MEmployee) Delete(id int64) (err error) {
	var (
		query string // строка запроса
	)

	// запрос
	query = `DELETE FROM t_employees WHERE pk_id = $1;`

	// выполнение запроса
	_, err = m.db.Exec(query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MEmployee.Delete : m.db.Exec, %s\n", err)
		return
	}

	return
}
