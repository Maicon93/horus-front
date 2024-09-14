// src/plugins/axios.js
import axios from 'axios'

export default {
  install: (app) => {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:3000/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    axiosInstance.interceptors.response.use(
      (response) => {

        if (response?.data?.msg) {
          switch (response.data.type) {
            case 'success':
              app.config.globalProperties.$toast.success(response.data.msg)
              break;
            case 'info':
              app.config.globalProperties.$toast.info(response.data.msg)
              break;
            case 'error':
              app.config.globalProperties.$toast.error(response.data.msg)
              break;

            default:
              break;
          }
        }

        return response.data
      },
      (error) => {
        app.config.globalProperties.$toast.error('Ocorreu um erro na resposta')
        return Promise.reject(error)
      }
    )

    app.config.globalProperties.$http = axiosInstance
    app.provide('http', axiosInstance)
  },
}
