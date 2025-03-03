<script setup lang="ts">
import AppErrorPage from './components/AppError/AppErrorPage.vue';
import { useErrorStore } from './stores/error';
import { useAuthStore } from './stores/auth';
import { storeToRefs } from 'pinia';

const errorStore = useErrorStore();

onErrorCaptured((error) => {
  errorStore.setError({ error });
  return false;
});

onMounted(async () => {
  useAuthStore().trackAuthChanges();
});

const { user } = storeToRefs(useAuthStore());

const AuthLayout = defineAsyncComponent(() => import('./components/Layout/main/AuthLayout.vue'));
const GuestLayout = defineAsyncComponent(() => import('./components/Layout/main/GuestLayout.vue'));
</script>

<template>
  <Component :is="user ? AuthLayout : GuestLayout">
    <AppErrorPage v-if="errorStore.activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense timeout="0">
        <Component v-if="Component" :is="Component" :key="route.name" />
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </RouterView>
  </Component>
</template>
