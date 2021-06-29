import employeeWindowView from './employeeWindowView.js'
//import employee from '../../../models/entities/employee'
import employeeModel from '../../../models/employeeModel.js'
import positionModel from '../../../models/positionModel.js'

export class CEmployeeWindow {
    constructor() {
        this.view
        this.onChange
    }
    // инициализация компанента
    init (onChange){
        this.onChange = onChange;
    }
    // метод обработки событий
    attachEvents() {
        // инициализатия используемых представлений
        this.view = {
            window:  $$('windowEmployee'),
            windowLabel: $$('employeeWindowLabel'),
            form: $$('formEmployee'),
            btns: {
                confirm: $$('employeeWindowConfirmBtn'),
                cancel: $$('employeeWindowCancelBtn'),
            },
            formfields: {
                name: $$('firstNameEmployee'),
                lastname: $$('lastNameEmployee'),
                middlename: $$('middleNameEmployee'),
                mail: $$('mailEmployee'),
                phone: $$('phoneEmployee'),
                position: $$('positionEmployee'),
            }
        }

        positionModel.getPositions().then((positions) => {
            positions.map((position) => {
                position.id = position.name
                position.value = position.name
            })

            this.view.formfields.position.define('options', positions)
            this.view.formfields.position.refresh()
        })

        // обработка нажатия на отмена
        this.view.btns.cancel.attachEvent('onItemClick', () => {
            this.hide();
        });
        // обработка нажатия на принять
        this.view.btns.confirm.attachEvent('onItemClick', () => {
            if (!this.validate()) {
                return
            }
            switch (this.type) {
                case EMPLOYEE_WINDOW_TYPE.create: //обработчик для события создать
                    employeeModel.createEmployee(this.view.form.getValues()).then(() => {
                        this.onChange()
                        this.hide()
                    });
                break;
            case EMPLOYEE_WINDOW_TYPE.update: // обработчик для события изменить
                employeeModel.updateEmployee(this.view.form.getValues()).then(() => {
                    this.onChange();
                    this.hide();
                });
                break;
            case EMPLOYEE_WINDOW_TYPE.delete: // обработчик для события удалить
                employeeModel.deleteEmployee(this.view.form.getValues().id).then(() => {
                    this.onChange();
                    this.hide();
                });
                break;
            }
        });

    }
    // метод возвращающий webix конфигурацию модального окна
    config() {
        return employeeWindowView();
    }
    // метод отображения окна
    show(type) {
        switch (type) {
            case EMPLOYEE_WINDOW_TYPE.create: // обработка при добавление сотрудника
                this.clear();
                this.view.windowLabel.setHTML('Добавление сотрудника')
                this.view.btns.confirm.setValue('Добавить')
                this.view.formfields.name.enable() // делает все поля доступными 
                this.view.formfields.lastname.enable()
                this.view.formfields.middlename.enable()
                this.view.formfields.mail.enable()
                this.view.formfields.phone.enable()
                this.view.formfields.position.enable()
                break;
            case EMPLOYEE_WINDOW_TYPE.update: // обработка при изменение сотрудника
                this.view.windowLabel.setHTML('Редактирование сотрудника')
                this.view.btns.confirm.setValue('Изменить')
                this.view.formfields.name.enable() // делает все поля доступными
                this.view.formfields.lastname.enable()
                this.view.formfields.middlename.enable()
                this.view.formfields.mail.enable()
                this.view.formfields.phone.enable()
                this.view.formfields.position.enable()
                break;
            case EMPLOYEE_WINDOW_TYPE.delete: // обработка при удаление сотрудника
                this.view.windowLabel.setHTML('Удаление сотрудника')
                this.view.btns.confirm.setValue('Удалить')
                this.view.formfields.name.disable() // делает все поля недоступными
                this.view.formfields.lastname.disable()
                this.view.formfields.middlename.disable()
                this.view.formfields.mail.disable()
                this.view.formfields.phone.disable()
                this.view.formfields.position.disable()
                break;
            default:
                console.error('Неизвестный тип отображения окна для работы с сущностью сотрудника');
                return;
        }

        this.type = type;
        this.view.window.show();
    }

    validate() {
        return this.view.form.validate();
    }
    // метод скрытия окна 
    hide() {
        this.view.window.hide();
    }
    // метод очистки формы
    clear() {
        
        this.view.form.clear();
    }
    // метод заполнение формы данными таблицы 
    parse(values) {
        this.view.form.setValues(values);
    }

}
// возможные события модального окна
export const EMPLOYEE_WINDOW_TYPE = {
    create: 'CREATE',
    update: 'UPDATE',
    delete: 'DELETe',
}