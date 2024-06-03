import axios from "axios";

const requestax = axios.create({
    baseURL: 'https://fooddel-api.onrender.com/api',
});

export default requestax;