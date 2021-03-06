package employee_provider

import (
	"database/sql"
	"myapp/app/helpers"
	"myapp/app/models/entities"
	"myapp/app/models/mappers"

	"github.com/revel/revel"
)

type PEmployee struct {
	employeeMapper  *mappers.MEmployee
	positionsMapper *mappers.MPosition
}

func (p *PEmployee) Init() (err error) {
	var db *sql.DB

	db, err = helpers.GetDBConnection()
	if err != nil {
		revel.AppLog.Errorf("PAssessment.Init : helpers.GetDBConnection, %s\n", err)
		return err
	}

	p.employeeMapper = new(mappers.MEmployee)
	p.employeeMapper.Init(db)

	p.positionsMapper = new(mappers.MPosition)
	p.positionsMapper.Init(db)

	return
}

func (p *PEmployee) GetEmployees() (es []*entities.Employee, err error) {
	var (
		edbts []*mappers.EmployeeDBType
		e     *entities.Employee
	)

	edbts, err = p.employeeMapper.SelectAll()
	if err != nil {
		revel.AppLog.Errorf("PEmployee.GetEmployees : p.employeeMapper.SelectAll, %s\n", err)
		return
	}

	for _, edbt := range edbts {
		e, err = edbt.ToType()
		if err != nil {
			revel.AppLog.Errorf("PEmployee.GetEmployees : p.employeeMapper.ToType, %s\n", err)
			return
		}

		// получение значения должности по ключу
		e.Position, err = p.positionsMapper.PositionNameByID(edbt.Fk_position)
		if err != nil {
			revel.AppLog.Errorf("PEmployee.GetEmployees : p.positionsMapper.PositionNameByID, %s\n", err)
			return
		}
		es = append(es, e)
	}

	return
}

func (p *PEmployee) CreateEmployee(employee *entities.Employee) (e *entities.Employee, err error) {
	var (
		edbt *mappers.EmployeeDBType
	)

	edbt, err = edbt.FromType(*employee)
	if err != nil {
		revel.AppLog.Errorf("PEmployee.CreateEmployee : edbt.FromType, %s\n", err)
		return
	}
	edbt.Fk_position, err = p.positionsMapper.IDByPositionName(employee.Position)
	if err != nil {
		revel.AppLog.Errorf("PEmployee.CreateEmployee : p.bookStatusMapper.IDByPositionName, %s\n", err)
		return
	}

	employee.ID, err = p.employeeMapper.Insert(edbt)
	if err != nil {
		revel.AppLog.Errorf("PEmployee.CreateEmployee : p.employeeMapper.Create, %s\n", err)
		return
	}

	return employee, nil
}

// UpdateEmployee метод обновления сотрудника
func (p *PEmployee) UpdateEmployee(employee *entities.Employee) (e *entities.Employee, err error) {
	var (
		edbt *mappers.EmployeeDBType
	)

	// инициализация структуры бд из струткуры сущности
	edbt, err = edbt.FromType(*employee)
	if err != nil {
		revel.AppLog.Errorf("PEmployee.UpdateEmployee : edbt.FromType, %s\n", err)
		return
	}

	// получение внешнего ключа на должность
	edbt.Fk_position, err = p.positionsMapper.IDByPositionName(employee.Position)
	if err != nil {
		revel.AppLog.Errorf("PEmployee.UpdateEmployee : p.positionsMapper.IDByPositionName, %s\n", err)
		return
	}

	// обновление сотрудника
	err = p.employeeMapper.Update(edbt)
	if err != nil {
		revel.AppLog.Errorf("PEmployee.UpdateEmployee : p.employeeMapper.Update, %s\n", err)
		return
	}

	return employee, nil
}

// DeleteEmployee метод удаления сотрудника
func (p *PEmployee) DeleteEmployee(id int64) (err error) {
	// var (
	// 	edbt *mappers.EmployeeDBType
	// )

	// инициализация структуры бд из струткуры сущности
	// edbt, err = edbt.FromType(*employee)
	// if err != nil {
	// 	revel.AppLog.Errorf("PEmployee.DeleteEmployee : edbt.FromType, %s\n", err)
	// 	return
	// }

	// удаление сотрудника
	err = p.employeeMapper.Delete(id)
	if err != nil {
		revel.AppLog.Errorf("PEmployee.DeleteEmployee : p.employeeMapper.Delete, %s\n", err)
		return
	}

	return
}
