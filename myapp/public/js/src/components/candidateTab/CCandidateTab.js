import candidateTabView from './CandidateTabView.js'
import { CCandidateWindow, CANDIDATE_WINDOW_TYPE } from './candidateWindow/CCandidateWindow.js'
import candidateModel from '../../models/candidateModel.js'

export class CCandidateTab {
    constructor() {
        this.view
        this.window
    }
    // инициализация компонента 
    init (){
        this.window = new CCandidateWindow();
        this.refreshTable();
        this.window.init( () => {
            this.refreshTable()
        });
    }
    // метод с обработчиами событий
    attachEvents() {
        // инициализатия используемых представлений
        this.view = {
            datatable: $$('candidateTabDatatable'),
            btns: {
                createBtn: $$('addCandidate'),
                updateBtn: $$('editCandidate'),
                deleteBtn: $$('deleteCandidate'),
            }
        }
        // загрузка событий модального окна
        this.window.attachEvents();
        // обработчик событий ктопки добавить
        this.view.btns.createBtn.attachEvent("onItemClick", () => {
            this.createCandidate();
        });
        //  обработчик событий кнопки изменить
        this.view.btns.updateBtn.attachEvent("onItemClick", () => {
            this.updateCandidate();
          });
        // обработчик событий кнопки удалить
        this.view.btns.deleteBtn.attachEvent("onItemClick", () => {
            this.deleteCandidate();
        });
    }
    //  метод отправки конфигурации webix компонента
    config() {
        webix.ui(this.window.config());
        return candidateTabView();
    }
    // метод добавления кандидата
    createCandidate() {
        this.window.show(CANDIDATE_WINDOW_TYPE.create);
    }
    // метод изменения кандидата 
    updateCandidate() {
        let selected = this.view.datatable.getSelectedItem()
        // проверка на выделеную строку
        if (!selected) {
            webix.message('Выделите строку');
            return;
        }
        this.window.parse(selected) // заполнение формы данными кандидата
        this.window.show(CANDIDATE_WINDOW_TYPE.update); // метод открытия окна
    }
    // метод удаления кандидата
    deleteCandidate() {
        let selected = this.view.datatable.getSelectedItem()
        // проверка на выделенныю строку
        if (!selected) {
            webix.message('Выделите строку');
            return;
        }
        this.window.parse(selected) // заполнение формы даными кандидата
        this.window.show(CANDIDATE_WINDOW_TYPE.delete); // метод открытие окна
    }
    // метод обновляющий данные в таблице
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