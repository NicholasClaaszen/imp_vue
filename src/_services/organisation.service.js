import { authHeader } from '../_helpers'

function get (id) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'GET',
      headers: token
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/organisation/${id}`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function getAll () {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'GET',
      headers: token
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/organisation`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function put (id, name, baseURL, contactId) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'PUT',
      headers: token,
      body: JSON.stringify({ name, baseURL, contactId })
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/organisation/${id}`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

export const organisationService = {
  get,
  getAll,
  put
}
