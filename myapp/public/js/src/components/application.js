import WorkedPlaceView from './ApplicationView.js'
import {CAssesmentTab} from './assessmentTab/CAssessmentTab.js'
import {CCandidateTab} from './candidateTab/CCandidateTab.js'
import {CEmployeeTab} from './employeeTab/CEmployeeTab.js'
export class Application {
    constructor() {
        this.view
        this.assesmentTab = new CAssesmentTab()
        this.candidateTab = new CCandidateTab()
        this.employeeTab = new CEmployeeTab()
    }

    init (){
        this.employeeTab.init();
        this.candidateTab.init();
        this.assesmentTab.init();
    }

    attachEvents() {
        this.assesmentTab.attachEvents();
        this.employeeTab.attachEvents();
        this.candidateTab.attachEvents();
    }

    config() {
        return WorkedPlaceView(this.assesmentTab, this.candidateTab, this.employeeTab);
        
    }
}