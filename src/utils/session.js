const tokeAdmin = "adminToken"

export function setToken(value) {
    sessionStorage.setItem(tokeAdmin, value)
}
export function getToken() {
    return sessionStorage.getItem(tokeAdmin)
}