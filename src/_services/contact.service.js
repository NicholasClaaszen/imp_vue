import { authHeader } from '../_helpers';

function get(id) {
  return authHeader().then(function(token){
    const requestOptions = {
      method: 'GET',
      headers: token
    };

    return fetch(`${process.env.VUE_APP_API_URL}/contact/${id}`, requestOptions).then(function(response){
      return response.text().then(text => {
        const data = text && JSON.parse(text);
        return data;
      });
    });
  })
}

function getAll() {
  return authHeader().then(function(token){
    const requestOptions = {
      method: 'GET',
      headers: token
    };

    return fetch(`${process.env.VUE_APP_API_URL}/contact`, requestOptions).then(function(response){
      return response.text().then(text => {
        const data = text && JSON.parse(text);
        return data;
      });
    });
  })
}

function post(name, email, phone) {
  return authHeader().then(function(token){
    const requestOptions = {
      method: 'POST',
      headers: token,
      body: JSON.stringify({name, email, phone})
    };

    return fetch(`${process.env.VUE_APP_API_URL}/contact`, requestOptions).then(function(response){
      return response.text().then(text => {
        const data = text && JSON.parse(text);
        return data;
      });
    });
  })
}

function put(id, name, email, phone) {
  return authHeader().then(function(token){
    const requestOptions = {
      method: 'PUT',
      headers: token,
      body: JSON.stringify({name, email, phone})
    };

    return fetch(`${process.env.VUE_APP_API_URL}/contact/${id}`, requestOptions).then(function(response){
      return response.text().then(text => {
        const data = text && JSON.parse(text);
        return data;
      });
    });
  })
}

function remove(id) {
  return authHeader().then(function(token){
    const requestOptions = {
      method: 'DELETE',
      headers: token
    };

    return fetch(`${process.env.VUE_APP_API_URL}/contact/${id}`, requestOptions).then(function(response){
      return response.text().then(text => {
        const data = text && JSON.parse(text);
        return data;
      });
    });
  })
}

export const contactService = {
  get,
  getAll,
  post,
  put,
  remove
};