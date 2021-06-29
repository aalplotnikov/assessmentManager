export default function startAssessmentView() {
    return {
        view:"window", 
        id: "windowStartAssessment",
        position: 'center',
        fullscreen:true,
        head: "Проведение ассессмента",
        body:{
            cols: [
                {
                    rows: [
                        {
                            cols: [
                                {
                                view: 'template',
                                id: 'nameStartAssessment',
                                template: 'Название ассессмента',
                                css: { 
                                    'text-align': 'center',
                                    'line-height': '35px'
                                },
                                width: 1100,
                                height: 40,
                            },
                            {
                                view: 'template',
                                id: 'statusStartAssessment',
                                template: 'Статус ассессмента',
                                css: { 
                                    'text-align': 'center',
                                    'line-height': '35px'
                                },
                                width: 200,
                                height: 40,
                            },
                            ]
                        },
                        {
                            view: 'datatable',
                            id: "assessmentStartDatatable",
                            editable:true,
                            select:"row",
                            columns:[
                                { id:"firstNameCandidate",  header:"Имя",                fillspace: true,},
                                { id:"lastNameCandidate",   header:"Фамилия",            fillspace: true,},
                                { id:"middleNameCandidate", header:"Отчество",           fillspace: true,},
                                { id:"mailCandidate",       header:"Почта",              fillspace: true,},
                                { id:"phoneCandidate",      header:"Номер телефона",     fillspace: true,},
                                { 
                                    id:"statusCandidate",
                                    header:"Статус кандидата",
                                    fillspace: true,
                                    editor:"richselect",
                                    options:["Явился", "Не явился"],
                                },
                                { 
                                    id:"ofsetCandidate",
                                    header:"Успешен/Не успешен",
                                    fillspace: true,
                                    editor:"richselect",
                                    options:["Успешен", "Не успешен"],
                                },
                            ],
                            data: []
                        },
                    ]
                },
                {
                    rows: [
                        {
                            view: 'template',
                            id: 'StartNoteAssessment',
                            template: 'Заметки',
                            css: { 
                                'text-align': 'center',
                                'line-height': '35px'
                            },
                            height: 40,
                        },
                        {
                            view: 'template',
                            id: 'textTemplate',
                            template: 'Выберите сотрудника чтобы оставить заметку',
                            css: { 
                                'text-align': 'center',
                                'line-height': '500px'
                            },
                            height: 500,
                        },
                        {
                            view:"textarea",
                            id:"StartNoteTextAssessment",
                            height: 500,
                            placeholder: 'Текстовое поле для заметок по кандидатам',
                            borderless:false
                        },
                        {
                            cols: [
                                {},
                                {
                                    rows: [
                                        {},
                                        {
                                            view: 'button',
                                            id: 'endAssessment',
                                            height: 70,
                                            width: 250,
                                            value:'Завершить ассессмент',
                                            css: {'border-radius': '25px'}
                                        },
                                        {},
                                        {
                                            view: 'button',
                                            id: 'closeAssessment',
                                            height: 70,
                                            width: 250,
                                            value:'Закрыть ассессмент',
                                            css: {'border-radius': '25px'}
                                        },
                                        {},
                                    ]
                                },
                                {},
                            ]
                        },
                    ]
                },
            ]
        }
    };
}