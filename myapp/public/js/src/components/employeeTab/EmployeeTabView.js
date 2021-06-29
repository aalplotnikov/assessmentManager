export default function employeeTabView() {
    return {
        id: "employeeTab",
        rows: [
        { 
            view:"toolbar",
            id:"top_toolbar_employee",
            elements:[
                { view:"label",  label: "Список сотрудников", align:"center"},
                { view:"button", id:"addEmployee", width:100, value:"Добавить"},
                { view:"button", id:"editEmployee", width:100, value:"Изменить"},
                { view:"button", id:"deleteEmployee", width:100, value:"Удалить"},
            ]
          },
    {    
        view:"datatable",
        id: "employeeTabDatatable",
        select:"row",
        columns:[
            { 
                id:"firstNameEmployee",
                header:["Имя", { content:"textFilter" }],
                fillspace: true,
                sort: 'int'
            },
            { 
                id:"lastNameEmployee",
                header:["Фамилия", { content:"textFilter" }],
                fillspace: true,
                sort: 'text'
            },
            { 
                id:"middleNameEmployee",
                header:["Отчество", { content:"textFilter" }],
                fillspace: true,
                sort: 'text'
            },
            { 
                id:"mailEmployee",       
                header:["Почта", { content:"textFilter" }],          
                fillspace: true,
                sort: 'text'
            },
            { 
                id:"phoneEmployee",      
                header:["Номер телефона", { content:"textFilter" }], 
                fillspace: true,
                sort: 'text'
            },
            { 
                id:"positionEmployee",   
                header:["Должность", { content:"selectFilter" }],      
                fillspace: true,
                sort: 'text'
            }
        ],
        data: []
    }
]
}}