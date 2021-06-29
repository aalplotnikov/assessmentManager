export default function viewAssessmentView() {
    return {
        view: 'window',
        id: 'windowViewAssessment',
        position: 'center',
        fullscreen:true,
        head: {
            view: 'template',
            id: 'windowLabelViewAssessment',
            template: 'Название и дата ассессмента',
            height: 40,
            css: { 
                'text-align': 'center',
                'line-height': '25px'
            },
        },
        body: {
            rows: [
                {
                    rows: [
                        {
                            view: 'template',
                            id: 'labelEmployeeTable',
                            template: 'Список сотрудников',
                            height: 30,
                            css: { 
                                'text-align': 'center',
                                'line-height': '25px'
                            },
                        },
                        {
                            view: 'datatable',
                            id: 'viewDatatableEmployee',
                            select:"row",
                            columns:[
                                { id:"firstNameEmployee",  header:"Имя",            fillspace: true,},
                                { id:"lastNameEmployee",   header:"Фамилия",        fillspace: true,},
                                { id:"middleNameEmployee", header:"Отчество",       fillspace: true,},
                                { id:"mailEmployee",       header:"Почта",          fillspace: true,},
                                { id:"phoneEmployee",      header:"Номер телефона", fillspace: true,},
                                { id:"positionEmployee",   header:"Должность",      fillspace: true,}
                            ],
                            data: []
                        },
                        
                    ]
                },
                {
                    cols: [
                        {
                            gravity: 5,
                            rows: [
                                {
                                    view: 'template',
                                    id: 'labelCandidateTable',
                                    template: 'Список кандидатов',
                                    height: 30,
                                    css: { 
                                        'text-align': 'center',
                                        'line-height': '25px'
                                    },
                                },
                                {
                                    view: 'datatable',
                                    id: 'viewDatatableCandidate',
                                    select:"row",
                                    columns:[
                                        { id:"firstNameCandidate",  header:"Имя",            fillspace: true,},
                                        { id:"lastNameCandidate",   header:"Фамилия",        fillspace: true,},
                                        { id:"middleNameCandidate", header:"Отчество",       fillspace: true,},
                                        { id:"mailCandidate",       header:"Почта",          fillspace: true,},
                                        { id:"phoneCandidate",      header:"Номер телефона", fillspace: true,},
                                        { id:"StatusCandidate",     header:"Статус",         fillspace: true,}
                                    ],
                                    data: []                    
                                },
                            ]
                        },
                        {
                            gravity: 1,
                            rows: [
                                {
                                    view: 'template',
                                    id: 'labelNoteView',
                                    template: 'Заметки',
                                    height: 50,
                                    css: { 
                                        'text-align': 'center',
                                        'line-height': '45px'
                                    },
                                },
                                {
                                    view: 'template',
                                    id: 'spacerview',
                                    template: 'Выберите сотрудника чтобы оставить заметку',
                                    css: { 
                                        'text-align': 'center',
                                    },
                                },
                                {
                                    view: 'textarea',
                                    id: 'viewTextareaAssessment',
                                    placeholder: 'Текстовое поле для заметок по кандидатам',
                                },
                                {
                                    view: 'button',
                                    value: 'Закрыть просмотр',
                                    id: 'closeViewAssessment',
                                    height: 50,
                                }
                            ]
                        },
                    ]
                },
            ]
        }
    }
}