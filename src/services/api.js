import axios from 'axios';

const api = axios.create({
    baseURL:process.env.REACT_APP_API,
})

api.interceptors.request.use( async (config) => {
    const token = await localStorage.getItem('@SystemMaster:token')
    config.headers.authorization = `Bearer ${token}`;
    return config
});

export default api;