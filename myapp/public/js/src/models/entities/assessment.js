export class Assessment {
    constructor(id, name, candidate, employee, date, status) {
        this.id = id;
        this.nameAssessment = name;
        this.candidateList = candidate;
        this.employeeList = employee;
        this.dateAssessment = new Date(date);
        this.statusAssessment = status;
    }
}