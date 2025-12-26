import axios from 'axios';

// 创建axios实例，设置请求超时时间
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});

// 封装get请求
export const getData = async () => {
  const res = await api.get('/todos/1');
  return res.data;
};

export default api;
