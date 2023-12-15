import axios from 'axios';

const baseUrl = axios.create({
  baseURL: 'https://infostream.onrender.com',
});
export default baseUrl;
