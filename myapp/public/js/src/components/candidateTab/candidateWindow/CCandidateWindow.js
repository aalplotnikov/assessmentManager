import candidateWindowView from './candidateWindowView.js'
import candidateModel from '../../../models/candidateModel.js'

export class CCandidateWindow {
    constructor() {
        this.view
    }

    init (onChange){
        this.onChange = onChange;
    }

    attachEvents() {
        this.view = {
            window:  $$('windowCandidate'),
            windowLabel: $$('candidateWindowLabel'),
            form: $$('formCandidate'),
            btns: {
                confirm: $$('candidateWindowConfirmBtn'),
                cancel: $$('candidateWindowCancelBtn'),
            },
            formfields: {
                name: $$('firstNameCandidate'),
                lastname: $$('lastNameCandidate'),
                middlename: $$('middleNameCandidate'),
                mail: $$('mailCandidate'),
                phone: $$('phoneCandidate'),
            }
        }

        // обработчик на кнопку применить 
        this.view.btns.confirm.attachEvent('onItemClick', () => {
            if (!this.validate()) {
                return
            }
            switch (this.type) {
                case CANDIDATE_WINDOW_TYPE.create:
                    candidateModel.createCandidate(this.view.form.getValues()).then(() => {
                        this.onChange()
                        this.hide()
                    });
                    break;
                case CANDIDATE_WINDOW_TYPE.update:
                    candidateModel.updateCandidate(this.view.form.getValues()).then(() => {
                        this.onChange();
                        this.hide();
                    });
                    break;
                case CANDIDATE_WINDOW_TYPE.delete:
                    candidateModel.deleteCandidate(this.view.form.getValues()).then(() => {
                        this.onChange();
                        this.hide();
                    });
                    break;
            }
        });
        // обработчик на кнопку отмена
        this.view.btns.cancel.attachEvent('onItemClick', () => {
            this.hide();
        });

    }
    // валидация формы
    validate() {
        return this.view.form.validate();
    }
    // возврат конфига модального окна
    config() {
        return candidateWindowView();
    }
    // метод отображение окна
    show(type) {
        switch (type) { 
            case CANDIDATE_WINDOW_TYPE.create: // открытие как добавление
                this.clear();
                this.view.windowLabel.setHTML('Добавление кандидата')
                this.view.btns.confirm.setValue('Добавить')
                this.view.formfields.name.enable()
                this.view.formfields.lastname.enable()
                this.view.formfields.middlename.enable()
                this.view.formfields.mail.enable()
                this.view.formfields.phone.enable()
                break;
            case CANDIDATE_WINDOW_TYPE.update:// открытие как изменение
                this.view.windowLabel.setHTML('Изменение кандидата')
                this.view.btns.confirm.setValue('Изменить')
                this.view.formfields.name.enable()
                this.view.formfields.lastname.enable()
                this.view.formfields.middlename.enable()
                this.view.formfields.mail.enable()
                this.view.formfields.phone.enable()
                break;
            case CANDIDATE_WINDOW_TYPE.delete: // открытие как удаление
                this.view.windowLabel.setHTML('Удаление кандидата')
                this.view.btns.confirm.setValue('Удалить')
                this.view.formfields.name.disable()
                this.view.formfields.lastname.disable()
                this.view.formfields.middlename.disable()
                this.view.formfields.mail.disable()
                this.view.formfields.phone.disable()
                break;
            default:
                console.error('Неизвестный тип отображения окна для работы с сущностью кандидата');
                return;
        }

        this.type = type;
        this.view.window.show();
    }

    hide() {
        this.view.window.hide();
    }

    clear() {
       this.view.form.clear();
    }
    // заполнение формы данными с таблицы
    parse(values) {
        this.view.form.setValues(values);
    }

}

export const CANDIDATE_WINDOW_TYPE = {
    create: 'CREATE',
    update: 'UPDATE',
    delete: 'DELETe',
}