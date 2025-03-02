import { projectQuery, projectsQuery, type Project, type Projects } from '@/utils/supabaseQueries';
import { useMemoize } from '@vueuse/core';

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects>([]);
  const project = ref<Project | null>();

  const loadProjects = useMemoize(async (key: string) => await projectsQuery);
  const loadProject = useMemoize(async (slug: string) => await projectQuery(slug));

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

    projects.value = data ?? [];

    validateCache();
  };

  const getProject = async (slug: string) => {
    const { data, error, status } = await loadProject(slug);
    if (error) useErrorStore().setError({ error, customCode: status });

    project.value = data;
  };

  return { projects, getProjects, getProject, project };
});
