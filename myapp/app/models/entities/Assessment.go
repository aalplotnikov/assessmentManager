package entities

import "time"

// Assessment структура сущности книги
type Assessment struct {
	ID        int64        `json:"id"`             // идентификатор
	Name      string       `json:"nameAssessment"` // название ассессмента
	Candidate []*Candidate `json:"candidateList"`
	Employee  []*Employee  `json:"employeeList"`
	Date      *time.Time   `json:"dateAssessment"`   // дата проведения
	Status    string       `json:"statusAssessment"` // статус ассессмента
}

// AssessmentStatus статус ассессмента
// type AssessmentStatus string

// const (
// 	ASSESSMENT_STATUS_FILLED        AssessmentStatus = "Заполнен"
// 	ASSESSMENT_STATUS_NOT_FILLED    AssessmentStatus = "Не заполнен"
// 	ASSESSMENT_STATUS_PENDING_OFSET AssessmentStatus = "В ожидании оценки"
// 	ASSESSMENT_STATUS_COMPLETED     AssessmentStatus = "Завершен"
// )
