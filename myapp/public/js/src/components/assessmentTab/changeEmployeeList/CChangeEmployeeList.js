import changeEmployeeListView from './ChangeEmployeeListView.js'
import employeeModel from '../../../models/EmployeeModel.js'
import assessmentModel from '../../../models/assessmentModel.js'

export class CChangeEmployeeList {
    constructor() {

    }

    init() {
        this.refreshTable();
    }

    attachEvents() {
        this.view = {
            window: $$('windowEmployeeInAssessment'),
            datatable: $$('assessmentEmployeeDatatable'),
            datatableAssessment: $$('assessmentTabDatatable'),
            btns: {
                cancel: $$('cancelEmployeeChange'),
                confirm: $$('confirmEmployeeChange'),
            },
        };

        this.view.datatable.attachEvent("onAfterEditStop", (state, editor, ignoreUpdate) => {
            if (state.value === 'Интервьюер') {
                for (const key in this.view.datatable.data.pull) {
                    if(this.view.datatable.data.pull[key].roleEmployee !== 'Интервьюер')
                        this.view.datatable.data.pull[key].roleEmployee = "Член комиссии";
                }
            }

            this.assessment = this.view.datatableAssessment.getSelectedItem();
            this.assessment.statusAssessment = 'В ожидании оценки'
            assessmentModel.updateStatus(this.assessment.id, this.assessment);
            this.view.statusAssessment.setHTML('В ожидании оценки');
        });
        this.view.btns.cancel.attachEvent('onItemClick', () => {
            this.refreshTable();
            this.view.datatable.clearSelection();
            if (this.view.datatableAssessment.getSelectedItem() !== undefined) {
                assessmentModel.getAssessmentByID(this.view.datatableAssessment.getSelectedItem()?.id).then((assessment) => {
                    if (Array.isArray(assessment.employeeList)) {
                        for (const iterator of assessment.employeeList) {
                            this.view.datatable.select(iterator.id, true);
                        }
                    } else if (assessment.employeeList?.id !== undefined) {
                        this.view.datatable.select(assessment.employeeList?.id);
                    }
                });
            }
            this.hide();
        });

        this.view.btns.confirm.attachEvent('onItemClick', () => {
            if (Array.isArray(this.view.datatable.getSelectedItem())) {
                for (const iterator of this.view.datatable.getSelectedItem()) {
                    if (iterator.roleEmployee === "") {
                        webix.message('Вы не заполнили роли у выбранных сотрудников');
                        return
                    }
                }
            } else if (this.view.datatable.getSelectedItem().roleEmployee === "") {
                webix.message('Вы не заполнили роли у выбранных сотрудников');
                return
            }
            this.hide();
        });
    }

    config() {
        return changeEmployeeListView();
    }

    show() {
        this.view.window.show();
    }

    hide() {
        this.view.window.hide();
    }

    clear() {

    }

    refreshTable(employee) {
        if (employee) {
            this.view.datatable.clearAll() // очищение таблицы
            this.view.datatable.parse(employee) // заполнение таблицы
            return
        } else {
            employeeModel.getEmployees().then((employee) => {
                // заполнение таблицы окна информацией о кандидатах
                this.view.datatable.clearAll() // очишение таблицы
                this.view.datatable.parse(employee) // заполнение таблицы
            })
        }
    }
}