import { authService } from '@/_services'

export function authHeader () {
  // return authorization header with jwt token
  const user = JSON.parse(window.localStorage.getItem('user'))

  if (user && user.token) {
    return authService.refresh().then(function (data) {
      return { Authorization: 'Bearer ' + data.token, 'Content-Type': 'application/json' }
    })
  } else {
    return {}
  }
}
