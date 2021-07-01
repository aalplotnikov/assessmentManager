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