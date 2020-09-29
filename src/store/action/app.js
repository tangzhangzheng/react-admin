import { setTokenKey, setUsernameKey } from '../action/types'
import { setUsername, setToken } from '../../utils/cookies'


export function setTokenAction(data) {
    console.log('setToken')
    console.log(data)
    setToken(data)
    return {
        type: setTokenKey,
        value: data

    }
}


export function setUsernameAction(data) {
    setUsername(data)
    console.log('setUsername')
    console.log(data)
    return {
        type: setUsernameKey,
        value: data

    }
}
