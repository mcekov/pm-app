import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router/auto';
import { routes } from 'vue-router/auto-routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  await authStore.getSession();

  const isPublicRoute = ['/login', '/register'].includes(to.path as string);

  if (!authStore.user && !isPublicRoute) {
    return { name: '/login' };
  }

  if (authStore.user && isPublicRoute) {
    return { name: '/' };
  }
});

export default router;
