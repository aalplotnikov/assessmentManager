package entities

import "time"

// Employee структура сущности сотрудника
type Employee struct {
	ID          int64        `json:"id"`                 // идентификатор
	Firstname   string       `json:"firstNameEmployee"`  // имя
	Lastname    string       `json:"lastNameEmployee"`   // фамилия
	Middlename  string       `json:"middleNameEmployee"` // отчество
	Email       string       `json:"mailEmployee"`       // почтовый адрес
	PhoneNumber string       `json:"phoneEmployee"`      // телефонный номер
	Position    string       `json:"positionEmployee"`   // должность
	Birthday    *time.Time   `json:"birthdayEmployee"`   // день рождения
	Role        EmplojeeRole `json:"roleEmployee"`       // роль
}

type EmplojeeRole string

const (
	EMPLOYEE_ROLE_INTERVIEWER EmplojeeRole = "Интервьюер"
	EMPLOYEE_ROLE_COMMISSION  EmplojeeRole = "Член комиссии"
)
