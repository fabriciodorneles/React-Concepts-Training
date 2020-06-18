import axios from 'axios';

const api = axios.create({
    baseURL : 'http://localhost:3333' //a mesma base_url que setou lá no insomnia    
})

export default api;