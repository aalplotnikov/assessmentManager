import Model from '../../helpers/model.js'
class CandidateModel extends Model {
    constructor() {
        super();
    }

    getCandidate() {
        return this.get('candidates/all')
    }

    getCandidateByID(id) {
        return this.get(`candidates/${id}`);
    }

    createCandidate(candidate) {
        return this.post('candidates/create', candidate)
    }

    updateCandidate(candidate) {
        return this.post('candidates/update', candidate)
    }

    deleteCandidate(candidate) {
        return this.post('candidates/delete', candidate)
    }

    changeCandidateNote(candidate) {
        return this.post('candidate/note', candidate)
    }

}

const candidateModel  = new CandidateModel();
export default candidateModel