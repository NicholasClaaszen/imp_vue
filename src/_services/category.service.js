import { authHeader } from '../_helpers'

function get (id) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'GET',
      headers: token
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/category/${id}`, requestOptions).then(function (response) {
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

    return window.fetch(`${process.env.VUE_APP_API_URL}/category`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function post (name, icon) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'POST',
      headers: token,
      body: JSON.stringify({ name, icon })
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/category`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function put (id, name, icon) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'PUT',
      headers: token,
      body: JSON.stringify({ name, icon })
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/category/${id}`, requestOptions).then(function (response) {
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

    return window.fetch(`${process.env.VUE_APP_API_URL}/category/${id}`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

export const categoryService = {
  get,
  getAll,
  post,
  put,
  remove
}
