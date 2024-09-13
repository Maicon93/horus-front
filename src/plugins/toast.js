import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  install: (app) => {
    app.use(Vue3Toastify, {
      autoClose: 3000,
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
    })

    app.config.globalProperties.$toast = toast
  },
}