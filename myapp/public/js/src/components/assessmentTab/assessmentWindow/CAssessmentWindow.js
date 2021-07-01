import assessmentWindowView from './assessmentWindowView.js'
import assessmentModel from '../../../models/assessmentModel.js'
import { CCangeCandidateList } from '../ChangeCandidateList/CCangeCandidateList.js'
import { CChangeEmployeeList } from '../ChangeEmployeeList/CChangeEmployeeList.js'
import employeeModel from '../../../models/employeeModel.js'
import candidateModel from '../../../models/candidateModel.js'
import { Assessment } from '../../../models/entities/assessment.js'

export class CAssessmentWindow {
    constructor() {
        this.view
        this.isStatus
        this.Interviewer = [];
        this.Assessment = new Assessment()
        this.Candidate
    }

    init (onChange){
        this.windowCandidate = new CCangeCandidateList();
        this.windowEmployee = new CChangeEmployeeList();
        this.onChange = onChange;
        this.windowCandidate.init();
        this.windowEmployee.init();
        // this.refreshOptions();
    }

    attachEvents() {
        this.view = {
            window:  $$('windowAssessment'),
            windowLabel: $$('assessmentWindowLabel'),
            dataTableModal: $$('assessmentCandidateDatatable'),
            dataTableEmployee: $$('assessmentEmployeeDatatable'),
            dataTable: $$('assessmentTabDatatable'),
            form: $$('formAssessment'),
            formfields: {
                //id: $$('id'),
                nameAss: $$('nameAssessment'),
                //Interviewer: $$('Interviewer'),
                addСommissionInAss: $$('addСommissionInAss'),
                addCandidateInAss: $$('addCandidateInAss'),
                dateAss: $$('dateAssessment'),
            },
            btns: {
                confirm: $$('assessmentWindowConfirmBtn'),
                cancel: $$('assessmentWindowCancelBtn'),
            },
        }
        // при открытие окна заполнение таблиц сотрудников и кандидавтов ассессмента
        this.view.window.attachEvent('onShow', () => {
            if(this.type !== ASSESSMENT_WINDOW_TYPE.create) {
            this.windowCandidate.refreshTable();
            this.view.dataTableModal.clearSelection();
            assessmentModel.getAssessmentByID(this.view.dataTable.getSelectedItem()?.id).then((assessment) => {
                if(Array.isArray(assessment.candidateList)) {
                    for (const iterator of assessment.candidateList) {
                        this.view.dataTableModal.select(iterator.id, true);
                    } 
                }   else if (assessment.candidateList?.id !== undefined) {
                        this.view.dataTableModal.select(assessment.candidateList?.id);
                }
            })

            this.windowEmployee.refreshTable();
            this.view.dataTableEmployee.clearSelection();
            assessmentModel.getAssessmentByID(this.view.dataTable.getSelectedItem()?.id).then((assessment) => {
                if(Array.isArray(assessment.employeeList)) {
                    for (const iterator of assessment.employeeList) {
                        this.view.dataTableEmployee.select(iterator.id, true);
                        this.view.dataTableEmployee.data.pull[iterator.id].roleEmployee = iterator.roleEmployee
                    } 
                }   else if (assessment.employeeList?.id !== undefined) {
                        this.view.dataTableEmployee.select(assessment.employeeList?.id);
                        this.view.dataTableEmployee.data.pull.roleEmployee = iterator.roleEmployee
                }
            })
        }
        });

        this.windowCandidate.attachEvents();
        this.windowEmployee.attachEvents();

        // очистка не успешной валидации при изменение любого поля формы
        this.view.form.attachEvent('onChange', () => {
            this.view.form.clearValidation();
        });

        // обработчик по кнопке принять 
        this.view.btns.confirm.attachEvent('onItemClick', () => {
            if(!this.validate()) {
                return
            }
            switch (this.type) {
                // при создание ассессмента
                case ASSESSMENT_WINDOW_TYPE.create:
                    this.Assessment = this.view.form.getValues();
                    console.log(this.view.dataTableModal.getSelectedItem())
                    if (Array.isArray(this.view.dataTableModal.getSelectedItem())) {
                        this.Assessment.candidateList = this.view.dataTableModal.getSelectedItem();
                    } else if(this.view.dataTableModal.getSelectedItem() !== undefined) {
                        this.Assessment.candidateList = []
                        this.Assessment.candidateList.push(this.view.dataTableModal.getSelectedItem())
                    } else this.Assessment.candidateList = undefined
                    // // заполнение ассессмента списком сотрудников 
                    this.Assessment.employeeList = this.view.dataTableEmployee.getSelectedItem();
                    if (Array.isArray(this.view.dataTableEmployee.getSelectedItem())) {
                        this.Assessment.employeeList = this.view.dataTableEmployee.getSelectedItem();
                    } else if (this.view.dataTableEmployee.getSelectedItem() !== undefined){
                        this.Assessment.employeeList = []
                        this.Assessment.employeeList.push(this.view.dataTableEmployee.getSelectedItem())
                    } else this.Assessment.employeeList = undefined
                    if(this.Assessment.candidateList === undefined || this.Assessment.employeeList === undefined) {
                        this.Assessment.statusAssessment = "Не заполнен";
                    } else {
                        this.Assessment.statusAssessment = "Заполнен";
                    }
                    
                    assessmentModel.createAssessment(this.Assessment).then(() => {
                        this.onChange()
                        this.hide()
                    });
                    this.hide();

                    // очистка таблиц сотрдников и кандидатов ассессмента
                    this.view.dataTableModal.clearSelection();
                    this.view.dataTableEmployee.clearSelection();
                    break;
                case ASSESSMENT_WINDOW_TYPE.update:
                    this.Assessment = this.view.form.getValues();
                    console.log(this.view.dataTableModal.getSelectedItem())
                    if (Array.isArray(this.view.dataTableModal.getSelectedItem())) {
                        this.Assessment.candidateList = this.view.dataTableModal.getSelectedItem();
                    } else if(this.view.dataTableModal.getSelectedItem() !== undefined) {
                        this.Assessment.candidateList = []
                        this.Assessment.candidateList.push(this.view.dataTableModal.getSelectedItem())
                    } else this.Assessment.candidateList = undefined
                    // // заполнение ассессмента списком сотрудников 
                    this.Assessment.employeeList = this.view.dataTableEmployee.getSelectedItem();
                    if (Array.isArray(this.view.dataTableEmployee.getSelectedItem())) {
                        this.Assessment.employeeList = this.view.dataTableEmployee.getSelectedItem();
                    } else if (this.view.dataTableEmployee.getSelectedItem() !== undefined){
                        this.Assessment.employeeList = []
                        this.Assessment.employeeList.push(this.view.dataTableEmployee.getSelectedItem())
                    } else this.Assessment.employeeList = undefined
                    if(this.Assessment.candidateList === undefined || this.Assessment.employeeList === undefined) {
                        this.Assessment.statusAssessment = "Не заполнен";
                    } else {
                        this.Assessment.statusAssessment = "Заполнен";
                    }
                    assessmentModel.updateAssessment(this.Assessment).then(() => {
                        this.onChange();
                        this.hide();
                    });
                    this.view.dataTableModal.clearSelection();
                    this.view.dataTableEmployee.clearSelection();
                    this.hide();
                    break;
                case ASSESSMENT_WINDOW_TYPE.delete:
                    assessmentModel.deleteAssessment(this.view.form.getValues()).then(() => {
                        this.onChange();
                        this.hide();
                    });
                    this.hide();
                    break;
            }
        });

        this.view.btns.cancel.attachEvent('onItemClick', () => {
            this.hide();
        });
        // событие для окрытия окна добавление кандидатов
        this.view.formfields.addCandidateInAss.attachEvent('onItemClick', () => {
            this.windowCandidate.refreshTable();
            this.view.dataTableModal.clearSelection();
            if(this.type !== ASSESSMENT_WINDOW_TYPE.create) {
                assessmentModel.getAssessmentByID(this.view.dataTable.getSelectedItem()?.id).then((assessment) => {
                    if(Array.isArray(assessment.candidateList)) {
                        for (const iterator of assessment.candidateList) {
                            this.view.dataTableModal.select(iterator.id, true);
                        } 
                    }   else if (assessment.candidateList?.id !== undefined) {
                            this.view.dataTableModal.select(assessment.candidateList?.id);
                    }
                });
            }
            this.addCandidateInAssessment();
        })
        // событие для открытия окна добавления сотрудников
        this.view.formfields.addСommissionInAss.attachEvent('onItemClick', () => {
            this.windowEmployee.refreshTable();
            this.view.dataTableEmployee.clearSelection();
            if(this.type !== ASSESSMENT_WINDOW_TYPE.create) {
                assessmentModel.getAssessmentByID(this.view.dataTable.getSelectedItem()?.id).then((assessment) => {
                    if(Array.isArray(assessment.employeeList)) {
                        for (const iterator of assessment.employeeList) {
                            this.view.dataTableEmployee.select(iterator.id, true);
                        } 
                    }   else if (assessment.employeeList?.id !== undefined) {
                            this.view.dataTableEmployee.select(assessment.employeeList?.id);
                    }
                })
            }
            this.addEmployeeInAssessment();
        });

    }
    // метод валидации формы
    validate() {
        console.log(this.view.form.validate())
        return this.view.form.validate();
    }
    // метод отправки конфигурации
    config() {
        webix.ui(this.windowEmployee.config())
        webix.ui(this.windowCandidate.config());
        return assessmentWindowView();
    }
    // метод отображения окна
    show(type) {
        switch (type) {
            case ASSESSMENT_WINDOW_TYPE.create:
                this.clear();
                this.view.windowLabel.setHTML('Добавление ассессмента')
                this.view.btns.confirm.setValue('Добавить')
                this.view.formfields.addСommissionInAss.setValue('Добавить сотрудников в ассессмент')
                this.view.formfields.addCandidateInAss.setValue('Добавить кандидатов в ассессмент')
                this.view.formfields.addСommissionInAss.show()
                this.view.formfields.addCandidateInAss.show()
                //this.view.formfields.id.enable()
                this.view.formfields.nameAss.enable()
                //this.view.formfields.Interviewer.enable()
                this.view.formfields.addСommissionInAss.enable()
                this.view.formfields.addCandidateInAss.enable()
                this.view.formfields.dateAss.enable()
                break;
            case ASSESSMENT_WINDOW_TYPE.update:
                this.view.windowLabel.setHTML('Редактирование ассессмента')
                this.view.btns.confirm.setValue('Изменить')
                this.view.formfields.addСommissionInAss.setValue('Изменить список сотрудников')
                this.view.formfields.addCandidateInAss.setValue('Изменить список кандидатов')
                this.view.formfields.addСommissionInAss.show()
                this.view.formfields.addCandidateInAss.show()
                //this.view.formfields.id.enable()
                this.view.formfields.nameAss.enable()
                // this.view.formfields.Interviewer.enable()
                this.view.formfields.addСommissionInAss.enable()
                this.view.formfields.addCandidateInAss.enable()
                this.view.formfields.dateAss.enable()
                break;
            case ASSESSMENT_WINDOW_TYPE.delete:
                this.view.windowLabel.setHTML('Удаление ассессмента')
                this.view.btns.confirm.setValue('Удалить')
                this.view.formfields.addСommissionInAss.hide()
                this.view.formfields.addCandidateInAss.hide()
                //this.view.formfields.id.disable()
                this.view.formfields.nameAss.disable()
                // this.view.formfields.Interviewer.disable()
                this.view.formfields.addСommissionInAss.disable()
                this.view.formfields.addCandidateInAss.disable()
                this.view.formfields.dateAss.disable()
                break;
            default:
                console.error('Неизвестный тип отображения окна для работы с сущностью ассессмента');
                return;
        }

        this.type = type;
        this.view.window.show();
    }
    // метод скрытия окна
    hide() {
        this.view.window.hide();
    }
    // метод очистки формы
    clear() {
        this.view.form.clear();
    }
    // метод заполнения формы
    parse(values) {
        this.view.form.setValues(values);
    }
    // метод открытия окна добавления кандидатов в ассессмент
    addCandidateInAssessment() {
        this.windowCandidate.show();
    }
    // метод открытия окна добавления сотрудников в ассессмент
    addEmployeeInAssessment() {
        this.windowEmployee.show();
    }

}

export const ASSESSMENT_WINDOW_TYPE = {
    create: 'CREATE',
    update: 'UPDATE',
    delete: 'DELETE',
}