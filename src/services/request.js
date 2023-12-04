import axios from 'axios'

const request = axios.create({
    // baseURL: "http://localhost:5000"
    baseURL: "https://maroon-crab-hat.cyclic.app"
});

request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        config.params = { ...config.params };
        return config;
    },

    (error) => errorHandler(error)
);

function errorHandler(error) {
    console.log("Axios Error Handler: ", error)
    if (error?.response) {
        if (error?.response?.status === 403 || error?.response?.status === 401) {
            // window.location.reload();
            window.location.replace("/login");
        }
    }

    return Promise.reject(error.response);
}

export default request;