import { authHeader } from '../_helpers'

function get (id) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'GET',
      headers: token
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/storage/location/${id}`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function getContainers (id) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'GET',
      headers: token
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/storage/location/${id}/containers`, requestOptions).then(function (response) {
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

    return window.fetch(`${process.env.VUE_APP_API_URL}/storage/location`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function post (name, address, contactId) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'POST',
      headers: token,
      body: JSON.stringify({ name, address, contactId })
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/storage/location`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function put (id, name, address, contactId) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'PUT',
      headers: token,
      body: JSON.stringify({ name, address, contactId })
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/storage/location/${id}`, requestOptions).then(function (response) {
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

    return window.fetch(`${process.env.VUE_APP_API_URL}/storage/location/${id}`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

export const storageLocationService = {
  get,
  getContainers,
  getAll,
  post,
  put,
  remove
}
