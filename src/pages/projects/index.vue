<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { h, ref } from 'vue';
import type { Tables } from '../../../database/types';
import DataTable from '@/components/ui/data-table/DataTable.vue';
import type { ColumnDef } from '@tanstack/vue-table';
import { RouterLink } from 'vue-router';
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

const columns: ColumnDef<Projects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
          class: 'text-left font-medium hover:bg-muted block w-full',
        },
        () => row.getValue('name'),
      );
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'));
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        JSON.stringify(row.getValue('collaborators')),
      );
    },
  },
];
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
