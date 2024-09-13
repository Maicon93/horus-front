import { createRouter, createWebHistory } from 'vue-router'


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

// Função que verifica se o usuário está autenticado (pode ser ajustada de acordo com sua lógica)
function isAuthenticated() {
  // Exemplo: Verifica se existe um token de autenticação
  return !!localStorage.getItem('authToken');
}

// Guard global para verificar se a rota requer autenticação
router.beforeEach((to, from, next) => {
  console.log(isAuthenticated())
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // Se não estiver autenticado, redireciona para a página de login
    next({ path: '/' });
  } else {
    // Caso contrário, permite o acesso à rota
    next();
  }
});

export default router;
