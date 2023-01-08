import axios from 'axios';
const BASE_URL = 'http://localhost:4200';

export default axios.create({
  baseURL: BASE_URL,
});
