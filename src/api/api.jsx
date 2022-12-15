import axios from 'axios';

const api = axios.create({
    baseURL: 'https://acaraje-api-teste.onrender.com/'
});

export default api;