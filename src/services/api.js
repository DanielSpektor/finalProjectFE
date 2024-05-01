import { axiosInstance as axios } from "./axiosInstance";

const CREATE_NEW_USER = () => `api/public/user/create`;
const OPEN_NEW_ORDER = () => `api/public/orders/open`;
const CLOSE_ORDER = () => `api/public/orders/close`;
const AUTHENTICATE = () => `api/public/authenticate`;

const TEST_API = () => `api/public/test1`;

const instance = axios.create({
    baseURL: 'http://localhost:8080/', // Your backend API base URL
    timeout: 5000, // Timeout for requests
});

export const createNewUser = (userBody) => {
    return axios.post(CREATE_NEW_USER(), userBody);
}

export const openNewOrder = (orderBody) => {
    return axios.post(OPEN_NEW_ORDER(), orderBody);
}

export const closeOrder = (params) => {
    return axios.get(CLOSE_ORDER(), {params: params});
}

export const authenticate = (userBody) => {
    return axios.post(AUTHENTICATE(), userBody);
}

export const testAuthenticatedApi = (params) => {
    return axios.get(TEST_API(), {params: params});
}

export const fetchOrders = async () => {
    try {
      const response = await instance.get('api/public/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
};

export const fetchOrderById = async (orderId) => {
    try {
      const response = await instance.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  };