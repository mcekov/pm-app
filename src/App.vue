<script setup lang="ts">
import AuthLayout from './components/Layout/main/AuthLayout.vue';
import AppErrorPage from './components/AppError/AppErrorPage.vue';
import { useErrorStore } from './stores/error';
import { supabase } from './lib/supabaseClient';

const errorStore = useErrorStore();
const authStore = useAuthStore();

onErrorCaptured((error) => {
  errorStore.setError({ error });
  return false;
});

onMounted(async () => {
  const { data } = await supabase.auth.getSession();
  if (data.session?.user) {
    await authStore.setAuth(data.session);
  }

  console.log('🚀 ~ onMounted ~ data:', authStore.$state.profile);
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
