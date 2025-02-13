import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router/auto';
import { routes } from 'vue-router/auto-routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const { user } = storeToRefs(useAuthStore());

  const isPublicRoute = ['/login', '/register'].includes(to.path as string);

  if (!user.value && !isPublicRoute) {
    return { name: '/login' };
  }

  if (user.value && isPublicRoute) {
    return { name: '/' };
  }
});

export default router;
