import axios, { AxiosRequestConfig } from 'axios';
import { getEnvs } from './get-envs';

const { BACKEND_API_URL } = getEnvs();

export const erpAPI = () => {
  const sendRequest = async <T>(
    method: AxiosRequestConfig['method'],
    url: string,
    data?: any,
  ): Promise<T> => {
    const config: AxiosRequestConfig = {
      method,
      url: BACKEND_API_URL + url,
      data,
      timeout: 30000,
    };

    const response = await axios<T>(config);
    return response.data;
  };
  const get = <T>(url: string) => sendRequest<T>('GET', url);
  const post = <T>(url: string, data: any) =>
    sendRequest<T>('POST', url, data);
  const patch = <T>(url: string, data: any) =>
    sendRequest<T>('PATCH', url, data);
  const remove = <T>(url: string) => sendRequest<T>('DELETE', url);

  return {
    get,
    post,
    patch,
    remove,
  };
};
