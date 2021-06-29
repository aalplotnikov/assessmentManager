const form = [
    { view:"text",       id: "firstNameEmployee",  name:"firstNameEmployee",  labelWidth: 150, required: true, label:"Имя"},
    { view:"text",       id: "lastNameEmployee",   name:"lastNameEmployee",   labelWidth: 150, required: true, label:"Фамилия"},
    { view:"text",       id: "middleNameEmployee", name:"middleNameEmployee", labelWidth: 150,                 label:"Отчество"},
    { view:"text",       id: "mailEmployee",       name:"mailEmployee",       labelWidth: 150, required: true, label:"Почта"},
    { view:"text",       id: "phoneEmployee",      name:"phoneEmployee",      labelWidth: 150, required: true, label:"Номер телефона"},
    { view:"richselect", id: "positionEmployee",   name:"positionEmployee",   labelWidth: 150, required: true, label:"Должность", value:1,
        options:[ 
            { id: "Программист",  name: "Программист",  value: "Программист"}, 
            { id: "Программист1", name: "Программист1", value: "Программист1"}, 
            { id: "Программист2", name: "Программист2", value: "Программист2"},
        ]
    },
    {
        cols: [
            { view: 'button', id: 'employeeWindowCancelBtn',  value: 'Отмена'},
            { view: 'button', id: 'employeeWindowConfirmBtn', value: 'Применить'},
        ]
    },
];

export default function employeeWindowView() {
    return {
        view:"window", 
        id: "windowEmployee",
        position: 'center',
        width: 400,
        move:true,
        modal: true,
        head: {
            view: 'template',
            id: 'employeeWindowLabel',
            template: "headText",
            css: 'webix_template',
            align:"center",
        },
        body:{
            view:"form",
            id: "formEmployee",
            elements:form,
            rules:{
                "firstNameEmployee": webix.rules.isNotEmpty,
                "lastNameEmployee": webix.rules.isNotEmpty,
                "mailEmployee": webix.rules.isEmail,
                "phoneEmployee": webix.rules.isNumber,
                "positionEmployee": webix.rules.isNotEmpty,
            }
        }
    }
}