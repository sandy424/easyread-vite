import axios from 'axios';

const api = axios.create({
  baseURL: 'http://15.164.30.134:13001',
});

export default api;