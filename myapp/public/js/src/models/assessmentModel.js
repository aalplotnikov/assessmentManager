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