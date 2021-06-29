package controllers

import (
	"encoding/json"
	"io/ioutil"
	"myapp/app/models/entities"
	"myapp/app/models/providers/employee_provider"

	"github.com/revel/revel"
)

type CEmployee struct {
	*revel.Controller
	provider *employee_provider.PEmployee
}

func (c *CEmployee) Init() revel.Result {
	var (
		err error
	)

	c.provider = new(employee_provider.PEmployee)
	err = c.provider.Init()
	if err != nil {
		revel.AppLog.Errorf("CEmployee.Init : c.provider.Init, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	return nil
}

func (c *CEmployee) Destroy() {
	c.Controller.Destroy()
	c.provider = nil
}

func (c *CEmployee) GetAll() revel.Result {

	employee, err := c.provider.GetEmployees()
	if err != nil {
		revel.AppLog.Errorf("CEmployee.GetAll : c.provider.GetEmployees, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CEmployee.GetAll : c.provider.GetEmployees, employee: %+v\n", employee)
	return c.RenderJSON(Succes(employee))
}

// Create создание сотрудника
func (c *CEmployee) Create() revel.Result {
	var (
		employee *entities.Employee // экземпляр сущности для создания
		err      error              // ошибка в ходе выполнения функции
	)

	// формирование сущности для создания из post параметров
	employee, err = c.fetchPostEmployee()
	if err != nil {
		revel.AppLog.Errorf("CEmployee.Create : c.fetchPostEmployee, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	// создание сущности
	employee, err = c.provider.CreateEmployee(employee)
	if err != nil {
		revel.AppLog.Errorf("CEmployee.Create : c.provider.CreateEmployee, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CEmployee.Create, employee: %+v\n", employee)

	// рендер положительного результата
	return c.RenderJSON(Succes(employee))
}

func (c *CEmployee) Update() revel.Result {
	var (
		employee *entities.Employee // экземпляр сущности для обновления
		err      error              // ошибка в ходе выполнения функции
	)

	// формирование сущности для обновления из post параметров
	employee, err = c.fetchPostEmployee()
	if err != nil {
		revel.AppLog.Errorf("CEmployee.Update : c.fetchPostEmployee, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	// обновление сущности
	employee, err = c.provider.UpdateEmployee(employee)
	if err != nil {
		revel.AppLog.Errorf("CEmployee.Update : c.provider.UpdateEmployee, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CEmployee.Update, employee: %+v\n", employee)

	// рендер положительного результата
	return c.RenderJSON(Succes(employee))
}

// DeleteEmployee удаление сотрудника
func (c *CEmployee) Delete(id int64) revel.Result {
	// var (
	// 	employee *entities.Employee // экземпляр сущности для удаления
	// 	err      error              // ошибка в ходе выполнения функции
	// )

	// формирование сущности для удаления из post параметров
	//id, err := c.fetchPostEmployee()
	// if err != nil {
	// 	revel.AppLog.Errorf("CEmployee.Delete : c.fetchPostEmployee, %s\n", err)
	// 	return c.RenderJSON(Failed(err.Error()))
	// }

	// удаление сущности
	err := c.provider.DeleteEmployee(id)
	if err != nil {
		revel.AppLog.Errorf("CEmployee.Delete : c.provider.DeleteEmployee, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CEmployee.Delete , id: %+v\n", id)

	// рендер положительного результата
	return c.RenderJSON(Succes(nil))
}

// fetchPostEmployee метод получения сущности из post параметров
func (c *CEmployee) fetchPostEmployee() (e *entities.Employee, err error) {
	var (
		rawRequest []byte // байтовое представление тела запроса
	)

	// получение тела запроса
	rawRequest, err = ioutil.ReadAll(c.Request.GetBody())
	if err != nil {
		revel.AppLog.Errorf("CEmployee.fetchPostEmployee : ioutil.ReadAll, %s\n", err)
		return
	}

	// преобразование тела запроса в структуру сущности
	err = json.Unmarshal(rawRequest, &e)
	if err != nil {
		revel.AppLog.Errorf("CEmployee.fetchPostEmployee : json.Unmarshal, %s\n", err)
		return
	}

	revel.AppLog.Debugf("CEmployee.fetchPostEmployee, employees: %+v\n", e)

	return
}
