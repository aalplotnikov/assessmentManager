const form = [
    //{ view:"text",       id: "id",          name:"id",          labelWidth: 175, required: true, label:"ID Ассесмента"},
    { view:"text",       id: "nameAssessment",     name:"nameAssessment",     labelWidth: 175, required: true, label:"Название ассессмента"},
    // { view:"richselect", id: "Interviewer", name:"Interviewer", labelWidth: 175, required: true, label:"Интервьюер", value:1,
    //     options:[]
    // },
    { view: 'button', id: 'addСommissionInAss', value: 'Добавить сотрудников'},
    { view: 'button', id: 'addCandidateInAss',  value: 'Добавить кандидатов'},
    { 
        view:"datepicker",
        id: "dateAssessment",
        name:"dateAssessment",
        labelWidth: 175,
        required: true,
        label:"Дата ассессмента",
        timepicker: true,
    },
    {
        cols: [
            { view: 'button', id: 'assessmentWindowCancelBtn',  value: 'Отмена'},
            { view: 'button', id: 'assessmentWindowConfirmBtn', value: 'Применить'},
        ]
    },
];

export default function assessmentWindowView() {
    return {
        view:"window", 
        id: "windowAssessment",
        position: 'center',
        width: 550,
        move:true,
        modal: true,
        head: {
            view: 'template',
            id: 'assessmentWindowLabel',
            template: "headText",
            css: 'webix_template',
            align:"center",
        },
        body:{
            view:"form",
            id: "formAssessment",
            elements:form,
            rules:{
                //"id": webix.rules.isNumber,
                "nameAssessment": webix.rules.isNotEmpty,
                // "Interviewer": webix.rules.isNotEmpty,
                "dateAssessment": webix.rules.isNotEmpty,
            }
        }
    }
}