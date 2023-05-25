/* eslint-disable prettier/prettier */
import axios from 'axios';

const API_URL = `${process.env.REACT_NATIVE_SERVER_HOST}`;

export const login = body => {
  const url = `${API_URL}/auth`;
  //   const body = {email: email, password: password};
  console.log(body);
  return axios({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    method: 'post',
    url,
    data: body,
    // data: JSON.stringify(body),
  });
};

export const register = (form, controller) => {
  const url = `${API_URL}/users`;
  return axios.post(url, form, {
    signal: controller.signal,
  });
};

export const forgot = (email, otp, password, controller) => {
  const url = `${API_URL}/auth/forgot`;
  const body = {email, otp: otp, password};
  return axios.patch(url, body, {signal: controller.signal});
};

export const getOtp = (email, controller) => {
  const url = `${API_URL}/auth/otp`;
  return axios.patch(url, {email}, {signal: controller.signal});
};

export const authLogout = (controller, token) => {
  const url = `${API_URL}/auth/logout`;
  return axios.delete(url, {
    signal: controller.signal,
    headers: {Authorization: `Bearer ${token}`},
  });
};
