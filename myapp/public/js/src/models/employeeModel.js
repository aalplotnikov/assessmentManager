import Model from '../../helpers/model.js'
class EmployeeModel extends Model {
    constructor() {
        super();
    }

    getEmployees() {
        return this.get('employees/all')
    }

    getEmployeeByID(id) {
        return this.get(`employee/${id}`);
    }

    createEmployee(employee) {
        return this.post('employees/create', employee)
    }

    updateEmployee(employee) {
        return this.post('employees/update', employee)
    }

    deleteEmployee(id) {
        return this.post(`employees/delete/${id}`)
    }

}

const employeeModel  = new EmployeeModel();
export default employeeModel