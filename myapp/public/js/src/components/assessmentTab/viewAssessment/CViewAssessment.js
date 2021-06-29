import viewAssessmentView from './viewAssessmentView.js'
import assessmentModel from '../../../models/assessmentModel.js'
import candidateModel from '../../../models/candidateModel.js'

export class CViewAssessment {
    constructor() {
        this.view
    }

    init (){
        this.candidates = {};
        this.refreshTable();
    }

    attachEvents() {
        this.view = {
            window: $$('windowViewAssessment'),
            text: $$('viewTextareaAssessment'),
            datatableAssessment: $$('assessmentTabDatatable'),
            datatableCandidate: $$('viewDatatableCandidate'),
            datatableEmployee: $$('viewDatatableEmployee'),
            spacer: $$('spacerview'),
            btns: {
                closed: $$('closeViewAssessment'),
            }
        }

        this.view.btns.closed.attachEvent('onItemClick', () => {
            this.hide();
        })
        // обработка смены выбраного кандидата для отображения заметок по кандидату
        this.view.datatableCandidate.attachEvent("onSelectChange", () => {
            this.showText(); 
            candidateModel.getCandidateByID(this.view.datatableCandidate.getSelectedItem()?.id).then((candidate) => {
                this.view.text.setValue(candidate.note);
            });
            if (!this.view.datatableCandidate.getSelectedItem()) {
                this.hideText();
                return;
            }
        })
        // обработка события последнего нажатия для сохранения заметок
        this.view.text.attachEvent('onTimedKeyPress', () => {
            this.candidates = this.view.datatableCandidate.getSelectedItem();
            this.candidates.note = this.view.text.getValue();
            candidateModel.updateCandidate(this.candidates)
        });

    }


refreshTable() {
     assessmentModel.getAssessmentByID(this.view.datatableAssessment.getSelectedItem().id).then((assessment) => {
        this.view.datatableCandidate.clearAll() // очишение таблицы
        this.view.datatableCandidate.parse(assessment.candidateList) // заполнение таблицы
        this.view.datatableEmployee.clearAll() // очишение таблицы
        this.view.datatableEmployee.parse(assessment.employeeList) // заполнение таблицы
     })
}

    // refreshTableCandidate(candidate) {
    //     if (candidate) {
    //         this.view.datatableCandidate.clearAll() // очищение таблицы
    //         this.view.datatableCandidate.parse(candidate) // заполнение таблицы
    //         return
    //     } else {
    //         assessmentModel.getCandidateAssessmentById(this.view.datatableAssessment.getSelectedItem().id).then((candidate) => {
    //             // заполнение таблицы окна ассессментами
    //             this.view.datatableCandidate.clearAll() // очишение таблицы
    //             this.view.datatableCandidate.parse(candidate) // заполнение таблицы
    //         })
    //     }
    // }
    // refreshTableEmployee(employee) {
    //     if (employee) {
    //         this.view.datatableEmployee.clearAll() // очищение таблицы
    //         this.view.datatableEmployee.parse(employee) // заполнение таблицы
    //         return
    //     } else {
    //         assessmentModel.getEmployeeAssessmentById(this.view.datatableAssessment.getSelectedItem().id).then((employee) => {
    //             // заполнение таблицы окна ассессментами
    //             console.log(employee);
    //             this.view.datatableEmployee.clearAll() // очишение таблицы
    //             this.view.datatableEmployee.parse(employee) // заполнение таблицы
    //         })
    //     }
    // }

    show() {
        this.view.window.show();
    }

    hideText() {
        this.view.spacer.show();
        this.view.text.hide();
    }

    showText() {
        this.view.spacer.hide();
        this.view.text.show();
    }

    hide() {
        this.view.window.hide();
    }

    config() {
        return viewAssessmentView();
    }
}