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
  <Transition name="fade" mode="out-in">
    <Component :is="user ? AuthLayout : GuestLayout" :key="user?.id">
      <AppErrorPage v-if="errorStore.activeError" />
      <RouterView v-else v-slot="{ Component, route }">
        <div class="w-full" :key="route.path">
          <Suspense timeout="0">
            <Component v-if="Component" :is="Component" />
            <template #fallback>
              <div
                class="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center w-full h-screen bg-background bg-opacity-90 z-50"
              >
                <iconify-icon class="animate-spin text-6xl" icon="lucide:loader-circle" />
              </div>
            </template>
          </Suspense>
        </div>
      </RouterView>
    </Component>
  </Transition>
</template>
