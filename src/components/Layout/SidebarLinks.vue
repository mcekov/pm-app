<script setup lang="ts">
import { useMenu } from '@/composables/menu';
import { menuKey, type MenuInjectionOptions } from '@/utils/injectionKeys';

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

const { menuOpen, toggleMenu } = useMenu();
</script>

<template>
  <div v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      exactActiveClass="text-primary bg-muted/60"
      class="nav-link"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
    >
      <iconify-icon :icon="link.icon" />
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">{{
        link.title
      }}</span>
    </RouterLink>

    <div
      v-else
      class="nav-link cursor-pointer"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
      @click="emitSignout(link.title)"
    >
      <iconify-icon :icon="link.icon" />
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">{{
        link.title
      }}</span>
    </div>
  </div>
</template>

<style lang="css">
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground;
}
</style>
