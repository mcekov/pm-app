<script setup lang="ts">
import { usePageStore } from '@/stores/page';

usePageStore().pageData.title = 'Home Page';
</script>

<template>
  <h1></h1>
</template>
