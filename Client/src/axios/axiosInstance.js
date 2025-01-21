import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:"https://aws-vishal.mooo.com/api/",
    headers:{
        "Content-Type":"application/json"
    }
})

export default axiosInstance