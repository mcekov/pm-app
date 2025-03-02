<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '@/components/ui/data-table/DataTable.vue';
import { columns } from '@/utils/tableColumns/projectsColumns';

import { usePageStore } from '@/stores/page';
import { storeToRefs } from 'pinia';
import { useProjectsStore } from '@/stores/loaders/projects';
import { useCollaborators } from '@/composables/getGroupCollaborators';

usePageStore().pageData.title = 'Projects';

const projectsLoader = useProjectsStore();
const { projects } = storeToRefs(projectsLoader);
const { getProjects } = projectsLoader;

await getProjects();

const { getGroupedCollabs, groupedCollabs } = useCollaborators();
if (projects.value) await getGroupedCollabs(projects.value);

//getGroupCollaborators(projects.value);
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
