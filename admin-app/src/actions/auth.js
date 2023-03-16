import { FETCH_USER } from './types';
import axios from '../utils/axios';
import catchAsync from '../utils/catchAsync';

export const signIn = (formProps, errorCallback) => (dispatch) => {
  catchAsync(async () => {
    const response = await axios.post('/users/login', formProps);
    const data = response.data.data;

    /*
     * Save token to local storage
     */
    localStorage.setItem('token', data.token);
    window.location.reload();
  }, errorCallback);
};

export const fetchUser = (callback, user) => (dispatch) => {
  catchAsync(
    async () => {
      let _user;

      if (user) _user = user;
      else {
        const response = await axios.get('/users/current-user');
        _user = response.data.data.user;
      }

      dispatch({
        type: FETCH_USER,
        payload: _user,
      });
      callback();
    },
    () => {
      callback();
      localStorage.removeItem('token');
    }
  );
};

export const signOut = () => {
  window.location.href = '/';
  localStorage.removeItem('token');
};
