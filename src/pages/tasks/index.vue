<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { ref } from 'vue';
import type { Tables } from '../../../database/types';
import Button from '@/components/ui/button/Button.vue';

const tasks = ref<Tables<'tasks'>[] | null>(null);

(async () => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) console.error(error);

  tasks.value = data;
})();
</script>

<template>
  <div>Tasks Page</div>
  <RouterLink to="/">Go to home</RouterLink>
  <ul>
    <li v-for="task in tasks" key="task.id">{{ task.name }}</li>
  </ul>

  <Button>Button</Button>
</template>

<style></style>
