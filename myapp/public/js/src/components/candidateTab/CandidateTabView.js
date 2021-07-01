export default function candidateTabView() {
    return {
        id: "candidateTab",
        rows: [
        { 
            view:"toolbar",
            id:"top_toolbar_candidate",
            elements:[
                { view:"label",  label: "Список кандидатов", align:"center"},
                { view:"button", id:"addCandidate", width:100, value:"Добавить"},
                { view:"button", id:"editCandidate", width:100, value:"Изменить"},
                { view:"button", id:"deleteCandidate", width:100, value:"Удалить"},
            ]
          },
    {    
        view:"datatable",
        id: "candidateTabDatatable",
        select:"row",
        columns:[
            { 
                id:"firstNameCandidate",  
                header:["Имя", { content:"textFilter" }],            
                fillspace: true,
                sort: 'int',
            },
            { 
                id:"lastNameCandidate",   
                header:["Фамилия", { content:"textFilter" }],        
                fillspace: true,
                sort: 'text',
            },
            { 
                id:"middleNameCandidate", 
                header:["Отчество", { content:"textFilter" }],       
                fillspace: true,
                sort: 'text',
            },
            { 
                id:"mailCandidate",       
                header:["Почта", { content:"textFilter" }],          
                fillspace: true,
                sort: 'text',
            },
            { 
                id:"phoneCandidate",      
                header:["Номер телефона", { content:"textFilter" }], 
                fillspace: true,
                sort: 'text',
            },
        ],
        data: []
    }
]
}
}