import { authHeader } from '../_helpers'

function get (id) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'GET',
      headers: token
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/property/${id}`, requestOptions).then(function (response) {
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

    return window.fetch(`${process.env.VUE_APP_API_URL}/property`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function post (name, categoryId, propertyType, drift) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'POST',
      headers: token,
      body: JSON.stringify({ name, categoryId, propertyType, drift })
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/property`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function postOption (id, name, position) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'POST',
      headers: token,
      body: JSON.stringify({ name, position })
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/property/${id}`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function put (id, name, drift) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'PUT',
      headers: token,
      body: JSON.stringify({ name, drift })
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/property/${id}`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function activate (id) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'PATCH',
      headers: token,
      body: JSON.stringify({id})
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/property/${id}`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function putOption (id, subid, name, position) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'PUT',
      headers: token,
      body: JSON.stringify({ name, position })
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/property/${id}/${subid}`, requestOptions).then(function (response) {
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

    return window.fetch(`${process.env.VUE_APP_API_URL}/property/${id}`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

function removeOption (id, subid) {
  return authHeader().then(function (token) {
    const requestOptions = {
      method: 'DELETE',
      headers: token
    }

    return window.fetch(`${process.env.VUE_APP_API_URL}/property/${id}/${subid}`, requestOptions).then(function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        return data
      })
    })
  })
}

export const propertyService = {
  get,
  getAll,
  post,
  postOption,
  activate,
  put,
  putOption,
  remove,
  removeOption
}
