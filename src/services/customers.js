import http from "./api";
import { getUser } from "../services/utils";

const getData = async (url, pagination) => {
  const { filter, limit, curPage: page } = pagination;
  const response = await http.get(url, { params: { page, filter, limit } });
  return response.data;
};

export const getCustomers = async (pagination) => {
  const data = await getData("customers", pagination);
  return data.customers;
};

export const getInactiveCustomers = async (pagination) => {
  const data = await getData("customers/inactive", pagination);
  return data.customers;
};

export const getDebtors = async (pagination) => {
  const data = await getData("customers/debtors", pagination);
  return data.debtors;
};

export const getCustomer = async (id) => {
  const response = await http.get(`customers/${id}`);
  return response.data.customer;
};

export const getDebt = async (id) => {
  const response = await http.get(`customers/debtors/${id}`);
  return response.data.debt;
};

export const saveCustomer = (customer) => {
  customer.userId = getUser().id;
  return new Promise((resolve, reject) => {
    http
      .post("customers", customer)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const deleteCustomer = (customer) => {
  return new Promise((resolve, reject) => {
    const { id } = customer;
    http
      .put(`customers/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const restoreCustomer = (customer) => {
  return new Promise((resolve, reject) => {
    const { id } = customer;
    http
      .put(`customers/${id}/restore`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const destroyCustomer = (customer) => {
  return new Promise((resolve, reject) => {
    const { id } = customer;
    http
      .delete(`customers/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};
