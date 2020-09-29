import { configUploadStatus, configAddStatus } from './types'

export function addStatus(params) {
    return {
        type: configAddStatus,
        payload: { label: params.label, value: params.value }
    }
}

export function UploadStatus(params) {
    return {
        type: configUploadStatus,
        payload: { label: params.label, value: params.value }
    }
}