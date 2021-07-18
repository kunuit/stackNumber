import { initialState } from './upload.initial'
import { TypeUpload } from './upload.type'

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //? loading
    case TypeUpload.showLoadingUpload:
      return { ...state, uploading: true }

    //? handle
    case TypeUpload.uploadImageProductFail:
      return { ...state, uploadError: payload.error, uploading: false }
    case TypeUpload.uploadImageProductSuccess:
      return {
        ...state,
        tmpImages: [...state.tmpImages, payload.url],
        uploadError: null,
        uploading: false,
      }

    //? reset
    case TypeUpload.resetUrlProducts:
      return { ...state, tmpImages: [], uploadError: null, uploading: false }

    default:
      return state
  }
}

export default reducer
