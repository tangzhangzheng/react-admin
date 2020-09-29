import { setTokenKey, setUsernameKey } from '../action/types'
import { getUsername, getToken } from '../../utils/cookies'

const appData = {
    token: "" || getToken(),
    username: "" || getUsername(),
}


const appReducer = function (state = appData, action) {
    console.log(action)
    // if (action.type === configUploadStatus) {
    //     const stateData = JSON.parse(JSON.stringify(state))
    //     const data = stateData.status.filter(item => item.value === action.payload.value)
    //     data[0].label = action.payload.label
    //     return stateData
    // }

    switch (action.type) {
        case setTokenKey: {
            return {
                ...state,
                token: action.value
            }
        }
        case setUsernameKey: {
            return {
                ...state,
                username: action.value
            }
        }
        default:
            return state;
    }
}

export default appReducer