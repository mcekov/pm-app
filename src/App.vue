<script setup lang="ts">
import AuthLayout from './components/Layout/main/AuthLayout.vue';
import AppErrorPage from './components/AppError/AppErrorPage.vue';
import { useErrorStore } from './stores/error';

const errorStore = useErrorStore();

onErrorCaptured((error) => {
  errorStore.setError({ error });
  return false;
});
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="errorStore.activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense timeout="0">
        <Component v-if="Component" :is="Component" :key="route.name" />
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
