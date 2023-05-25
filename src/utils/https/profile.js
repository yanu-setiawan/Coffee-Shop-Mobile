/* eslint-disable prettier/prettier */
import axios from 'axios';

const API_URL = `${process.env.REACT_NATIVE_SERVER_HOST}`;

export const getProfile = (id, controller, token) => {
  const url = `${API_URL}/users/profile/${id}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {Authorization: `bearer ${token}`},
  });
};

export const updateProfile = (id, payload, fileImage, controller, token) => {
  const url = `${API_URL}/users/profile/${id}`;
  console.log(fileImage);
  const formData = new FormData();
  if (fileImage !== '') {
    formData.append('image', {
      uri: fileImage.uri,
      name: fileImage.fileName,
      type: fileImage.type,
    });
  }
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return axios.patch(url, formData, {
    signal: controller.signal,
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const changePassword = (id, payload, controller, token) => {
  const url = `${API_URL}/users/editPWD/${id}`;
  return axios.patch(url, payload, {
    signal: controller.signal,
    headers: {Authorization: `bearer ${token}`},
  });
};
