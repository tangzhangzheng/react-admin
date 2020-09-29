//部门reducer
import { addDepartmentList } from '../action/types'
const stateData = {
    departmentList: []
}

const departmentReducer = function (state = stateData, action) {
    console.log('接下来将要打印action')
    console.log(action)
    switch (action.type) {
        case addDepartmentList: {
            return {
                ...stateData,
                departmentList: action.data
            }
        }
        default: return state
    }



}
export default departmentReducer