<script setup lang="ts">
import { useErrorStore } from '@/stores/error';
import AppErrorPage from './AppErrorPage.vue';

useErrorStore().setError('Page not found');
</script>

<template>
  <AppErrorPage />
</template>
