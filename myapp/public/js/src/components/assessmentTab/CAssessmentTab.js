import assessmentTabView from './AssessmentTabView.js'
import { CAssessmentWindow, ASSESSMENT_WINDOW_TYPE } from './assessmentWindow/CAssessmentWindow.js'
import assessmentModel from '../../models/assessmentModel.js'
import { CStartAssessment } from './startAssessment/CStartAssessment.js'
import { CViewAssessment } from './viewAssessment/CViewAssessment.js'
import { Assessment } from '../../models/entities/assessment.js'

export class CAssesmentTab {
    constructor() {
        this.view
        this.window
        this.windowStart
        this.windowView
    }

    init (){
        this.window = new CAssessmentWindow();
        this.windowStart = new CStartAssessment();
        this.windowView = new CViewAssessment();
        this.refreshTable();
        this.window.init( () => {
            this.refreshTable()
        });
    }

    attachEvents() {
        // инициализатия используемых представлений
        this.view = {
            datatable: $$('assessmentTabDatatable'),
            startWindow: $$('windowStartAssessment'),
            btns: {
                viewAssessmentbtn: $$('viewAssessment'),
                startBtn:  $$('startAssessment'),
                createBtn: $$('addAssessment'),
                updateBtn: $$('editAssessment'),
                deleteBtn: $$('deleteAssessment'),
            }
        }
        // загрузка событий модального окна
        this.window.attachEvents();
        this.windowStart.attachEvents();
        this.windowView.attachEvents();
        
        // обработчик события кнопки посмотреть ассессмент
        this.view.btns.viewAssessmentbtn.attachEvent('onItemClick', () => {
            this.viewAssessment();
        });
        // обработчик событий ктопки добавить
        this.view.btns.createBtn.attachEvent("onItemClick", () => {
            this.createAssessment();
        });
        // обработчик событий при завершение окна начать ассессмен для обнавления  таблицы ассессмента
        this.view.startWindow.attachEvent('onHide', () => {
            this.refreshTable();
        });

        //  обработчик событий кнопки изменить
        this.view.btns.updateBtn.attachEvent("onItemClick", () => {
            this.updateAssessment();
          });
        // обработчик событий кнопки удалить
        this.view.btns.deleteBtn.attachEvent("onItemClick", () => {
            this.deleteAssessment();
        });
        // обработчик события при нажатие на начать ассессмент
        this.view.btns.startBtn.attachEvent('onItemClick', () => {
            this.startAssessment();
        })
    }

    config() {
        webix.ui(this.windowStart.config());
        webix.ui(this.window.config());
        webix.ui(this.windowView.config());
        return assessmentTabView();
    }

    refreshTable(assessment) {
        if (assessment) {
            this.view.datatable.clearAll() // очищение таблицы
            this.view.datatable.parse(assessment) // заполнение таблицы
            return
        } else {
            assessmentModel.getAssessment().then((assessment) => {
                // заполнение таблицы окна ассессментами
                this.view.datatable.clearAll() // очишение таблицы
                if (Array.isArray(assessment)) {
                for (const iterator of assessment) {
                    this.Assessment = new Assessment(
                        iterator.id,
                        iterator.nameAssessment,
                        iterator.candidateList,
                        iterator.employeeList,
                        iterator.dateAssessment,
                        iterator.statusAssessment
                        )
                        this.view.datatable.parse(this.Assessment)
                    }
                } else {
                    this.Assessment = new Assessment(
                    assessment.id,
                    assessment.nameAssessment,
                    assessment.candidateList,
                    assessment.employeeList,
                    assessment.dateAssessment,
                    assessment.statusAssessment
                    )
                    this.view.datatable.parse(this.Assessment)
                }

                
                 // заполнение таблицы
            })
        }
    }
    // метод начала ассессмента
    startAssessment() {
        let selected = this.view.datatable.getSelectedItem()
        // проверка на выделеную строку
        if (!selected) {
            webix.message('Выделите строку');
            return
        }
        if(selected.statusAssessment === 'Завершен') {
            webix.message('Ассессмент уже завершен');
            return
        } else if (selected.statusAssessment === undefined || selected.statusAssessment === 'Не заполнен') {
            webix.message('Заполните ассессмент');
            return
        } else if (selected.statusAssessment === 'Заполнен' || selected.statusAssessment === 'В ожидании оценки') {
        this.windowStart.show();
        this.windowStart.refreshTable();
        $$('StartNoteTextAssessment').hide();
        $$('textTemplate').show();
        }
    }
// метод открытия просмотра ассессмента
    viewAssessment() {
        let selected = this.view.datatable.getSelectedItem();
        if(!selected) {
            webix.message('Выделите строку');
            return
        }
        this.windowView.refreshTable();
        this.windowView.show();
        this.windowView.hideText();
    }
    // метод открытия модального окна создать ассессмент
    createAssessment() {
        //this.window.refreshOptions();
        this.view.datatable.clearSelection();
        this.window.show(ASSESSMENT_WINDOW_TYPE.create);
    }
    // метод открытия модального окна изменить ассессмент
    updateAssessment() {
        //this.window.refreshOptions();
        let selected = this.view.datatable.getSelectedItem()
        // проверка на выделеную строку
        if (!selected) {
            webix.message('Выделите строку');
            return;
        }
        this.window.parse(selected) // заполнение формы данными ассессмента
        this.window.show(ASSESSMENT_WINDOW_TYPE.update); // метод открытия окна
    }
    // метод открытия модального окна удалить ассессмент
    deleteAssessment() {
        //this.window.refreshOptions();
        let selected = this.view.datatable.getSelectedItem()
        // проверка на выделенныю строку
        if (!selected) {
            webix.message('Выделите строку');
            return;
        }
        this.window.parse(selected) // заполнение формы ассесментами
        this.window.show(ASSESSMENT_WINDOW_TYPE.delete); // метод открытие окна
    }
}