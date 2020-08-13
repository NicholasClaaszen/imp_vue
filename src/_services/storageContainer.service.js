import { authHeader } from '../_helpers'

function get (id) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'GET',
      headers: token
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/storage/container/${id}`, requestOptions).then(function (response) {
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

    return window.fetch(`${process.env.VUE_APP_API_URL}/storage/container`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function post (name, description, locationId) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'POST',
      headers: token,
      body: JSON.stringify({ name, description, locationId })
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/storage/container`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function put (id, name, description, locationId) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'PUT',
      headers: token,
      body: JSON.stringify({ name, description, locationId })
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/storage/container/${id}`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function remove (id) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'DELETE',
      headers: token
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/storage/container/${id}`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

export const storageContainerService = {
  get,
  getAll,
  post,
  put,
  remove
}
