/* eslint-disable prettier/prettier */
import axios from 'axios';

const baseUrl = `${process.env.REACT_NATIVE_SERVER_HOST}`;

const getProduct = ({categories, favorite, limit, page, name, order}) => {
  const url = `${baseUrl}/products?limit=${limit}&page=${page}&name=${name}&order=${order}&categories=${categories}&favorite=${favorite}`;
  return axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const getProducts = (params, controller) => {
  const url = `${baseUrl}/products?limit=${params.limit}&page=${params.page}&categories=${params.categories}&name=${params.name}&order=${params.order}`;
  // console.log(url);
  return axios.get(url, {signal: controller.signal});
};

export const getAllProducts = (controller, querys) => {
  console.log(querys);
  // const url = process.env.REACT_APP_SERVER_HOST;
  return axios.get(`${baseUrl}/products?${querys}`, {
    signal: controller.signal,
  });
};

const getProductsDetails = (params, controller) => {
  const url = `${baseUrl}/products/${params}`;
  return axios.get(url, params, {signal: controller.signal});
};

const getMeta = params => {
  const url = `${process.env.REACT_APP_SERVER_HOST}${params}`;
  return axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const createProduct = (token, fileImage, body, controller) => {
  const url = baseUrl + '/products';
  const formData = new FormData();
  if (fileImage !== '') {
    formData.append('image', {
      uri: fileImage.uri,
      name: fileImage.fileName,
      type: fileImage.type,
    });
  }
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value);
  });
  console.log('formm', formData);
  return axios.post(url, formData, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

const updateProduct = (token, id, fileImage, body, controller) => {
  const url = `${baseUrl}/products/${id}`;
  const formData = new FormData();
  if (fileImage !== '') {
    formData.append('image', {
      uri: fileImage.uri,
      name: fileImage.fileName,
      type: fileImage.type,
    });
  }
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return axios.patch(url, formData, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deletingProduct = (token, id, controller) => {
  const url = `${baseUrl}/products/${id}`;
  return axios.delete(url, {
    signal: controller.signal,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const addPromos = (token, body, controller) => {
  const url = baseUrl + '/promos';
  return axios.post(url, body, {
    signal: controller.signal,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export {getProduct, getProductsDetails, getMeta, updateProduct};
