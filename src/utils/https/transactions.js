/* eslint-disable prettier/prettier */
import axios from 'axios';
// import store from "../../Redux/store";

// eslint-disable-next-line no-undef
const baseUrl = `${process.env.REACT_NATIVE_SERVER_HOST}`;

export const addTransactions = (data, controller, token) => {
  const url = `${baseUrl}/transactions`;
  return axios.post(url, data, {
    signal: controller.signal,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getHistory = (token, controller) => {
  const url = `${baseUrl}/transactions`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const deleteTransaction = (id, controller, token) => {
  const url = `${baseUrl}/transactions/${id}`;
  return axios.delete(url, {
    signal: controller.signal,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getAllOrder = (token, controller) => {
  const url = `${baseUrl}/transactions/get-all-order`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getDoneOrder = (token, controller) => {
  const url = `${baseUrl}/transactions/get-done-order`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const changeOrderDone = (token, id, controller) => {
  const url = `${baseUrl}/transactions/change-status-order/${id}`;
  return axios.patch(url, id, {
    signal: controller.signal,
    headers: {Authorization: `Bearer ${token}`},
  });
};
