//axios二次封装:使用请求与响应拦截器

import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { ElMessage } from "element-plus";
import useUserStore from "../store/modules/user";


let service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
});

service.interceptors.request.use((config) => {
    let userStore=useUserStore()
    if(userStore.token){
        config.headers.token=userStore.token
    }
    return config;
})

service.interceptors.response.use((response) => { 
    return response.data
}, (error:AxiosError) => {
    let message = ''
    let status = error.response?.status
    switch (status) {
        case 401:
            message = 'token 过期'
            break
        case 403:
            message = '无权访问'
            break
        default:
            message = 'network error'
            break;
    }
    ElMessage({
        type: 'error',
        message
    })
    return Promise.reject(error)
})

 const request = {
    get<T=any>(url: string, config?: AxiosRequestConfig) : Promise<T> {
      return service.get(url, config)
    },
  
    post<T=any>(url: string, data?: object, config?: AxiosRequestConfig) :Promise<T> {
      return service.post(url, data, config)
    },
  
    put<T=any>(url: string, data?: object, config?: AxiosRequestConfig) :Promise<T> {
      return service.put(url, data, config)
    },
  
    delete<T=any>(url: string, config?: AxiosRequestConfig) : Promise<T> {
      return service.delete(url, config)
    }
  }

  export default request