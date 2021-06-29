export default function changeCandidateListView() {
    return {
        view:"window", 
        id: "windowCandidateInAssessment",
        position: 'center',
        width: 800,
        height: 700,
        move:true,
        modal: true,
        head: {
            view: 'template',
            height: 50,
            id: 'assesasmentWindowLabel',
            template: "headText",
            css: 'webix_template',
            align:"center",
        },
        body:{
            rows: [
                {    
                    view:"datatable",
                    id: "assessmentCandidateDatatable",
                    select:"row",
                    multiselect:true,
                    columns:[
                        { id:"firstNameCandidate",  header:"Имя",            fillspace: true,},
                        { id:"lastNameCandidate",   header:"Фамилия",        fillspace: true,},
                        { id:"middleNameCandidate", header:"Отчество",       fillspace: true,},
                        { id:"mailCandidate",       header:"Почта",          fillspace: true,},
                        { id:"phoneCandidate",      header:"Номер телефона", fillspace: true,},
                    ],
                    data: []
                },
                {
                    cols: [
                        { view: 'button', id: 'cancelChange',  value: 'Отмена',    height: 50,},
                        { view: 'button', id: 'confirmChange', value: 'Применить', height: 50,},
                    ]
                },    
            ]
            ,
        }
    }
}