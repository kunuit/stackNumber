import { initialState } from './location.initial'
import { TypeLocation } from './location.type'

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //? loading
    case TypeLocation.showLoadingLocation:
      return { ...state, showLoading: true }

    //? handle
    case TypeLocation.changeFields:
      return {
        ...state,
        ...payload.changeFields,
      }

    //? reset

    default:
      return state
  }
}

export default reducer
