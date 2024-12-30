<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { ref } from 'vue';
import type { Tables } from '../../../database/types';

const tasks = ref<Tables<'tasks'>[] | null>(null);

(async () => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) console.error(error);

  tasks.value = data;
})();
</script>

<template>
  <div>Project Page</div>
  <RouterLink to="/">Go to home</RouterLink>
  {{ tasks }}
</template>

<style></style>
