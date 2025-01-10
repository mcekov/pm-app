<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { h, ref } from 'vue';
import type { Tables } from '../../../database/types';
import Button from '@/components/ui/button/Button.vue';
import type { ColumnDef } from '@tanstack/vue-table';
import DataTable from '@/components/ui/data-table/DataTable.vue';
import { RouterLink } from 'vue-router';

import { usePageStore } from '@/stores/page';

usePageStore().pageData.title = 'Tasks';

const tasks = ref<Tables<'tasks'>[] | null>(null);

const getTasks = async () => {
  const { data, error } = await supabase.from('tasks').select(
    `
    *, projects(id, name, slug)
    `,
  );
  if (error) console.error(error);

  tasks.value = data;
};

await getTasks();

// console.log('tasks', tasks.value);

/* TABLE */

const columns: ColumnDef<Tables<'tasks'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/tasks/${row.original.id}`,
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
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'));
    },
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.projects.slug}`,
          class: 'text-left font-medium hover:bg-muted block w-full',
        },
        () => row.getValue('projects').name,
      );
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
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
