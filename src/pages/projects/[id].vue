<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div>Project Name {{ route.params?.id }}</div>
  <router-link to="/projects">Go to projects</router-link>
</template>

<style lang=""></style>
