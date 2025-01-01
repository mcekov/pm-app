<script setup lang="ts">
interface LinkProp {
  title: string;
  to?: string;
  icon: string;
}

defineProps<{
  links: LinkProp[];
}>();
</script>

<template>
  <RouterLink
    exactActiveClass="text-primary bg-muted/60"
    v-for="link in links"
    :to="link.to"
    :key="link.title"
    class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
  >
    <iconify-icon :icon="link.icon" />
    <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
  </RouterLink>
</template>
