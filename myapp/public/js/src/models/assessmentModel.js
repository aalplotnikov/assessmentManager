import Model from '../../helpers/model.js'
class AssessmentModel extends Model {
    constructor() {
        super();
    }

    getAssessment() {
        return this.get('assessments/all')
    }

    getAssessmentByID(id) {
        return this.get(`assessments/${id}`);
    }

    getCandidateAssessmentById(id) {
        return []
        return this.get(`candidate/${id}`);
    }

    getEmployeeAssessmentById(id) {
        return []
        return this.get(`employee/${id}`);
    }

    getStatusAssessment(id) {
        return []
        return this.get(`assessment/${id}`);
    }

    createAssessment(assessment) {
        return this.post('assessments/create', assessment);
    }

    updateAssessment(assessment) {
        return this.post('assessments/update', assessment);
    }

    deleteAssessment(assessment) {
        return this.post('assessments/delete', assessment);
    }

    updateStatus(id, status) {
        return this.post(`/assessments/${id}/status`, status)
    }

}

const assessmentModel = new AssessmentModel();
export default assessmentModel