import { uploadImageAPI } from '@src/modules/upload.api'
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { TypeUpload } from './upload.type'

function* uploadImageProductSaga({ payload }) {
  // show loading
  yield put({
    type: TypeUpload.showLoadingUpload,
  })
  // add uri to formData
  let formData = new FormData()
  let filename = payload.uri.split('/').pop()
  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename)
  let type = match ? `image/${match[1]}` : `image`
  // Assume "photo" is the name of the form field the server expects
  formData.append('file', { uri: payload.uri, name: filename, type })

  console.log('formData', formData)
  // call API upload
  const { message, data, errors } = yield call(uploadImageAPI, formData)

  console.log(`{message, data, errors}`, { message, data, errors })

  if (errors) {
    yield put({
      type: TypeUpload.uploadImageProductFail,
      payload: {
        error: errors
          .map((e) => {
            return e.error
          })
          .join(', '),
      },
    })
  } else {
    yield put({
      type: TypeUpload.uploadImageProductSuccess,
      payload: {
        url: data.url,
      },
    })
  }
  // if (uploaded) {
  //   yield put({
  //     type: typeUpload.uploadImageProductSuccess,
  //     payload: {
  //       data: url,
  //     },
  //   });
  // } else {
  //   showToast({ title: "Upload", type: "error", message: "can't not upload" });
  // }
}

export const uploadSagas = [
  takeEvery(TypeUpload.uploadImageProduct, uploadImageProductSaga),
]
