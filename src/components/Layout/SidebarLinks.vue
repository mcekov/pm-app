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
  <div v-for="link in links" :key="link.title">
    <RouterLink
      @click="() => $emit('close')"
      exactActiveClass="text-primary bg-muted/60"
      v-if="link.to"
      :to="link.to"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
    >
      <iconify-icon :icon="link.icon" />
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>
  </div>
</template>
