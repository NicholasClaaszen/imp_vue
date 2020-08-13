import { authHeader } from '../_helpers'

function refresh () {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user && user.token) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + user.token }
    }
    return window.fetch(`${process.env.VUE_APP_API_URL}/jwt/refresh`, requestOptions)
      .then(handleResponse)
      .then(token => {
        return token
      })
  } else {
    return false
  }
}

function login (email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }

  return window.fetch(`${process.env.VUE_APP_API_URL}/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user.token && user.twofactor !== 1) {
        window.localStorage.setItem('user', JSON.stringify(user))
      }
      return user
    })
}

function loginToken (token) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  }

  return window.fetch(`${process.env.VUE_APP_API_URL}/logintoken`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        window.localStorage.setItem('user', JSON.stringify(user))
      }
      return user
    })
}

function logout () {
  return authHeader().then((token) => {
    const requestOptions = {
      method: 'GET',
      headers: token
    }
    return window.fetch(`${process.env.VUE_APP_API_URL}/jwt/logout/session`, requestOptions).then(function (response) {
      window.localStorage.removeItem('user')
    })
  })
}

function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)

    if (!response.ok) {
      if (response.status === 401) {
        window.localStorage.removeItem('user')
        window.location = '/login'
      }
      const error = (data && data.error) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}

export const authService = {
  login,
  loginToken,
  logout,
  refresh
}
