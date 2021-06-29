import employeeTabView from './EmployeeTabView.js'
import {CEmployeeWindow, EMPLOYEE_WINDOW_TYPE} from './employeeWindow/CEmployeeWindow.js'
import employeeModel from '../../models/employeeModel.js'

export class CEmployeeTab {
    constructor() {
        this.view
        this.window
    }
    // метод инициализации таба сотрудников 
    init (){
        this.window = new CEmployeeWindow(); // инициализация модального окна
        this.refreshTable();// первичная загрузка таблицы
        this.window.init( () => {
            this.refreshTable()
        });
    }
    // метод обрабатывающий события 
    attachEvents() {
        // инициализация используемых представлений
        this.view = {
            datatable: $$('employeeTabDatatable'),
            btns: {
                createBtn: $$('addEmployee'),
                updateBtn: $$('editEmployee'),
                deleteBtn: $$('deleteEmployee'),
            }
        }
        // загрузка обработчиков модального окна
        this.window.attachEvents();
        // вызов модально окна по "добавить"
        this.view.btns.createBtn.attachEvent("onItemClick", () => {
            this.createEmployee();
        });
        // вызов модально окна по "изменить"
        this.view.btns.updateBtn.attachEvent("onItemClick", () => {
            this.updateEmployee();
          });
        // вызов модально окна по "удалить"
        this.view.btns.deleteBtn.attachEvent("onItemClick", () => {
            this.deleteEmployee();
        });
    }
    // метод возвращаюший конфигурацию webix 
    config() { 
        webix.ui(this.window.config());
        return employeeTabView();
    }
    // создание сотрудника 
    createEmployee() {
        this.window.show(EMPLOYEE_WINDOW_TYPE.create);
    }
    // редактирование сотрудника 
    updateEmployee() {
        let selected = this.view.datatable.getSelectedItem()
        if (!selected) {
            webix.message('Выделите строку');
            return;
        }
        this.window.parse(selected)
        this.window.show(EMPLOYEE_WINDOW_TYPE.update);
    }
    // удаление сотрудника 
    deleteEmployee() {
        let selected = this.view.datatable.getSelectedItem()
        if (!selected) {
            webix.message('Выделите строку');
            return;
        }
        this.window.parse(selected)
        this.window.show(EMPLOYEE_WINDOW_TYPE.delete);
    }
    // обновление таблицы сотрудников
    refreshTable(employee) {
        if (employee) {
            this.view.datatable.clearAll() // очищение таблицы
            this.view.datatable.parse(employee) // заполнение таблицы
            return
        } else {
            employeeModel.getEmployees().then((employee) => {
                // заполнение таблицы окна данными сотрудников
                this.view.datatable.clearAll() // очищение таблицы
                this.view.datatable.parse(employee) // заполнение таблицы
            })
        }
    }

}