import { defineStore } from 'pinia';

export const usePageStore = defineStore('page-store', () => {
  const pageData = ref({
    title: '',
    description: '',
  });

  return { pageData };
});
