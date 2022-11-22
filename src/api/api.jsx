import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.101.26:3000'
});

export default api;