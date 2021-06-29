export default function assessmentTabView() {
    return {
        id: "assessmentTab",
        rows: [
        { 
            view:"toolbar",
            id:"top_toolbar",
            elements:[
              { view:"label",  label: "Список ассессментов", align:"center"},
              { view:"button", id:"startAssessment", width:170, value:"Начать ассессмент"},
              { view:"button", id:"viewAssessment", width:205, value:"Посмотреть ассессмент"},
              { view:"button", id:"addAssessment", width:100, value:"Добавить"},
              { view:"button", id:"editAssessment", width:100, value:"Изменить"},
              { view:"button", id:"deleteAssessment", width:100, value:"Удалить"},
            ]
          },
    {    
        view:"datatable",
        id: "assessmentTabDatatable",
        select:"row",
        columns:[
            { 
                id:"id",
                header:["Номер Ассессмента", { content:"textFilter" }],
                fillspace: true,
                sort:'int'
            },
            { 
                id:"nameAssessment",
                header:[ "Название Ассессмента", { content:"textFilter" }],
                fillspace: true,
                sort:'text'
            },
            // { 
            //     id:"Interviewer",
            //     header: [ "Интервьюер", { content:"selectFilter" }],
            //     fillspace: true,
            //     sort:'text'
            // },
            { 
                id:"dateAssessment",
                header: [ "Дата проведения ассесмента", { content:"dateFilter" }],
                fillspace: true,
                format: webix.i18n.fullDateFormatStr,
                sort:'date',
            },
            { 
                id:"statusAssessment",
                header:[ "Статус ассесмента", { content:"selectFilter" } ],
                fillspace: true,
                sort:'text'
            },
        ],
        data: []
    }
]
}}