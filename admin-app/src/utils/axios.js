import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_ADMIN_SERVER}/api/admin`,
});

export function get(url, params = {}) {
  return instance.get(url, {
    params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export function post(url, body) {
  return instance.post(url, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export function patch(url, body) {
  return instance.patch(url, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export function put(url, body) {
  return instance.put(url, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export function del(url) {
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { get, post, patch, del };
