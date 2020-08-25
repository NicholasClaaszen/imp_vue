import { authHeader, fileAuthHeader } from '../_helpers'

function postImage (file) {
  return fileAuthHeader().then(function (token) {
    const formData = new FormData()
    formData.append('item_image', file)
    const requestOptions = {
      method: 'POST',
      headers: token,
      body: formData
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/upload/image`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

export const uploadService = {
  postImage
}
