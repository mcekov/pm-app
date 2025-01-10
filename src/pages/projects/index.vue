<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '@/components/ui/data-table/DataTable.vue';
import { columns } from '@/utils/tableColumns/projectsColumns';

import { usePageStore } from '@/stores/page';
import { projectsQuery, type Projects } from '@/utils/supabaseQueries';

usePageStore().pageData.title = 'Projects';

const projects = ref<Projects | null>(null);

const getProjects = async () => {
  const { data, error } = await projectsQuery;
  if (error) console.error(error);

  projects.value = data;
};

await getProjects();
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
