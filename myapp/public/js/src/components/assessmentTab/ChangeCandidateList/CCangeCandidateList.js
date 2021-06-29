import changeCandidateListView from './CangeCandidateListView.js'
import candidateModel from '../../../models/candidateModel.js'
import assessmentModel from '../../../models/assessmentModel.js'

export class CCangeCandidateList {
    constructor() {

    }

    init() {
        this.refreshTable();
    }

    attachEvents() {
        this.view = {
            window:  $$('windowCandidateInAssessment'),
            datatable: $$('assessmentCandidateDatatable'),
            datatableAssessment: $$('assessmentTabDatatable'),
            btns: {
                cancel: $$('cancelChange'),
                confirm: $$ ('confirmChange'),
            },
        };

        this.view.btns.cancel.attachEvent('onItemClick', () => {
            this.refreshTable();
            this.view.datatable.clearSelection();
            if(this.view.datatableAssessment.getSelectedItem() !== undefined) {
                assessmentModel.getAssessmentByID(this.view.datatableAssessment.getSelectedItem()?.id).then((assessment) => {
                    if(Array.isArray(assessment.candidateList)) {
                        for (const iterator of assessment.candidateList) {
                            this.view.datatable.select(iterator.id, true);
                        } 
                    }   else if (assessment.candidateList?.id !== undefined) {
                            this.view.datatable.select(assessment.candidateList?.id);
                    }
                });
            }
            this.hide();
        });
        this.view.btns.confirm.attachEvent('onItemClick', () => {
            this.hide();
        });
    }

    config() {
        return changeCandidateListView();
    }

    show() {
        this.view.window.show();
    }

    hide() {
        this.view.window.hide();
    }

    clear() {

    }

    refreshTable(candidate) {
        if (candidate) {
            this.view.datatable.clearAll() // очищение таблицы
            this.view.datatable.parse(candidate) // заполнение таблицы
            return
        } else {
            candidateModel.getCandidate().then((candidate) => {
                // заполнение таблицы окна информацией о кандидатах
                this.view.datatable.clearAll() // очишение таблицы
                this.view.datatable.parse(candidate) // заполнение таблицы
            })
        }
    }
}