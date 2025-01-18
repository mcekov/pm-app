<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '@/components/ui/data-table/DataTable.vue';
import { tasksWithProjectsQuery, type TasksWithProjects } from '@/utils/supabaseQueries';
import { usePageStore } from '@/stores/page';
import { columns } from '@/utils/tableColumns/tasksColumns';

usePageStore().pageData.title = 'Tasks';

const tasks = ref<TasksWithProjects | null>(null);

const getTasks = async () => {
  const { data, error, status } = await tasksWithProjectsQuery;

  if (error) useErrorStore().setError({ error, customCode: status });

  tasks.value = data;
};

await getTasks();
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
