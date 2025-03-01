import { projectsQuery, type Projects } from '@/utils/supabaseQueries';
import { useMemoize } from '@vueuse/core';

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null);

  const loadProjects = useMemoize(async (key: string) => await projectsQuery);

  const validateCache = () => {
    if (projects.value?.length) {
      projectsQuery.then(({ data, error }) => {
        if (JSON.stringify(data) === JSON.stringify(projects.value)) {
          console.log('Data is not changed');
          return;
        } else {
          console.log('Something changed');
          loadProjects.delete('projects');

          if (!error && data) {
            projects.value = data;
          }
        }
      });
    }
  };

  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects');
    if (error) useErrorStore().setError({ error, customCode: status });

    projects.value = data;

    validateCache();
  };

  return { projects, getProjects };
});
