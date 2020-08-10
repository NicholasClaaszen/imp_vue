import { authHeader } from '../_helpers';

function changePassword(password) {
  return authHeader().then(function(token){
    const requestOptions = {
      method: 'POST',
      headers: token,
      body: JSON.stringify({password})
    };

    return fetch(`${process.env.VUE_APP_API_URL}/user/password`, requestOptions).then(function(response){
      return response.text().then(text => {
        const data = text && JSON.parse(text);
        return data;
      });
    });
  })
}

export const accountService = {
  changePassword
};