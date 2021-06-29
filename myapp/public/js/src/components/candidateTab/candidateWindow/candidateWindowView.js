const form = [
    { view:"text", id: "firstNameCandidate",  name:"firstNameCandidate",  labelWidth: 150, required: true, label:"Имя"},
    { view:"text", id: "lastNameCandidate",   name:"lastNameCandidate",   labelWidth: 150, required: true, label:"Фамилия"},
    { view:"text", id: "middleNameCandidate", name:"middleNameCandidate", labelWidth: 150,                 label:"Отчество"},
    { view:"text", id: "mailCandidate",       name:"mailCandidate",       labelWidth: 150, required: true, label:"Почта"},
    { view:"text", id: "phoneCandidate",      name:"phoneCandidate",      labelWidth: 150, required: true, label:"Номер телефона"},
    {
        cols: [
            { view: 'button', id: 'candidateWindowCancelBtn',  value: 'Отмена'},
            { view: 'button', id: 'candidateWindowConfirmBtn', value: 'Применить'},
        ]
    },
];

export default function candidateWindowView() {
    return {
        view:"window", 
        id: "windowCandidate",
        position: 'center',
        width: 400,
        move:true,
        modal: true,
        head: {
            view: 'template',
            id: 'candidateWindowLabel',
            template: "headText",
            css: 'webix_template',
            align:"center",
        },
        body:{
            view:"form",
            id: "formCandidate",
            elements:form,
            rules:{
                "firstNameCandidate": webix.rules.isNotEmpty,
                "lastNameCandidate": webix.rules.isNotEmpty,
                "mailCandidate": webix.rules.isEmail,
                "phoneCandidate": webix.rules.isNumber,
            }
        }
    }
}