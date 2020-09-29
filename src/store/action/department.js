import { addDepartmentList, updateDepartmentList } from './types'

export function DepartmentList(params) {
    return {
        type: addDepartmentList,
        data: params.data,

    }
}


export function UpdateDepartmentList(params) {
    return {
        type: updateDepartmentList,
        data: params.data,

    }
}
