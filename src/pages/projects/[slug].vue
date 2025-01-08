<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const params = route.params as { slug: string };
</script>

<template>
  <div>Project Name {{ params?.slug }}</div>
  <router-link to="/projects">Go to projects</router-link>
</template>

<style></style>
