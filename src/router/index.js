import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/Admin.vue')
    },
    {
      path: '/admin-config',
      component: () => import('../views/AdminConfig.vue'),
      meta: { requiresAuth: true } // Indica que essa rota requer autenticação
    },
    {
      path: '/conheca-a-horus',
      component: () => import('../views/KnowHorus.vue')
    },
  ]
})

async function isAuthenticated() {
  const token = localStorage.getItem('sessionHash')
  if (!token) {
    return false
  }

  const baseUrl = `${window.location.protocol}//${window.location.hostname}`

  let auth = false
  await axios.post(`${baseUrl}:3000/admin/auth`, { token: token }).then(resp => {
    resp.data.type == 'success' && (auth = true);
  }).catch(()=>{})

  return auth
}

router.beforeEach(async (to, from, next) => {
  const auth = await isAuthenticated()

  if (to.meta.requiresAuth && !auth) {
    return next({ path: '/' });
  }

  next();
});

export default router;
