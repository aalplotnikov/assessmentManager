import startAssessmentView from './startAssessmentView.js'
import assessmentModel from '../../../models/assessmentModel.js'
import candidateModel from '../../../models/candidateModel.js'

export class CStartAssessment {
    constructor() {
        this.view;
        this.assessment = {};
        this.candidates = {};
    }

    init() {
        this.refreshTable();
    }

    attachEvents() {
        this.view = {
            window: $$('windowStartAssessment'),
            datatable: $$('assessmentStartDatatable'),
            datatableAssessment: $$('assessmentTabDatatable'),
            text: $$('StartNoteTextAssessment'),
            spacer: $$("textTemplate"),
            nameAssessment: $$('nameStartAssessment'),
            statusAssessment: $$('statusStartAssessment'),
            btns: {
                cancel: $$('closeAssessment'),
                confirm: $$('endAssessment'),
            }
        }

        this.view.datatable.attachEvent('onSelectChange', () => {
            console.log('ddd');
        });
        // метод отабражение статуса при открытие окна
        this.view.window.attachEvent('onShow', () => {
            this.view.nameAssessment.setHTML(this.view.datatableAssessment.getSelectedItem().nameAssessment);
            assessmentModel.getAssessmentByID(this.view.datatableAssessment.getSelectedItem().id).then((assessment) => {
                this.view.statusAssessment.setHTML(assessment.statusAssessment);
            });
        })
        // обработка события при нажатии на кнопу завершить ассессмент
        this.view.btns.confirm.attachEvent('onItemClick', () => {
            // проверка на пустые ячейки
            for (const key in this.view.datatable.data.pull) {
                if(this.view.datatable.data.pull[key].ofsetCandidate === undefined ||
                    this.view.datatable.data.pull[key].statusCandidate === undefined) {
                    webix.message('Вы не заполнили все поля');
                    return
                } else {
                    this.view.datatable.data.pull[key].statusCandidate = this.view.datatable.data.pull[key].ofsetCandidate
                    candidateModel.updateCandidate(this.view.datatable.data.pull[key]);
                }
            }
            this.hide();
            this.assessment = this.view.datatableAssessment.getSelectedItem();
            this.assessment.statusAssessment = 'Завершен'
            assessmentModel.updateAssessment(this.assessment);
            this.view.datatableAssessment.refreshTable();
        });
        // событие на кнопку закрыть ассессмент
        this.view.btns.cancel.attachEvent("onItemClick", () => {
            this.hide();
        })
        // собыытие эдитора когда произошло изменение
        this.view.datatable.attachEvent("onAfterEditStop", (state, editor, ignoreUpdate) => {
            // заполняем автоматически когда человек не явился статусом не успешен
            if (state.value === 'Не явился'){
                const row = this.view.datatable.getItem(this.view.datatable.getSelectedId().row);
                row.ofsetCandidate = "Не успешен";
                this.view.datatable.updateItem(this.view.datatable.getSelectedId().row, row);
            }
            // проверяем все поля если все изменяем статус
            for (const key in this.view.datatable.data.pull) {
                if(!(this.view.datatable.data.pull[key].statusCandidate === 'Не явился' ||
                    this.view.datatable.data.pull[key].statusCandidate === 'Явился')) {
                    return
                }
            }

            this.assessment = this.view.datatableAssessment.getSelectedItem();
            this.assessment.statusAssessment = 'В ожидании оценки'
            assessmentModel.updateAssessment(this.assessment);
            this.view.statusAssessment.setHTML('В ожидании оценки');
        });
        // обработка смены выбраного кандидата для отображения заметок по кандидату
        this.view.datatable.attachEvent("onSelectChange", () => {
            this.view.spacer.hide();
            this.view.text.show();
            if(this.view.datatable.getSelectedItem() !== undefined) {
                candidateModel.getCandidateByID(this.view.datatable.getSelectedItem()?.id).then((candidate) => {
                    this.view.text.setValue(candidate.note);
                })
            }   
            if (!this.view.datatable.getSelectedItem()) {
                this.view.spacer.show();
                this.view.text.hide(); 
                return;
            }
        })
        // обработка события последнего нажатия для сохранения заметок
        this.view.text.attachEvent('onTimedKeyPress', () => {
            this.candidates = this.view.datatable.getSelectedItem();
            this.candidates.note = this.view.text.getValue();
            candidateModel.updateCandidate(this.candidates)
        });
    }

    config() {
        return startAssessmentView();
    }

    hide() {
        this.view.window.hide();
    }

    show() {
        this.view.window.show();
    }

    refreshTable(candidate) {
        if (candidate) {
            this.view.datatable.clearAll() // очищение таблицы
            this.view.datatable.parse(candidate) // заполнение таблицы
            return
        } else {
            console.log(candidate);
            assessmentModel.getAssessmentByID(this.view.datatableAssessment.getSelectedItem().id).then((assessment) => {
                // заполнение таблицы окна ассессментами
                this.view.datatable.clearAll() // очишение таблицы
                this.view.datatable.parse(assessment.candidateList) // заполнение таблицы
            })
        }
    }
}