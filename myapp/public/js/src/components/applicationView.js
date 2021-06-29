export default function WorkedPlaceView(assesmentTab, candidateTab, employeeTab) {
    return {  
            rows:[
              {
                cols: [{
                  view:"tabbar", id:'tabbar', value: 'assessmentTab', multiview:true, options: [
                  { value: 'Ассессмент',  id: 'assessmentTab'},
                  { value: 'Сотрудники',  id: 'employeeTab'},
                  { value: 'Кандидаты',   id: 'candidateTab'},
                  ]
                  },
                  //{ view:"label",  label: "Фамилия Имя Отчество", align:"center"},
                  //{ view:"button", id:"logout", width:100, value:"Выход"},
                ]
              },    
              { 
                id:"mymultiview",
                cells:[
                assesmentTab.config(),
                employeeTab.config(),
                candidateTab.config()
        ]
      }
    ]
  }
}