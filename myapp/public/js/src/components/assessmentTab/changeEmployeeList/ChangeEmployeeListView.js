export default function changeEmployeeListView() {
    return {
        view: "window",
        id: "windowEmployeeInAssessment",
        position: 'center',
        width: 800,
        height: 700,
        move: true,
        modal: true,
        head: {
            view: 'template',
            height: 50,
            id: 'assesasmentEmployeeWindowLabel',
            template: "Выбор сотрудников",
        },
        body: {
            rows: [
                {
                    view: "datatable",
                    id: "assessmentEmployeeDatatable",
                    editable: true,
                    select: "row",
                    multiselect: true,
                    columns: [
                        { id: "firstNameEmployee", header: "Имя", fillspace: true, },
                        { id: "lastNameEmployee", header: "Фамилия", fillspace: true, },
                        { id: "middleNameEmployee", header: "Отчество", fillspace: true, },
                        { id: "mailEmployee", header: "Почта", fillspace: true, },
                        { id: "positionEmployee", header: "Должность", fillspace: true, },
                        {
                            id: "roleEmployee",
                            header: "Роль",
                            width: 150,
                            editor: "richselect",
                            options: [
                                {
                                    id: "Интервьюер",
                                    value: "Интервьюер"
                                },
                                {
                                    id: "Член комиссии",
                                    value: "Член комиссии"
                                }
                            ],
                        },
                    ],
                    data: []
                },
                {
                    cols: [
                        { view: 'button', id: 'cancelEmployeeChange', value: 'Отмена', height: 50, },
                        { view: 'button', id: 'confirmEmployeeChange', value: 'Применить', height: 50, },
                    ]
                },
            ]
            ,
        }
    }
}