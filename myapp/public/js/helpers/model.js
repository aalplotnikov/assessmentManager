// const dataEmployee = [
//     { firstNameEmployee:"Иван1", lastNameEmployee:"Иванорв",
//     middleNameEmployee:"Иваныч", mailEmployee:"III@gmail.com",
//     phoneEmployee:"88888", positionEmployee:"Программист"},
//     { firstNameEmployee:"Иван2", lastNameEmployee:"Иванорв",
//     middleNameEmployee:"Иваныч", mailEmployee:"III@gmail.com",
//     phoneEmployee:"89999999999", positionEmployee:"Программист"},
//     { firstNameEmployee:"Иван3", lastNameEmployee:"Иванорв",
//     middleNameEmployee:"Иваныч", mailEmployee:"III@gmail.com",
//     phoneEmployee:"3333333", positionEmployee:"Программист"},
// ];

// const dataCandidate = [
//     { firstNameCandidate:"Андрей", lastNameCandidate:"Плотников",
//     middleNameCandidate:"Александрович", mailCandidate:"aalplotnikov@gmail.com",
//     phoneCandidate:"89999999999", statusCandidate:"Приглашен"},
//     { firstNameCandidate:"Андрей", lastNameCandidate:"Плотников",
//     middleNameCandidate:"Александрович", mailCandidate:"aalplotnikov@gmail.com",
//     phoneCandidate:"89999999999", statusCandidate:"Приглашен"},
//     { firstNameCandidate:"Андрей", lastNameCandidate:"Плотников",
//     middleNameCandidate:"Александрович", mailCandidate:"aalplotnikov@gmail.com",
//     phoneCandidate:"89999999999", statusCandidate:"Приглашен"},
// ]

// const dataAssessment = [
//     { id:1, nameAss:"Самый первый ассессмент",
//     Interviewer:"Интервьюер", candidateList: [dataCandidate[0], dataCandidate[1]], 
//     employeeList: [dataEmployee[0], dataEmployee[1]], dateAss: '', statusAss: "заполнен" },
//     { id:2, nameAss:"Самый первый ассессмент",
//     Interviewer:"Интервьюер", candidateList: [dataCandidate[0], dataCandidate[1]], 
//     employeeList: [dataEmployee[0], dataEmployee[1]], dateAss:"12.12.13", statusAss: "заполнен" },
//     { id:3, nameAss:"Самый первый ассессмент",
//     Interviewer:"Интервьюер", candidateList: [dataCandidate[0], dataCandidate[1]], 
//     employeeList: [dataEmployee[0], dataEmployee[1]], dateAss:"12.12.12", statusAss: "заполнен" },
// ]


