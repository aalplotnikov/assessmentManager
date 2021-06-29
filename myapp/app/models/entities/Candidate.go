package entities

import "time"

// Employee структура сущности сотрудника
type Candidate struct {
	ID          int64           `json:"id"`                  // идентификатор
	Firstname   string          `json:"firstNameCandidate"`  // имя
	Lastname    string          `json:"lastNameCandidate"`   // фамилия
	Middlename  string          `json:"middleNameCandidate"` // отчество
	Email       string          `json:"mailCandidate"`       // почтовый адрес
	PhoneNumber string          `json:"phoneCandidate"`      // телефонный номер
	Note        string          `json:"note"`                // должность
	Birthday    *time.Time      `json:"birthdayCandidate"`   // день рождения
	Status      CandidateStatus `json:"StatusCandidate"`     // статус кандидата
}

type CandidateStatus string

const (
	CANDIDATE_STATUS_INVITED        CandidateStatus = "Приглашен"
	CANDIDATE_STATUS_NOT_INVITED    CandidateStatus = "Не приглашен"
	CANDIDATE_STATUS_APPEARED       CandidateStatus = "Явился"
	CANDIDATE_STATUS_NOT_APPEARED   CandidateStatus = "Не явился"
	CANDIDATE_STATUS_SUCCESSFUL     CandidateStatus = "Успешен"
	CANDIDATE_STATUS_NOT_SUCCESSFUL CandidateStatus = "Не успешен"
)
