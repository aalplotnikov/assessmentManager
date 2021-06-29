package entities

type AssessmentCandidate struct {
	ID         int64 `json:"id"`           // идентификатор
	Assessment int64 `json:"idAssessment"` // id ассессмента
	Candidate  int64 `json:"idCandidate"`  // id Кандидата
	Status     int64 `json:"idStatus"`     // id Статуса
}