export default class Model {
    get(url) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'json'
            xhr.onload = () => {
                // проверка статуса HTTP запроса
                if (xhr.status != 200) {
                    webix.message(xhr.status + ': ' + xhr.statusText, 'error');
                    reject()
                } else {
                    if (!xhr.response) {
                        return
                    }
                    // валидация статуса ответа сервера
                    if (!xhr.response.status) {
                        webix.message('Не удалось совершить запрос', 'error');
                        console.error(`GET xhr.response.status is ${xhr.response.status}`);
                        reject()
                    }

                    // проверка статуса ответа сервера
                    switch (xhr.response.status) {
                        case RESULT_STATE.SUCCESS: // положительный результат запроса
                            resolve(xhr.response.data);
                            return;
                        case RESULT_STATE.FAILED: // отрицательный результат запроса
                            webix.message('Не удалось совершить запрос', 'error');
                            console.error(`GET ${xhr.response.error}`);
                            reject();
                            return;
                        default: // ошибка при получении результата запроса
                            webix.message('Не удалось совершить запрос', 'error');
                            console.error(`GET Статус ответа сервера не соответствует ожидаемым значениям, xhr.response.status is ${xhr.response.status}`);
                            reject();
                            return;
                    }
                }
            }
            xhr.send()
        })
    }

    post(url, params) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.responseType = 'json'
            xhr.onload = () => {
                // проверка статуса HTTP запроса
                if (xhr.status !== 200) {
                    webix.message(xhr.status + ': ' + xhr.statusText, 'error');
                    reject()
                } else {
                    if (!xhr.response) {
                        return
                    }
                    // валидация статуса ответа сервера
                    if (!xhr.response.status) {
                        webix.message('Не удалось совершить запрос', 'error');
                        console.error(`GET xhr.response.status is ${xhr.response.status}`);
                        reject()
                    }

                    // проверка статуса ответа сервера
                    switch (xhr.response.status) {
                        case RESULT_STATE.SUCCESS: // положительный результат запроса
                            resolve(xhr.response.data);
                            return;
                        case RESULT_STATE.FAILED: // отрицательный результат запроса
                            webix.message('Не удалось совершить запрос', 'error');
                            console.error(`GET ${xhr.response.error}`);
                            reject();
                            return;
                        default: // ошибка при получении результата запроса
                            webix.message('Не удалось совершить запрос', 'error');
                            console.error(`GET Статус ответа сервера не соответствует ожидаемым значениям, xhr.response.status is ${xhr.response.status}`);
                            reject();
                            return;
                    }
                }
            }
            xhr.send(JSON.stringify(params))
        })
    }
    
    // get(url) {
    //     return new Promise(function (resolve, reject) {
    //         if (url === 'all') {
    //             setTimeout(() => resolve(dataEmployee), 0);
    //         }
    //         if (url === 'id') {
    //             setTimeout(() => resolve(dataEmployee[1]), 0);
    //         }
    //         if (url === 'candidate/all') {
    //             setTimeout(() => resolve(dataCandidate), 0);
    //         }
    //         if (url === 'assessment/all') {
    //             setTimeout(() => resolve(dataAssessment), 0);
    //         }
    //         for (const iterator of dataAssessment) {
    //             if (url === `assessment/${iterator.id}`) {
    //                 setTimeout(() => resolve(iterator), 0)
    //             }
    //             if (url === `candidate/${iterator.id}`) {
    //                 setTimeout(() => resolve(iterator.candidateList), 0)
    //             }
    //             if(url === `employee/${iterator.id}`) {
    //                 setTimeout(() => resolve(iterator.employeeList), 0)
    //             }
    //         }
    //         for (const iterator of dataCandidate) {
    //             if(url === `candidate/${iterator.id}`) {
    //                 setTimeout(() => resolve(iterator), 0)
    //             }
    //         }
            
    //         for(const iterator of dataEmployee) {
    //             // console.log(iterator);
               
    //         }
    //     });
    // }

    // post(str, params) {
    //     return new Promise(function (resolve, reject) {
    //         if(str === 'create') {
    //             dataEmployee.push(params);
    //             console.log(dataEmployee);
    //             setTimeout(() => resolve(), 0);
    //         }
    //         if(str === 'update') {
    //             for (const iterator of dataEmployee) {
    //                 if ( iterator.id === params.id ){
    //                     for (const key in iterator) {
    //                         iterator[key] = params[key];
    //                     }
    //                 }
    //             }
    //             console.log(dataEmployee);
    //             setTimeout(() => resolve(), 0);
    //         }
    //         if(str === 'delete') {
    //             for (let i = 0; i < dataEmployee.length; i++) {
    //                 if ( dataEmployee[i].id === params.id ){
    //                     dataEmployee.splice(i, 1);
    //                 }
    //             }
    //             console.log(dataEmployee);
    //             setTimeout(() => resolve(), 0);
    //         }

    //         if(str === 'candidate/create') {
    //             dataCandidate.push(params);
    //             setTimeout(() => resolve(), 0);
    //         }
    //         if(str === 'candidate/update') {
    //             for (const iterator of dataCandidate) {
    //                 if ( iterator.id === params.id ){
    //                     for (const key in iterator) {
    //                         iterator[key] = params[key];
    //                     }
                        
    //                 }
                    
    //             }
                
    //             setTimeout(() => resolve(), 0);

    //         }
    //         if(str === 'candidate/delete') {
    //             for (let i = 0; i < dataCandidate.length; i++) {
    //                 if ( dataCandidate[i].id === params.id ){
    //                     dataCandidate.splice(i, 1);
    //                 }
    //             }
    //             console.log(dataCandidate);
    //             setTimeout(() => resolve(), 0);
    //         }

    //         if(str === 'candidate/note') {
    //             for (let i = 0; i < dataCandidate.length; i++) {
    //                 if ( dataCandidate[i].id === params.id ){
    //                     dataCandidate[i].note = params.note;
    //                     console.log(dataCandidate[i])
    //                 }
    //             }
    //             console.log(dataCandidate);
    //             setTimeout(() => resolve(), 0);
    //         }

    //         if(str === 'assessment/create') {
    //             params.id = +params.id; 
    //             dataAssessment.push(params);
    //             console.log(dataAssessment);
    //             setTimeout(() => resolve(), 0);
    //         }
    //         if(str === 'assessment/update') {
    //             for (const iterator of dataAssessment) {
    //                 if ( +iterator.id === +params.id ){
    //                     for (const key in iterator) {
    //                         iterator[key] = params[key];
    //                     }
    //                 }
    //             }
    //             console.log(dataAssessment, 'и');
    //             setTimeout(() => resolve(), 0);
    //         }
    //         if(str === 'assessment/delete') {
    //             for (let i = 0; i < dataAssessment.length; i++) {
    //                 if ( +dataAssessment[i].id === +params.id ){
    //                     dataAssessment.splice(i, 1);
    //                 }
    //             }
    //             console.log(dataAssessment, 'у');
    //             setTimeout(() => resolve(), 0);
    //         }
    //     });
    // }
}

const RESULT_STATE = {
    SUCCESS: 'succes',
    FAILED: 'failed',
}