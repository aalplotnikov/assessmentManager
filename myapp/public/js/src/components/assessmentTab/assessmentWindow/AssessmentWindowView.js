const form = [
    { view:"text",       id: "nameAssessment",     name:"nameAssessment",     labelWidth: 175, required: true, label:"Название ассессмента"},
    { view: 'button', id: 'addСommissionInAss', value: 'Добавить сотрудников'},
    { view: 'button', id: 'addCandidateInAss',  value: 'Добавить кандидатов'},
    { 
        view:"datepicker",
        id: "dateAssessment",
        name:"dateAssessment",
        labelWidth: 175,
        required: true,
        label:"Дата ассессмента",
        suggest:{
            type:"calendar", 
            body:{
                minDate:new Date(Date.now()-86400000),
                timepicker:true,
            },
        },
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
                "nameAssessment": webix.rules.isNotEmpty,
                "dateAssessment": webix.rules.isNotEmpty,
            }
        }
    }
}