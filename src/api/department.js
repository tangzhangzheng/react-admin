import service from "../../src/utils/request";

/**
 * 登录接口
 */
export function DepartmentAddApi(data) {
    return service.request({
        url: "/department/add/",
        method: "post",
        data, // 请求类型为 post 时
        // params: data // 请求类型为 get 时
    })
}
/* 添加接口 */
export function GetList(data) {
    return service.request({
        url: "/department/list/",
        method: "post",
        data // 请求类型为 post 时
        // params: data // 请求类型为 get 时
    })
}


// TODO
export function Status(data) {
    return service.request({
        url: "/department/status/",
        method: "post",
        data // 请求类型为 post 时
        // params: data // 请求类型为 get 时
    })
}
// 详情接口
export function Detailed(data) {
    return service.request({
        url: "/department/detailed/",
        method: "POST",
        data
    })
}
/* 编辑 */
export function Edit(data) {
    return service.request({
        url: "/department/edit/",
        method: "POST",
        data
    })
}