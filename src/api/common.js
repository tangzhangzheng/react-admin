import service from "../../src/utils/request";

export function TableList(params) {
    return service.request({
        url: params.url,
        method: params.method || "POST",
        data: params.data // 请求类型为 post 时
        // params: data // 请求类型为 get 时
    })
}
/* 删除列表 */
export function TableDelete(params) {
    return service.request({
        url: params.url,
        method: params.method || "POST",
        data: params.data  // 请求类型为 post 时
        // params: data // 请求类型为 get 时
    })
}
/* 公用API */
export function requestData(params) {
    return service.request({
        url: params.url,
        method: params.method || "POST",
        data: params.data // 请求类型为 post 时
        // params: data // 请求类型为 get 时
    })
}