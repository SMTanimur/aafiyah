import { capitalize, isArray } from 'lodash';
import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
export const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.message) toast.success(response.data.message);
    return response.data;
  },
  async (error) => {
    if (error.response.data.message) {
      if (isArray(error.response.data.message)) {
        error.response.data.message.forEach((message: string) =>
          toast.error(capitalize(message))
        );
      }
    }
    if (error.response.status === 401 || error.response.status === 403) {
      // window.location.reload()
    }

    return Promise.reject(error.response.data);
  }
);

export { api };
