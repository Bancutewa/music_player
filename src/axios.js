import axios from 'axios'
// require('dotenv').config();

const instance = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: `https://music-player-ex1x.onrender.com/api/v1`,
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    let localStorageData = localStorage.getItem('persist:music/user')
    if (localStorageData && typeof localStorageData === 'string') {
        localStorageData = JSON.parse(localStorageData)
        const accessToken = JSON.parse(localStorageData.token)
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
    } else
        return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response.data;
});

export default instance;