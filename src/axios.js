import axios from "axios";

//console.log(process.env.BACKEND_URL);
const requestax = axios.create({
    baseURL: process.env.BACKEND_URL+'/api',
});

export default requestax;