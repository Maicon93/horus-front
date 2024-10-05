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
      path: '/conheca-a-horus',
      component: () => import('../views/KnowHorus.vue')
    },
    {
      path: '/instituto-horus',
      component: () => import('../views/InstitutHorus.vue')
    },
    {
      path: '/noticia/:id',
      component: () => import('../views/Notice.vue')
    },
    {
      path: '/noticias/:id',
      component: () => import('../views/Notices.vue')
    },
    {
      path: '/noticias',
      component: () => import('../views/Notices.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/Admin.vue')
    },
    {
      path: '/graduacao/:id',
      component: () => import('../views/Graduation.vue')
    },
    {
      path: '/admin-config',
      component: () => import('../views/AdminConfig.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'notices',
          components: {
            admin: () => import('../components/admin/Notices.vue')
          }
        },
        {
          path: 'courses',
          components: {
            admin: () => import('../components/admin/Courses.vue')
          }
        },
        {
          path: 'persons',
          components: {
            admin: () => import('../components/admin/Persons.vue')
          }
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
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
