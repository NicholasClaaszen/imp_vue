import { authHeader } from '../_helpers'

function get (id) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'GET',
      headers: token
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/item/${id}`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function getForBox (box) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'GET',
      headers: token
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/item?box=${box}`, requestOptions).then(function (response) {
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

    return window.fetch(`${process.env.VUE_APP_API_URL}/item`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function post (name, categoryId, storageContainerId, dirty, broken, inUse, tag, imageUrl, options) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'POST',
      headers: token,
      body: JSON.stringify({ name, categoryId, storageContainerId, dirty, broken, inUse, tag, imageUrl, options })
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/item`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}
function put (id, name, categoryId, storageContainerId, dirty, broken, inUse, tag, imageUrl, options) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'PUT',
      headers: token,
      body: JSON.stringify({ name, categoryId, storageContainerId, dirty, broken, inUse, tag, imageUrl, options })
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/item/${id}`, requestOptions).then(function (response) {
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

    return window.fetch(`${process.env.VUE_APP_API_URL}/item/${id}`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

export const itemService = {
  get,
  getForBox,
  getAll,
  post,
  put,
  remove
}
