import { configUploadStatus, configAddStatus } from '../action/types'

//参数
const config = {
    status: [
        { label: "启用", value: true },
        { label: "禁用", value: false }
    ]
}


const configReducer = function (state = config, action) {

    // if (action.type === configUploadStatus) {
    //     const stateData = JSON.parse(JSON.stringify(state))
    //     const data = stateData.status.filter(item => item.value === action.payload.value)
    //     data[0].label = action.payload.label
    //     return stateData
    // }

    switch (action.type) {
        case configAddStatus: {
            return {
                ...state,
                status: [...state.status, action.payload]
            }
        }

        default:
            return state;
    }
}

export default configReducer