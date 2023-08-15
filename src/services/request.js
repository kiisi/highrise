import axios from 'axios'
// import { BASE_URL_ENDPOINT } from '../constants/index'

const request = axios.create({
    baseURL: "http://localhost:5000"
    // baseURL: BASE_URL_ENDPOINT
});

export default request;