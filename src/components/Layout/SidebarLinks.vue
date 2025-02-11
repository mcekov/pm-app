<script setup lang="ts">
interface LinkProp {
  title: string;
  to?: string;
  icon: string;
}

defineProps<{
  links: LinkProp[];
}>();

const emit = defineEmits<{
  onSignout: [string];
}>();

const emitSignout = (title: string) => {
  emit('onSignout', title);
};
</script>

<template>
  <div v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      exactActiveClass="text-primary bg-muted/60"
      class="nav-link"
    >
      <iconify-icon :icon="link.icon" />
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>

    <div v-else class="nav-link cursor-pointer" @click="$emit('onSignout', link.title)">
      <iconify-icon :icon="link.icon" />
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </div>
  </div>
</template>

<style lang="css">
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground;
}
</style>
